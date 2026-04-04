const { processRisk } = require("./risk.service");

const analyzeRisk = async (req, res) => {
  try {
    const { propertyId } = req.body;

    if (!propertyId) {
      return res.status(400).json({ error: "Missing propertyId" });
    }

    const result = await processRisk(propertyId);

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { analyzeRisk };