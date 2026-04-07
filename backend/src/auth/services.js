const { auth } = require("./firebase")

async function verifyToken(token){
  try{

    const decodedToken = await auth.verifyIdToken(token)

    return decodedToken
  
  } catch (error){
    throw new Error ("Invalid token")
  }
}

module.exports= {
  verifyToken
}