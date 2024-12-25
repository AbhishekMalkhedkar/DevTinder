const express = require("express");
const { userAuth } = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/profilee", userAuth, async (req, res) => {

    try{
    
        const user = req.user;
        res.send(user);
    }catch (error) {
        res.status(400).send(" Error : (" + error.message + ")");
        console.log(error.message);
    }
});

module.exports = profileRouter;