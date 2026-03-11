const authMiddleware = require("./middleware")

const router=require("express").Router()

router.get("/me", authMiddleware, (req, res)=> {

  req.json(
    {
      message: "User authenticated",
      user: req.user
    }
  )
})

module.exports=router