// src/houses/regularHouses/services.js

const houses = require("./data");

//Full data from Json drpd semua locations
function getAllRegularHouses() {
  return houses;
}

//Kita fetch single house details based on ID, utk details page
function getRegularHouseById(id) {
  return houses.find(
    (house) => house.Property_ID === id
  );
}

//Ni for map markers utk map, kita return minimal info je, takyah price ke apa, just ID, name, lat lng
function getRegularHouseLocations() {
  return houses.map((house) => ({
    id: house.Property_ID,
    name: house.Property_Name,
    lat: house.Lat,
    lng: house.Lng,
    price: house.Median_Price
  }));
}

module.exports = {
  getAllRegularHouses,
  getRegularHouseById,
  getRegularHouseLocations
};