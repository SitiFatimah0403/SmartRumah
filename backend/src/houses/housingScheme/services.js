//src/houses/housingScheme/services.js
const schemes = require("./data");
const housingProjects = require("./housingScheme.json");

  // Step 1 — Find eligible schemes
  function getEligibleSchemes(user) {
  const eligibleSchemes = schemes.filter((scheme) => {

    if (scheme.minAge && user.personalInfo.age < scheme.minAge) return false;
    if (scheme.incomeMin && user.eligibility.householdIncome < scheme.incomeMin) return false;
    if (scheme.incomeMax && user.eligibility.householdIncome > scheme.incomeMax) return false;
    if (scheme.locations && !scheme.locations.includes(user.propertyPreferences.preferredState)) return false;
    if (scheme.firstHomeRequired && !user.eligibility.firstTimeHomebuyer) return false;

    return true;
  });

  // Step 2 - Get nearest houses for each scheme
  function getDistance(p, userLat, userLng) {
  const dx = p.Lat - userLat;
  const dy = p.Lng - userLng;
  return Math.sqrt(dx * dx + dy * dy);
}

  // Step 3 — Find projects under those schemes
  const userLat = user.employmentDetails.workplaceLat;
  const userLng = user.employmentDetails.workplaceLng;

  const matchingProjects = housingProjects
    .filter(project => {
      const schemeMatch = eligibleSchemes.some(
        scheme => scheme.name === project.Housing_Scheme
      );

      return schemeMatch;
    })
    .map(project => ({
      ...project,
      distance: getDistance(project, userLat, userLng)
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 20);

  return {
    eligibleSchemes,
    matchingProjects
  };

}


//fetch full list from Json
function getAllHousingProjects() {
  return housingProjects;
}

//Ni details for single house based on ID
function getHousingProjectById(id) {
  return housingProjects.find(
    project => project.Property_ID === id
  );
}


//Ni for map markers utk map
function getHousingProjectLocations() {
  return housingProjects.map(project => ({
    id: project.Property_ID,
    name: project.Property_Name,
    lat: project.Lat,
    lng: project.Lng,
    price: project.Median_Price
  }));
}


module.exports = {
  getEligibleSchemes,
  getAllHousingProjects,
  getHousingProjectById,
  getHousingProjectLocations
};