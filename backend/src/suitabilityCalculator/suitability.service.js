const { db } = require("../auth/firebase");
const { processRisk } = require("../riskDetection/risk.service");
const { calculateTrueMonthlyCost, getDrivingDistanceKm } = require("../costCalculator/service");
const { getAllRegularHouses } = require("../houses/regularHouses/services");
const { getAllHousingProjects } = require("../houses/housingScheme/services");
const schemes = require("../houses/housingScheme/data");

const SCORING_VERSION = "v1.0.0";

const DEFAULT_WEIGHTS = {
  risk: 25,
  commute: 20,
  affordability: 30,
  preference: 15,
  schemeEligibility: 10
};

const WEIGHT_KEYS = Object.keys(DEFAULT_WEIGHTS);

const SCHEME_ALIASES = {
  RUMAWIP: "Residensi Wilayah",
  "Residensi Wilayah": "Residensi Wilayah",
  PR1MA: "PR1MA",
  Selangorku: "Selangorku"
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalizeWeights(inputWeights) {
  if (!inputWeights) {
    return { ...DEFAULT_WEIGHTS };
  }

  const normalizedInput = {};

  for (const key of WEIGHT_KEYS) {
    const value = Number(inputWeights[key]);

    if (!Number.isFinite(value)) {
      const error = new Error(`weights.${key} must be a number`);
      error.statusCode = 400;
      throw error;
    }

    if (value < 0) {
      const error = new Error(`weights.${key} must be non-negative`);
      error.statusCode = 400;
      throw error;
    }

    normalizedInput[key] = value;
  }

  const total = WEIGHT_KEYS.reduce((sum, key) => sum + normalizedInput[key], 0);

  if (total <= 0) {
    const error = new Error("At least one weight must be greater than zero");
    error.statusCode = 400;
    throw error;
  }

  const normalizedWeights = {};
  for (const key of WEIGHT_KEYS) {
    normalizedWeights[key] = (normalizedInput[key] / total) * 100;
  }

  return normalizedWeights;
}

function deepMerge(base, patch) {
  if (!patch || typeof patch !== "object") {
    return base;
  }

  const out = Array.isArray(base) ? [...base] : { ...base };

  for (const [key, value] of Object.entries(patch)) {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      base &&
      typeof base[key] === "object" &&
      !Array.isArray(base[key])
    ) {
      out[key] = deepMerge(base[key], value);
    } else {
      out[key] = value;
    }
  }

  return out;
}

function loadAllProperties() {
  return [...getAllRegularHouses(), ...getAllHousingProjects()];
}

function getPropertyById(propertyId) {
  const properties = loadAllProperties();
  return properties.find((property) => String(property.Property_ID) === String(propertyId));
}

async function getUserProfile(uid) {
  if (!uid) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  const doc = await db.collection("users").doc(uid).get();

  if (!doc.exists) {
    const error = new Error("Profile not found");
    error.statusCode = 404;
    throw error;
  }

  return doc.data();
}

function scoreRisk(riskResult) {
  const score = clamp(Number(riskResult.safetyIndex) || 0, 0, 100);

  return {
    factor: "risk",
    score,
    rawMetrics: {
      safetyIndex: Number(riskResult.safetyIndex) || 0,
      safetyLevel: riskResult.safetyLevel || "Unknown",
      floodRisk: riskResult.floodRisk || "Unknown",
      landslideRisk: riskResult.landslideRisk || "Unknown"
    },
    reasons: [
      `Safety index is ${Math.round(score)} (${riskResult.safetyLevel || "Unknown"})`
    ]
  };
}

async function scoreCommute(property, profile) {
  const workplaceLocation = profile?.employmentDetails?.workplaceLocation;

  if (!workplaceLocation) {
    return {
      factor: "commute",
      score: 50,
      rawMetrics: {
        distanceKm: null,
        workplaceLocation: null
      },
      reasons: ["Workplace location missing, applied neutral commute score"]
    };
  }

  const distanceKm = await getDrivingDistanceKm({
    originLat: Number(property.Lat),
    originLng: Number(property.Lng),
    destination: workplaceLocation
  });

  let score;
  if (distanceKm <= 10) {
    score = 100;
  } else if (distanceKm <= 20) {
    score = 80;
  } else if (distanceKm <= 35) {
    score = 60;
  } else if (distanceKm <= 50) {
    score = 40;
  } else {
    score = 20;
  }

  return {
    factor: "commute",
    score,
    rawMetrics: {
      distanceKm: Number(distanceKm.toFixed(2)),
      workplaceLocation
    },
    reasons: [`Estimated one-way driving distance is ${distanceKm.toFixed(1)} km`] 
  };
}

