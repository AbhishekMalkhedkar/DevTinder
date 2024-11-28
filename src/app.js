const express = require("express");

const app = express();


app.get("/user", (req, res) => {
    console.log(req.query);
    res.send("Get request");
});

app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params);
    res.send("Get request");
});


app.listen(3000,()=>{
    console.log("Server running at 3000");
});