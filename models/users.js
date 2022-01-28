const express = require("express");

const mongooes = require("mongoose");

const UserSchema = new mongooes.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"Customer",
    },
    date:{
        type:Date,
        default: Date.now(),
    },
});

const User = mongooes.model("User", UserSchema);

module.exports = User;

