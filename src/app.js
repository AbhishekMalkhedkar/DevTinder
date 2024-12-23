const express = require("express");
const connectDb = require("../config/database");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middlewares/auth");



const app = express();

app.use(express.json());

app.use(cookieParser());

app.post("/signup", async (req, res) => {
    
    
    
    
    
    try {
        //Validation of data
        validateSignUpData(req);
        
        const { firstName, lastName, emailId, password, age } = req.body;


        // Encrypt the password

        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);
        
        const user = new User({
            firstName,
            lastName,
            emailId,
            age,
            password:passwordHash,
            about,
            skills
        });
        await user.save();
        res.send("User Added!!");    
    } catch (error) {
        res.status(400).send(" Error : (" + error.message + ")");
        console.log(error.message);
    }

    
});


app.post("/login", async (req, res) => {
    try{
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId : emailId });
        if(!user){
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){

            //Create a JWT Token

            const token = await user.getJWT();
            
            

            //Add the token to cookie and send the response back to user

            res.cookie("token", token);


            res.send("Login Successfull !!");
        }else{
            throw new Error("Invalid credentials");
        }


    }catch (error) {
        res.status(400).send(" Error : (" + error.message + ")");
        console.log(error.message);
    }
});


app.get("/profilee", userAuth, async (req, res) => {

    try{
    
        const user = req.user;
        res.send(user);
    }catch (error) {
        res.status(400).send(" Error : (" + error.message + ")");
        console.log(error.message);
    }
});

app.post("/sendConnectionRequest",userAuth, async (req, res) => {

    const user = req.user;
    // Sending a connection request
    console.log("Sending a connection request");

    res.send(user.firstName +  " Sent the connection request!!");

})





connectDb().then(()=> {
    console.log("Database connected...");
    app.listen(3000,()=>{
        console.log("Server running at 3000");
    });
}).catch(err => {
    console.error("Database cannot be connceted!!");
});

