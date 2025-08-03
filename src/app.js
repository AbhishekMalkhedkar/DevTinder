const express = require("express");
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");

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
const initializeSocket = require("./utils/socket");



app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

const server = http.createServer(app);

initializeSocket(server);



connectDb().then(()=> {
    console.log("Database connected...");
    server.listen(3000,()=>{
        console.log("Server running at 3000");
    });
}).catch(err => {
    console.error("Database cannot be connceted!! : " + err);
});

