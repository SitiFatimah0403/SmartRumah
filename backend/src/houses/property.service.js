const { getAllRegularHouses } = require("./regularHouses/services");
const { getAllHousingProjects } = require("./housingScheme/services");

// nk fetch ke frontend utk Property Details page and nk bagitau mana regular and housing scheme houses
function getPropertyById(id) {
  const regular = getAllRegularHouses();
  const schemes = getAllHousingProjects();

  const all = [...regular, ...schemes];

  return all.find((p) => p.Property_ID === id);
}

module.exports = { getPropertyById };