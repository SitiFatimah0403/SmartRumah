//src/houses/housingScheme/services.js
const schemes = require("./data");
const housingProjects = require("./housingScheme.json").housingProjects;

function getEligibleSchemes(user) {

  // Step 1 — Find eligible schemes
  const eligibleSchemes = schemes.filter((scheme) => {

    if (scheme.minAge && user.age < scheme.minAge) return false;
    if (scheme.incomeMin && user.income < scheme.incomeMin) return false;
    if (scheme.incomeMax && user.income > scheme.incomeMax) return false;
    if (scheme.locations && !scheme.locations.includes(user.location)) return false;
    if (scheme.firstHomeRequired && !user.firstHomeBuyer) return false;

    return true;

  });

  // Step 2 — Find projects under those schemes
  const matchingProjects = housingProjects.filter(project => {

    const schemeMatch = eligibleSchemes.some(
      scheme => scheme.name === project.scheme
    );

    const locationMatch = project.state === user.location;

    return schemeMatch && locationMatch;

  });

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