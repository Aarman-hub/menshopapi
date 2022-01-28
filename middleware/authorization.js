const jwt = require("jsonwebtoken");
const config = require("../config/keys");


module.exports = (req, res, next) =>{
    const token = req.header("x-auth-token");

    if(!token){
        return res
            .status(401)
            .json({msg:"You do not have the right authorization"});
    }
    try {
        const decoded =jwt.verify(token, config.jwtSecrate);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({msg:"Invalid Token"})
    }
};