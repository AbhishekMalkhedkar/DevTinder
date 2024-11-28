const express = require("express");

const app = express();


app.get("/profile", (req, res) => {
    res.send("Get request");
});

app.post("/profile" ,(req, res) => {
    res.send("Profile Posted Successfully!");
});

app.put("/profile",(req, res) => {
    res.send("Profile Updated Successfully!");
});

app.delete("/profile", (req, res) => {
    res.send("Profile Deleted Successfully!");
});

app.listen(3000,()=>{
    console.log("Server running at 3000");
});