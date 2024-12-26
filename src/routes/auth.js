const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");


const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    
    
    
    
    
    try {
        //Validation of data
        validateSignUpData(req);
        
        const { firstName, lastName, emailId, password, age, about, skills } = req.body;


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

authRouter.post("/login", async (req, res) => {
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

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null , {
        expires : new Date(Date.now()),
    })
    .send("Logout Successfull!!");
});

module.exports = authRouter;