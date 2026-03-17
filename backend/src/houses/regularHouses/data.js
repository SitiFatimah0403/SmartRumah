// src/houses/regularHouses/data.js

const kl = require("./list/kl.json");
const putrajaya = require("./list/putrajaya.json");
//const selangor = require("./list/selangor.json");

const regularHouses = [
  ...kl,
  ...putrajaya
  //...selangor
];

module.exports = regularHouses;