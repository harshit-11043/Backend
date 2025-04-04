//require('dotenv').config({path:'./env'})
// import mongoose from "mongoose";
// import { DB_NAME} from "./constants.js"
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './.env'
})
connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("Error:", error);
        throw error;
    })
    app.listen(process.env.PORT || 8000, ()=>
    {
        console.log(`Server is running at port: ${process.env.PORT}`);
        
    })
})
.catch((error)=>
{
    console.log("MONGO DB Connection Failed!!!",error);
    
})












/*
import express from "express";
const app=express()
;(async ()=>{
    try{
        await mongoose.connect(`${process.env.}/${DB_NAME}`)
        app.on("error",(error)=>
        {
            console.log("Error:", error);
            throw error;
            
        })
        app.listen(process.env.PORT,()=>
        {
            console.log(`App is Listening on Port:${process.env.PORT}`);
            
        })
    }
    catch(error)
    {
        console.error("Error is", error);
        throw err
    }
})()
*/