const express = require("express");
const connectDb = require("../config/database");
const User = require("../models/user");

const app = express();

app.post("/signup", async (req, res) => {


    const user = new User ({
        firstName : "Akshay",
        lastName : "Shetty",
        emailId : "akshay@gmail.com",
        password : "akshay@123",
        age : "21",
        gender : "male"
    });
    
    await user.save();
    res.send("User Added!!");
});

connectDb().then(()=> {
    console.log("Database connected...");
    app.listen(3000,()=>{
        console.log("Server running at 3000");
    });
}).catch(err => {
    console.error("Database cannot be connceted!!");
});

