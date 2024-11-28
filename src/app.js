const express = require("express");
const {adminAuth, userAuth } = require("../middlewares/auth");
const app = express();


app.use("/admin", adminAuth);

app.get("/admin", (req, res) => {
    res.send("Get request");
});

app.get("/admin/:adminId", (req, res) => {
    // console.log(req.params);
    res.send("admin Id");
});

app.get("/user",userAuth, (req,res) => {
    res.send("user data");
} );


app.listen(3000,()=>{
    console.log("Server running at 3000");
});