function scoreAffordability(costResult, profile) {
  const estimatedTotal = Number(costResult?.data?.estimatedTotal || 0);
  const householdIncome = Number(profile?.eligibility?.householdIncome || 0);

  if (householdIncome <= 0) {
    return {
      factor: "affordability",
      score: 20,
      rawMetrics: {
        estimatedMonthlyCost: estimatedTotal,
        householdIncome,
        costToIncomeRatio: null
      },
      reasons: ["Household income missing or zero, affordability heavily penalized"]
    };
  }

  const ratio = estimatedTotal / householdIncome;
  let score;

  if (ratio <= 0.2) {
    score = 100;
  } else if (ratio <= 0.3) {
    score = 85;
  } else if (ratio <= 0.4) {
    score = 70;
  } else if (ratio <= 0.5) {
    score = 50;
  } else if (ratio <= 0.6) {
    score = 30;
  } else {
    score = 10;
  }

  return {
    factor: "affordability",
    score,
    rawMetrics: {
      estimatedMonthlyCost: estimatedTotal,
      householdIncome,
      costToIncomeRatio: Number(ratio.toFixed(3))
    },
    reasons: [
      `Cost-to-income ratio is ${(ratio * 100).toFixed(1)}% per month`
    ]
  };
}

function scorePreference(property, profile, commuteFactor) {
  const maxBudget = Number(profile?.propertyPreferences?.maxBudget || 0);
  const preferredState = String(profile?.propertyPreferences?.preferredState || "").trim().toLowerCase();
  const propertyState = String(property?.State || "").trim().toLowerCase();
  const priorities = Array.isArray(profile?.propertyPreferences?.priorities)
    ? profile.propertyPreferences.priorities.map((item) => String(item).toLowerCase())
    : [];

  let points = 0;
  const reasons = [];

  if (maxBudget > 0 && Number(property.Median_Price) <= maxBudget) {
    points += 40;
    reasons.push("Property price is within your stated max budget");
  } else if (maxBudget > 0) {
    const overBudgetRatio = Number(property.Median_Price) / maxBudget;
    const budgetScore = clamp(40 - (overBudgetRatio - 1) * 80, 0, 40);
    points += budgetScore;
    reasons.push("Property exceeds max budget, budget sub-score reduced");
  } else {
    points += 20;
    reasons.push("Max budget missing, budget preference applied as neutral");
  }

  if (preferredState && preferredState === propertyState) {
    points += 25;
    reasons.push("Property state matches your preferred state");
  } else if (preferredState) {
    points += 10;
    reasons.push("Property state differs from your preferred state");
  } else {
    points += 15;
    reasons.push("Preferred state missing, state preference applied as neutral");
  }

  const bedroom = Number(property.Bedroom || 0);
  if (bedroom >= 3) {
    points += 20;
    reasons.push("Bedroom count aligns with family-ready preference");
  } else {
    points += 10;
    reasons.push("Bedroom count is lower than ideal family-ready threshold");
  }

  let priorityBonus = 0;
  if (priorities.includes("commute") || priorities.includes("location")) {
    priorityBonus += clamp(commuteFactor.score * 0.15, 0, 15);
  }
  if (priorities.includes("budget") || priorities.includes("affordability")) {
    priorityBonus += 10;
  }

  points += clamp(priorityBonus, 0, 15);

  return {
    factor: "preference",
    score: clamp(Math.round(points), 0, 100),
    rawMetrics: {
      maxBudget,
      preferredState,
      propertyState,
      bedroom,
      priorities
    },
    reasons
  };
}

function isEligibleForScheme(schemeRule, profile) {
  const age = Number(profile?.personalInfo?.age);
  const income = Number(profile?.eligibility?.householdIncome);
  const preferredState = String(profile?.propertyPreferences?.preferredState || "").trim();
  const firstTimeHomebuyer = Boolean(profile?.eligibility?.firstTimeHomebuyer);

  if (schemeRule.minAge && (!Number.isFinite(age) || age < schemeRule.minAge)) {
    return false;
  }

  if (schemeRule.incomeMin && (!Number.isFinite(income) || income < schemeRule.incomeMin)) {
    return false;
  }

  if (schemeRule.incomeMax && Number.isFinite(income) && income > schemeRule.incomeMax) {
    return false;
  }

  if (Array.isArray(schemeRule.locations) && schemeRule.locations.length > 0) {
    if (!preferredState || !schemeRule.locations.includes(preferredState)) {
      return false;
    }
  }

  if (schemeRule.firstHomeRequired && !firstTimeHomebuyer) {
    return false;
  }

  return true;
}

