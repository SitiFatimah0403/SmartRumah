function calculateTrueMonthlyCost({ propertyId, userProfile }) {
  const { isFirstTimeBuyer = false, downpaymentPercentage = 0 } = userProfile;

  if (downpaymentPercentage < 0 || downpaymentPercentage > 1) {
    const error = new Error("downpaymentPercentage must be between 0 and 1");
    error.statusCode = 400;
    throw error;
  }

  // Phase 1: hardcoded mock property
  const mockProperty = {
    id: "prop_001",
    price: 512000,
    sizeSqft: 850,
    type: "Serviced Apt",
    mockDistanceKm: 25,
    mockTollDaily: 5.0
  };

  if (propertyId !== mockProperty.id) {
    const error = new Error("Property not found in mock dataset");
    error.statusCode = 404;
    throw error;
  }

  const propertyPrice = mockProperty.price;
  const isZeroDownpayment = Number(downpaymentPercentage) === 0;

  const loanAmount =
    isFirstTimeBuyer && isZeroDownpayment
      ? propertyPrice
      : propertyPrice - propertyPrice * Number(downpaymentPercentage);

  const annualInterestRate = 0.04;
  const monthlyInterestRate = annualInterestRate / 12;
  const loanTenureYears = 35;
  const totalPayments = loanTenureYears * 12;

  const growthFactor = Math.pow(1 + monthlyInterestRate, totalPayments);
  const mortgageMonthly =
    (loanAmount * monthlyInterestRate * growthFactor) / (growthFactor - 1);

  const month1Interest = loanAmount * monthlyInterestRate;
  const month1Principal = mortgageMonthly - month1Interest;

  const petrolPerLiter = 2.05;
  const kmPerLiter = 15;
  const workingDaysPerMonth = 22;

  const dailyPetrol =
    ((mockProperty.mockDistanceKm * 2) / kmPerLiter) * petrolPerLiter;
  const dailyCommute = dailyPetrol + mockProperty.mockTollDaily;
  const monthlyCommute = dailyCommute * workingDaysPerMonth;

  const maintenanceRatePerSqft = 0.3;
  const utilityPenalty =
    mockProperty.type.toLowerCase() === "serviced apt" ? 100 : 0;
  const maintenanceFee =
    mockProperty.sizeSqft * maintenanceRatePerSqft + utilityPenalty;

  const estimatedTotal = mortgageMonthly + monthlyCommute + maintenanceFee;

  return {
    status: "success",
    data: {
      estimatedTotal: Math.round(estimatedTotal),
      breakdown: {
        mortgageTotal: Math.round(mortgageMonthly),
        commuteAndTolls: Math.round(monthlyCommute),
        maintenanceFees: Math.round(maintenanceFee)
      },
      mortgageDetails: {
        principal: Math.round(month1Principal),
        interest: Math.round(month1Interest),
        propertyPrice,
        loanAmount: Math.round(loanAmount)
      }
    }
  };
}

module.exports = { calculateTrueMonthlyCost };