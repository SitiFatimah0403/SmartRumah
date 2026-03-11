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

  // Step 2 — Extract scheme names
  const schemeNames = eligibleSchemes.map(s => s.name);

  // Step 3 — Find projects under those schemes
  const matchingProjects = housingProjects.filter(project =>
    schemeNames.includes(project.scheme)
  );

  return {
    eligibleSchemes,
    matchingProjects
  };

}

module.exports = {
  getEligibleSchemes
};