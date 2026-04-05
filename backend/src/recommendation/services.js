// src/recommendation/services.js

const { getAllRegularHouses } = require("../houses/regularHouses/services");
const { getAllHousingProjects } = require("../houses/housingScheme/services");

//distance utk work place
function getDistance(p, userLat, userLng) {
  const dx = p.Lat - userLat;
  const dy = p.Lng - userLng;

  return Math.sqrt(dx * dx + dy * dy);
}

function calculateScore(p, user) {
  let score = 0;

  const workplace = user.employmentDetails?.workplaceLocation || "";
  const maxBudget = user.propertyPreferences?.maxBudget || Infinity;

  // Budget match
  if (p.Median_Price <= maxBudget) {
    score += 40;
  }

  // Location match
  const distance = getDistance(p, 3.1390, 101.6869); // temp user location

    if (distance < 0.05) {
      score += 30; // VERY close
    } else if (distance < 0.1) {
      score += 20; // close
    } else {
      score += 10; // far
    }

  // Bedroom preference
  if (p.Bedroom >= 3) {
    score += 30;
  }

  return score;
}


function getRecommendations(user) {
  const workplace =
    user.employmentDetails?.workplaceLocation || "";

  const maxBudget =
    user.propertyPreferences?.maxBudget || Infinity;

  const regular = getAllRegularHouses();
  const schemes = getAllHousingProjects();

  const all = [...regular, ...schemes];

  // FILTER LOCATION
  const filtered = all;

  // FILTER BUDGET
  const budgetFiltered = filtered.filter(
    (p) => p.Median_Price <= maxBudget
  );

  // ADD SCORING HERE
  const scored = budgetFiltered.map((p) => ({
    Property_ID: p.Property_ID,
    Property_Name: p.Property_Name,
    Median_Price: p.Median_Price,
    Bedroom: p.Bedroom,
    Toilet: p.Toilet,
    Floor_Area_sqft: p.Floor_Area_sqft,
    propertyImage: p.propertyImage,
    matchScore: calculateScore(p, user),
    propertyType: p.Housing_Scheme ? "scheme" : "regular"
  }));

  // SORT + RETURN
  return scored
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 20);
}

module.exports = { getRecommendations };