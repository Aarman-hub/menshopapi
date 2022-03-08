const express = require('express');
const app = express()
require('dotenv').config()

const connectDB = require('./config/db');


connectDB();


app.use(express.json({ extended:false}));
app.use("/api/user/", require("./routes/userApi"));
app.use("/api/auth/", require("./routes/authApi"));
app.use("/api/products/", require("./routes/productApi"));


app.get('/',(req, res)=>{
    res.send('Hello from nodejs.');
});

app.get('/test',(req, res)=>{
    res.send("from test.")
});


const port = process.env.port || 8000 ;

app.listen(port, ()=>{
    console.log(`App is running port ${port}`);
});