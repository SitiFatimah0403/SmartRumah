const express = require("express")
const cors = require("cors")

const app = express()

const authRoutes=require("./src/auth/routes")
const housingSchemeRoutes = require("./src/houses/housingScheme/routes");
const userRoutes = require("./src/user/user.routes")

app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/housing-schemes", housingSchemeRoutes);
app.use("/houses", regularHouseRoutes);
app.use("/map", mapRoutes);
app.use("/users", userRoutes);


app.get("/", (req,res)=>{
    res.send("SmartRumah backend running")
})

const PORT = 5000

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})