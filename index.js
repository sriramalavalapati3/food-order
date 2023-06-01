const express=require("express");
const app=express();
require('dotenv').config()
app.use(express.json());
const {connection}=require("./config/config")



app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log(`server running at ${process.env.port} \n database connected`)
    } catch (error) {
        console.log(error.message)
    }
})