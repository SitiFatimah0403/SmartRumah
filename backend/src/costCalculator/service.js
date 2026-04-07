const axios = require("axios");
const { getAllRegularHouses } = require("../houses/regularHouses/services");
const { getAllHousingProjects } = require("../houses/housingScheme/services");

function loadAllProperties() {
  const regularHouses = getAllRegularHouses();
  const housingSchemes = getAllHousingProjects();

  return [...regularHouses, ...housingSchemes];
}

async function getDrivingDistanceKm({ originLat, originLng, destination }) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    const error = new Error("Missing GOOGLE_MAPS_API_KEY in environment");
    error.statusCode = 500;
    throw error;
  }

  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/distancematrix/json",
    {
      params: {
        origins: `${originLat},${originLng}`,
        destinations: destination,
        mode: "driving",
        key: apiKey
      }
    }
  );

  const element = response.data?.rows?.[0]?.elements?.[0];
  const mapsStatus = response.data?.status;

  if (mapsStatus !== "OK" || !element || element.status !== "OK") {
    const error = new Error(
      `Distance Matrix API failed: ${mapsStatus || element?.status || "UNKNOWN"}`
    );
    error.statusCode = 502;
    throw error;
  }

  return Number(element.distance.value) / 1000;
}

async function calculateTrueMonthlyCost({ propertyId, userProfile }) {
  try {
    const {
      officeLocation,
      isFirstTimeBuyer = false,
      downpaymentPercentage = 0
    } = userProfile;

    if (!officeLocation) {
      const error = new Error("userProfile.officeLocation is required");
      error.statusCode = 400;
      throw error;
    }

    if (downpaymentPercentage < 0 || downpaymentPercentage > 1) {
      const error = new Error("downpaymentPercentage must be between 0 and 1");
      error.statusCode = 400;
      throw error;
    }

    const allProperties = loadAllProperties();
    const foundProperty = allProperties.find(
      (property) => String(property.Property_ID) === String(propertyId)
    );

    if (!foundProperty) {
      const error = new Error("Property not found");
      error.statusCode = 404;
      throw error;
    }

    const propertyPrice = Number(foundProperty.Median_Price);
    const sizeSqft = Number(foundProperty.Floor_Area_sqft);
    const type = String(foundProperty.Property_Type || "");
    const originLat = Number(foundProperty.Lat);
    const originLng = Number(foundProperty.Lng);

    if (
      !Number.isFinite(propertyPrice) ||
      !Number.isFinite(sizeSqft) ||
      !Number.isFinite(originLat) ||
      !Number.isFinite(originLng)
    ) {
      const error = new Error("Property data is incomplete for calculation");
      error.statusCode = 422;
      throw error;
    }

    const realDistanceKm = await getDrivingDistanceKm({
      originLat,
      originLng,
      destination: officeLocation
    });

    const isZeroDownpayment = Number(downpaymentPercentage) === 0;

    const loanAmount =
      isFirstTimeBuyer && isZeroDownpayment
        ? propertyPrice
        : propertyPrice - propertyPrice * Number(downpaymentPercentage);

    const annualInterestRate = 0.04;
    const monthlyInterestRate = annualInterestRate / 12;
    const loanTenureYears = 35;
    const totalPayments = loanTenureYears * 12;

    const growthFactor = Math.pow(1 + monthlyInterestRate, totalPayments);
    const mortgageMonthly =
      (loanAmount * monthlyInterestRate * growthFactor) / (growthFactor - 1);

    const month1Interest = loanAmount * monthlyInterestRate;
    const month1Principal = mortgageMonthly - month1Interest;

    const petrolPerLiter = 2.05;
    const kmPerLiter = 15;
    const workingDaysPerMonth = 22;
    const mockTollDaily = 5.0;

    const dailyPetrol = ((realDistanceKm * 2) / kmPerLiter) * petrolPerLiter;
    const dailyCommute = dailyPetrol + mockTollDaily;
    const monthlyCommute = dailyCommute * workingDaysPerMonth;

    const maintenanceRatePerSqft = 0.3;
    const utilityPenalty = type.toLowerCase() === "serviced apt" ? 100 : 0;
    const maintenanceFee = sizeSqft * maintenanceRatePerSqft + utilityPenalty;

    const estimatedTotal = mortgageMonthly + monthlyCommute + maintenanceFee;

    return {
      status: "success",
      data: {
        estimatedTotal: Math.round(estimatedTotal),
        breakdown: {
          mortgageTotal: Math.round(mortgageMonthly),
          commuteAndTolls: Math.round(monthlyCommute),
          maintenanceFees: Math.round(maintenanceFee)
        },
        mortgageDetails: {
          principal: Math.round(month1Principal),
          interest: Math.round(month1Interest),
          propertyPrice,
          loanAmount: Math.round(loanAmount)
        }
      }
    };
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    throw error;
  }
}

module.exports = { calculateTrueMonthlyCost };