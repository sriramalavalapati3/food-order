/**
 * @swagger
 * components:
 *   schemas:
 *     users:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: "Id will be generated automatically"
 *         name:
 *           type: string
 *           description: "Name of user"
 *         email:
 *           type: string
 *           description: "User email"
 *         address:
 *           type: object
 *           description: "User address"
 *         password:
 *           type: string
 *           description: "User password"
 *       required:
 *         - name
 *         - email
 *         - address
 *         - password
 */

/**
 * @swagger
 * paths:
 *   /register:
 *     post:
 *       summary: Register a new user
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 Email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 address:
 *                   type: string
 *               required:
 *                 - name
 *                 - Email
 *                 - password
 *                 - address
 *       responses:
 *         '201':
 *           description: Registered successfully
 *         '400':
 *           description: Something went wrong while registering
 *         '500':
 *           description: Internal Server Error
 */


/**
 * @swagger
 * paths:
 *   /login:
 *     post:
 *       summary: Login for existing user
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *               required:
 *                 - email
 *                 - password
 *       responses:
 *         '201':
 *           description: Login successful
 *         '400':
 *           description: Wrong credentials
 *         '500':
 *           description: Internal Server Error
 */


const express=require("express");
const userrouter=express.Router();
const {Usermodel}=require("../model/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

// ========================================> user register route


userrouter.post("/register",async(req,res)=>{
    const {name,Email,password,address}=req.body
    try {
        bcrypt.hash(password, 3, async function(err, hash) {
            if(!err)
            {
              let userdata= new Usermodel({name,Email,password:hash,address})
              await userdata.save();
              res.status(201).send("Registered successfully")
            }else{
                res.send("something went wrong while register")
            }
        }); 
    } catch (error) {
        res.send(error.message)
    }
})


// ===============================================> user login route


userrouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
     
         const user=await Usermodel.findOne({email})
         if(user){
         bcrypt.compare(password, user.password, function(err, result) {
         if(result){
         const token = jwt.sign({userID:user._id},process.env.token);
        
        
         res.status(201).send({"msg":"Login Successfull","token":token})
         } else {res.send("Wrong Credntials")}
         });
         } else {
         res.send("Wrong Credntials")
         }
         }
     catch (error) {
     res.send(`Something went wrong \n ${error.message}`)
 
 
    }
})



module.exports={userrouter}