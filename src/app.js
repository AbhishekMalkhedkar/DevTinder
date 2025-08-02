const express = require("express");
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();



const app = express();

app.use(cors({
    origin : "http://localhost:5173",
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], 
    credentials : true,
})
);

app.use(express.json());

app.use(cookieParser());


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");



app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);



connectDb().then(()=> {
    console.log("Database connected...");
    app.listen(3000,()=>{
        console.log("Server running at 3000");
    });
}).catch(err => {
    console.error("Database cannot be connceted!! : " + err);
});

