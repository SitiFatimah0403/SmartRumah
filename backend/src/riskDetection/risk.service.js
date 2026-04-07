const axios = require("axios");

const properties = require("./data/properties.json");

const getPropertyById = (id) => {
  return properties.find(p => p.id === id);
};

const processRisk = async (propertyId) => {
  try {
    
    const property = getPropertyById(propertyId);

    if (!property) {
      throw new Error("Property not found");
    }

    const { lat, lng, area } = property;

    //ni yang akan call API elevation
    let elevation;

    try {
      const response = await axios.get(
        `https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lng}`
      );

      elevation = response.data.results[0].elevation;

      console.log("✅ Elevation API success:", elevation);

    } catch (err) {
      console.log("⚠️ API failed, using fallback");

      //since OpenEelvation tu unstable, fallback formula (dynamic per property) will be used
      elevation = 30 + Math.abs((lat * lng * 1000) % 120);
    }

    //SLOPE LOGIC - will be generated based on elevation - ni logic kita yang penting
    let slope;
    if (elevation < 50) {
      slope = "Low";
    } else if (elevation >= 50 && elevation <= 120) {
      slope = "Medium";
    } else {
      slope = "High";
    } 

    //RAINFALL LOGIC - based on area
    let rainfall;
    if (area === "KL") {
      rainfall = 2400;
    } else if (area === "Selangor") {
      rainfall = 2500;
    } else if (area === "Putrajaya") {
      rainfall = 2300;
    } else {
      rainfall = 2000; // default fallback
    }

    //FLOOD RISK LOGIC - if low elevation with high rainfall -> HIGH RISK
    let floodRisk;
    if (elevation < 50 && rainfall > 2300) {
      floodRisk = "High";
    } else if (elevation < 100 && rainfall > 2000) {
      floodRisk = "Medium";
    } else {
      floodRisk = "Low";
    }

    //LANDSLIDE RISK LOGIC - if high slope with high rainfall -> HIGH RISK
    let landslideRisk;
    if (slope === "High" && rainfall > 2300) {
      landslideRisk = "High";
    } else if (slope === "Medium" && rainfall > 2000) {
      landslideRisk = "Medium";
    } else {
      landslideRisk = "Low";
    }

    //CONVERSION RISK TO SCORE LOGIC
    const convertRiskToScore = (risk) => {
      if (risk === "Low") return 20;
      if (risk === "Medium") return 50;
      if (risk === "High") return 80;
      return 0;
    };

    const floodScore = convertRiskToScore(floodRisk);
    const landslideScore = convertRiskToScore(landslideRisk);
    const averageRisk = (floodScore + landslideScore) / 2; //ambik average je between flood and slide

    //SAFETY INDEX LOGIC
    const safetyIndex = 100 - averageRisk;
    let safetyLevel;
    if (safetyIndex >= 80) {
      safetyLevel = "Safe";
    } else if (safetyIndex >= 60) {
      safetyLevel = "Moderate";
    } else if (safetyIndex >= 40) {
      safetyLevel = "Caution";
    } else {
      safetyLevel = "High Risk";
    }

    //RETURN ALL DATA
    return {
      propertyId,
      message: "Environmental risk analysis completed",
      lat,
      lng,
      area,
      elevation,
      slope,
      rainfall,
      floodRisk,
      landslideRisk,
      averageRisk,
      safetyIndex,
      safetyLevel
    };

  } catch (err) {
    throw err; // or return error
  }
  
};

module.exports = { processRisk };