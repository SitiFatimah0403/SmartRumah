const authMiddleware = require("./middleware")
const { registerUser } = require("./controller")
const router=require("express").Router()

router.get("/me", authMiddleware, (req, res)=> {

  res.json(
    {
      message: "User authenticated",
      user: req.user
    }
  )
})

router.post("/register", registerUser);

module.exports=router