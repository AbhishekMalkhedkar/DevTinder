const mongoose = require("mongoose");

const connectDb = async () => {
    
   await mongoose.connect(
    "mongodb+srv://abhi:Abhi@cluster0.rveps.mongodb.net/devTinder");
};

module.exports = connectDb;