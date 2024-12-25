const express = require("express");
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");





const app = express();

app.use(express.json());

app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");



app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);



connectDb().then(()=> {
    console.log("Database connected...");
    app.listen(3000,()=>{
        console.log("Server running at 3000");
    });
}).catch(err => {
    console.error("Database cannot be connceted!!");
});

