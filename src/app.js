const express = require("express");
const connectDb = require("../config/database");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");




const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    //Encrypt the password
    
    
    
    
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
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid){
            res.send("Login Successfull !!");
        }else{
            throw new Error("Invalid credentials");
        }


    }catch (error) {
        res.status(400).send(" Error : (" + error.message + ")");
        console.log(error.message);
    }
})


app.get("/user", async (req, res) => {
    try {
        const user = new User.findById(req.body.id);
    if(!user){
        res.status(404).send("User not found");
    }else{
        res.send(user);
    }
    } catch (error) {
        res.status(400).send("Something went wrong");
        // console.error(err);
    }
});

app.get("/users", async (req, res) => {
    try {
        const users = await User.find({});
        if(users.length===0){
            res.status(404).send("User not found");
        }else{
            res.send(users);
        }
    } catch (error) {
        res.status(400).send("Something went wrong");
        console.error(error);
    }
});

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try {
        const ALLOWED_UPDATES = ["userId","photoUrl","about","gender", "age", "skills"];

        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed){
            throw new Error("Update not allowed"); 
        }

        if(data.skills?.length > 10){
            throw new Error("Skills cannot be more than 10!");
        }
    
        const user = await User.findByIdAndUpdate(userId, data, {
        returnDocument : "after",
        runValidators : true
    });

        console.log(user);
            
        res.send("User updated successfully");
    } catch (error) {
        res.status(400).send("Something went wrong = > " + error.message);
        console.log(error);

    }

});

app.delete("/user", async (req, res) => {
    const userId = req.body.id;
    try {
        await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (error) {
        res.status(400).send("Something went wrong");
    }
});





connectDb().then(()=> {
    console.log("Database connected...");
    app.listen(3000,()=>{
        console.log("Server running at 3000");
    });
}).catch(err => {
    console.error("Database cannot be connceted!!");
});

