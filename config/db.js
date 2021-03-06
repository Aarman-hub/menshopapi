const mongoose = require('mongoose');
const config = require("./keys");

const db = config.mongoURI;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser:true,
        });
        console.log("Database connected.")
    } catch (error) {
        process.exit(1);
    }
};

module.exports = connectDB;