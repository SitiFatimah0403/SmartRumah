const admin=require("./firebase")

async function verifyToken(token){
  try{

    const decodedToken=await admin.auth().verifyIdToken(token)

    return decodedToken
  
  } catch (error){
    throw new Error ("Invalid token")
  }
}

module.exports= {
  verifyToken
}