// src/map/services.js

const { getAllRegularHouses } = require("../houses/regularHouses/services");
const { getAllHousingProjects } = require("../houses/housingScheme/services");


//Get all markers for map - combine regular houses and housing schemes
function getAllMarkers() {

  const regular = getAllRegularHouses();
  const schemes = getAllHousingProjects();

  const all = [...regular, ...schemes];

  return all.map((property) => ({
    id: property.Property_ID,
    name: property.Property_Name,
    lat: property.Lat,
    lng: property.Lng,
    price: property.Median_Price,
    state: property.State
  }));
}


//get location details for single property by ID, used for map marker click to show details
function getPropertyLocationById(id) {

  const regular = getAllRegularHouses();
  const schemes = getAllHousingProjects();

  const all = [...regular, ...schemes];

  const property = all.find(p => p.Property_ID === id);

  if (!property) return null;

  const lat = Number(property.Lat);
  const lng = Number(property.Lng);

  // For validation
  if (!lat || !lng) return null;

  return {
    id: property.Property_ID,
    name: property.Property_Name,
    lat,
    lng,
    address: `${property.Township}, ${property.Area}, ${property.State}`,
    coordinates: `${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`
  };

}


module.exports = {
  getAllMarkers,
  getPropertyLocationById
};