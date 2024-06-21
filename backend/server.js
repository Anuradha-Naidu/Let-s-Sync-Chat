//const express = require("express")
import express from "express"  //package inputs
import dotenv from "dotenv"


import authRoutes from "./routes/auth.routes.js";     //file inputs
//import { connect } from "mongoose";
import connectToMongoDB from "./db/connectToMongoDB.js";
//const dotenv = require("dotenv");

dotenv.config();
//variables
const app = express();
const PORT = process.env.PORT || 5001; // this works after dotenv.config


//dotenv.config(); //port can be changed now without manually

app.use(express.json()); //to parse the incoming requests with JSON payloads,allow to extract fields from request body
app.use("/api/auth", authRoutes) //create routes folder in backend - middleware


app.get("/",(req,res) => {
 // rrot route http://localhost:5001/
 res.send("Hello World anu !");
});

//this will look messed up here so just use middleware 
/*
app.get("/api/auth/signup", (req,res) => {
 console.log("signup route");
});

app.get("/api/auth/login", (req,res) => {
 console.log("login route");
});

app.get("/api/auth/logout", (req,res) => {
 console.log("logout route");
}); */

app.use("/api/auth", authRoutes) //create routes folder in backend 


app.listen(PORT, () => {
 connectToMongoDB();
 console.log(`Server Running on port ${PORT}`)
});