const jwt = require("jsonwebtoken")

const auth = (req,res,next) =>{
 let token = req.headers.authorization
 if(token){
    jwt.verify(token, 'name', function(err, decoded) {
        if(decoded){
            // console.log(decoded)
            req.body.userId = decoded.userId
            next()
        }else{
            res.status(400).send({"message":"login first"})
        }
      });
    
 }else{
    res.status(400).send({"message":"login first"})
}
}

module.exports={auth}