function scoreSchemeEligibility(property, profile) {
  const schemeNameRaw = property.Housing_Scheme;

  if (!schemeNameRaw) {
    return {
      factor: "schemeEligibility",
      score: 60,
      rawMetrics: {
        housingScheme: null,
        eligible: null
      },
      reasons: ["Regular property has no scheme requirement, applied neutral-positive score"]
    };
  }

  const normalizedScheme = SCHEME_ALIASES[schemeNameRaw] || schemeNameRaw;
  const schemeRule = schemes.find((scheme) => scheme.name === normalizedScheme);

  if (!schemeRule) {
    return {
      factor: "schemeEligibility",
      score: 55,
      rawMetrics: {
        housingScheme: schemeNameRaw,
        eligible: null
      },
      reasons: ["Scheme rules unavailable for this project, applied fallback score"]
    };
  }

  const eligible = isEligibleForScheme(schemeRule, profile);

  return {
    factor: "schemeEligibility",
    score: eligible ? 100 : 20,
    rawMetrics: {
      housingScheme: schemeNameRaw,
      eligible
    },
    reasons: [
      eligible
        ? `Profile is eligible for ${schemeRule.name}`
        : `Profile does not satisfy ${schemeRule.name} eligibility`
    ]
  };
}

async function computeSuitability({ propertyId, uid, customWeights, userOverrides }) {
  const profile = await getUserProfile(uid);
  const mergedProfile = deepMerge(profile, userOverrides || {});

  const property = getPropertyById(propertyId);
  if (!property) {
    const error = new Error("Property not found");
    error.statusCode = 404;
    throw error;
  }

  const officeLocation = mergedProfile?.employmentDetails?.workplaceLocation;
  if (!officeLocation) {
    const error = new Error("employmentDetails.workplaceLocation is required in profile or userOverrides");
    error.statusCode = 400;
    throw error;
  }

  const riskResult = await processRisk(propertyId);

  const costResult = await calculateTrueMonthlyCost({
    propertyId,
    userProfile: {
      officeLocation,
      isFirstTimeBuyer: Boolean(mergedProfile?.eligibility?.firstTimeHomebuyer),
      downpaymentPercentage: Number(mergedProfile?.propertyPreferences?.financing?.downpayment || 0)
    }
  });

  const riskFactor = scoreRisk(riskResult);
  const commuteFactor = await scoreCommute(property, mergedProfile);
  const affordabilityFactor = scoreAffordability(costResult, mergedProfile);
  const preferenceFactor = scorePreference(property, mergedProfile, commuteFactor);
  const schemeFactor = scoreSchemeEligibility(property, mergedProfile);

  const factors = {
    risk: riskFactor,
    commute: commuteFactor,
    affordability: affordabilityFactor,
    preference: preferenceFactor,
    schemeEligibility: schemeFactor
  };

  const effectiveWeights = normalizeWeights(customWeights);

  const weightedScore = WEIGHT_KEYS.reduce((sum, key) => {
    return sum + (factors[key].score * effectiveWeights[key]) / 100;
  }, 0);

  return {
    scoringVersion: SCORING_VERSION,
    propertyId: String(propertyId),
    propertyName: property.Property_Name,
    finalScore: Math.round(clamp(weightedScore, 0, 100)),
    weightsUsed: Object.fromEntries(
      WEIGHT_KEYS.map((key) => [key, Number(effectiveWeights[key].toFixed(2))])
    ),
    factorBreakdown: WEIGHT_KEYS.map((key) => ({
      factor: key,
      weight: Number(effectiveWeights[key].toFixed(2)),
      score: factors[key].score,
      contribution: Number(((factors[key].score * effectiveWeights[key]) / 100).toFixed(2)),
      rawMetrics: factors[key].rawMetrics,
      reasons: factors[key].reasons
    })),
    meta: {
      generatedAt: new Date().toISOString()
    }
  };
}

module.exports = { computeSuitability };
