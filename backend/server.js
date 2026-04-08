require('dotenv').config();

const express = require("express")
const cors = require("cors")

const app = express()

const authRoutes=require("./src/auth/routes")
const housingSchemeRoutes = require("./src/houses/housingScheme/routes");
const userRoutes = require("./src/user/user.routes")
const regularHouseRoutes = require("./src/houses/regularHouses/routes");
const mapRoutes = require("./src/map/routes");
const recommendationRoutes = require("./src/recommendation/routes");
const propertyRoutes = require("./src/houses/property.routes");
const riskRoutes = require("./src/riskDetection/risk.routes");
const costCalculatorRoutes = require("./src/costCalculator/routes");
const suitabilityRoutes = require("./src/suitabilityCalculator/suitability.routes");


app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/housing-schemes", housingSchemeRoutes);
app.use("/houses", regularHouseRoutes);
app.use("/map", mapRoutes);
app.use("/users", userRoutes);
app.use("/recommendations", recommendationRoutes);
app.use("/properties", propertyRoutes);
app.use("/api", riskRoutes);
app.use("/api", costCalculatorRoutes);
app.use("/api", suitabilityRoutes);


app.get("/", (req,res)=>{
    res.send("SmartRumah backend running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})