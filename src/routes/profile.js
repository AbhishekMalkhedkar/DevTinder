const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileDaata } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {

    try{
    
        const user = req.user;
        res.send(user);
    }catch (error) {
        res.status(400).send(" Error : (" + error.message + ")");
        console.log(error.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {

    try{
        if(!validateEditProfileDaata(req)){
            throw new Error("invalid edit request");
        }

        const loggedInUser = req.user;  

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();        

        res.json({message : `${loggedInUser.firstName}, your profile is updated successfully`, data: loggedInUser});


    }catch(err){
        res.status(400).send("Error : " + err);
    }


});


module.exports = profileRouter;