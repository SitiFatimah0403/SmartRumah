const { calculateTrueMonthlyCost } = require("./service");

const calculateTrueCost = (req, res) => {
  try {
    const { propertyId, userProfile } = req.body || {};

    if (!propertyId || !userProfile) {
      return res.status(400).json({
        status: "error",
        message: "propertyId and userProfile are required"
      });
    }

    // Call the math logic from the service file
    const result = calculateTrueMonthlyCost({ propertyId, userProfile });
    return res.json(result);
    
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
      status: "error",
      message: err.message
    });
  }
};

module.exports = { calculateTrueCost };