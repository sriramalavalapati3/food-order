const express=require("express");
const app=express();
const swaggerjsdoc=require("swagger-jsdoc");
const swaggerui=require("swagger-ui-express");

require('dotenv').config()
app.use(express.json());
const {connection}=require("./config/config")
const {userrouter}=require("./routes/credential.route")
const {Resrouter}=require("./routes/restaurent.router")
app.use("/api",userrouter)
app.use("/api",Resrouter)



//===================================================> swagger code
const options={
    definition:{
        openapi: "3.0.0",
        info:{
            title:"food ordering api doc",
            version:"0.1",
            description:
            "This is a food order website where u can order food by registering and login using following end points ",
            contact:{
                name:"sriram",
                CourseID:"fw22_0103",
                email:"sriramalavalapatiit01@gmail.com"
            }

        },
        servers:[
            {
                url:"http://localhost:4500/"
            },
        ],
    },
    apis:["./routes/*.js"]
}



const spacs=swaggerjsdoc(options);
app.use("/api-docs",swaggerui.serve,swaggerui.setup(spacs))





//==================================================================================



app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log(`server running at ${process.env.port} \n database connected`)
    } catch (error) {
        console.log(error.message)
    }
})