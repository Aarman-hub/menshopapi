const express = require('express');
const route = express.Router();
const auth = require("../middleware/authorization");
const User = require("../models/users");
const {check, validationResult} = require('express-validator');
const res = require('express/lib/response');
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require("jsonwebtoken");
const config = require('../config/keys');


route.get('/', auth, async (req, res)=>{
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        console.log(error)
    }
});

route.post("/", [
    check("email","Please enter a valid email").isEmail(),
    check("password","Password is required").exists(),
] , 
    async ()=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        const {email, password} = req.body;
        let user = await User.findOne({email});
        if(!user){
            return res
            .status(400)
            .json({error: [{msg:"Invalid username or password"}]})
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res
            .status(400)
            .json({error: [{msg:"Invalid username or password"}]})
        }

        const payload = {
            user:{
                id:user.id,
            },
        };
        jwt.sign(payload, config.jwtSecrate, {expiresIn:3600*2},(err, token)=>{
            if (err) throw err;
            res.json({ token });
        });

    } catch (error) {
        res.status(500).send("Internal server error.")
    }
});

module.exports = route;