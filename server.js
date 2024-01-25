//importing modules
import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
//middleware
app.use(express.json());

//importing the routes
app.use("/api/user", router);

const dbConnectionString = process.env.DB_CONNECTION_STRING;
mongoose.connect(dbConnectionString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
.then(()=>app.listen(5000))
.then(()=>console.log("Connected to Database and listening to port 5000"))
.catch((err)=>console.log(err));
