const exprees = require('express');
const route = exprees.Router();
const {check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const config = require("../config/keys");


route.get("/", (req, res)=>res.send("From user"));
route.post("/", [
        check("name","Name is required!").not().isEmpty(),
        check("email","Enter a valid email address").isEmail(),
        check("password","Password should at least 6 characters").isLength({min:5}),
    ], async (req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }
        try {
            const {name,email,password}=req.body;

            let user = await User.findOne({email})

            if(user){
                return res
                .status(400)
                .json({errors: [{ msg:"Email already exist." }] })
            }
            user = new User({
                name,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            user.save();

            const payload = {
                user:{
                    id:user.id
                }
            }

            jwt.sign(payload, config.jwtSecrate, {expiresIn:3600*2},(err, token)=>{
                if (err) throw err;
                res.json({ token });
            } );


            // res.send("Users Created.")
        } catch (error) {
            res.status(500).send("Internal Server Error.");
        }
    });

module.exports = route;