// src/houses/housingScheme/data.js
const schemes = [

  {
    name: "PR1MA",
    minAge: 21,
    incomeMin: 2500,
    incomeMax: 15000,
    locations: ["Kuala Lumpur", "Selangor", "Putrajaya"],
    firstHomeRequired: true
  },

  {
    name: "Residensi Wilayah",
    minAge: 21,
    incomeMax: 15000,
    locations: ["Kuala Lumpur"],
    firstHomeRequired: true
  },

  {
    name: "Rumah Selangorku",
    minAge: 18,
    incomeMax: 10000,
    locations: ["Selangor"],
    firstHomeRequired: true
  },

  {
    name: "Skim Rumah Pertamaku",
    minAge: 18,
    incomeMax: 10000,
    locations: ["Kuala Lumpur", "Selangor"],
    firstHomeRequired: true
  },

  {
    name: "PPR",
    minAge: 18,
    incomeMax: 3000,
    locations: ["Kuala Lumpur", "Selangor"],
    firstHomeRequired: true
  }

];

module.exports = schemes;