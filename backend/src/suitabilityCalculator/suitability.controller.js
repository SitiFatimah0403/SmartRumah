const { computeSuitability } = require("./suitability.service");

const calculateSuitability = async (req, res) => {
  try {
    const { propertyId, weights, userOverrides } = req.body || {};

    if (!propertyId) {
      return res.status(400).json({
        status: "error",
        message: "propertyId is required"
      });
    }

    const result = await computeSuitability({
      propertyId,
      uid: req.user?.uid,
      customWeights: weights,
      userOverrides
    });

    return res.status(200).json({
      status: "success",
      data: result
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      status: "error",
      message: error.message
    });
  }
};

module.exports = { calculateSuitability };
