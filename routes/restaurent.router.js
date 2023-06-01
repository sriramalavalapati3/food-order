/**
 * @swagger
 * components:
 *   schemas:
 *     users:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of user
 *         email:
 *           type: string
 *           description: User email
 *         address:
 *           type: object
 *           description: User address
 *           properties:
 *             street:
 *               type: string
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             country:
 *               type: string
 *             zip:
 *               type: string
 *         menu:
 *           type: array
 *           description: Menu items
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *       required:
 *         - name
 *         - email
 *         - address
 *         - menu
 */


/**
 * @swagger
 * paths:
 *   /restaurants:
 *     get:
 *       summary: Get details of all restaurants
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Restaurant'
 *         '500':
 *           description: Internal Server Error
 *
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The ID of the restaurant
 *         name:
 *           type: string
 *           description: The name of the restaurant
 *         address:
 *           type: string
 *           description: The address of the restaurant
 *       required:
 *         - id
 *         - name
 *         - address
 */

/**
 * @swagger
 * paths:
 *   /restaurants/{id}:
 *     get:
 *       summary: Get details of a restaurant by ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the restaurant
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Restaurant'
 *         '404':
 *           description: Restaurant not found
 *         '500':
 *           description: Internal Server Error
 *
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The ID of the restaurant
 *         name:
 *           type: string
 *           description: The name of the restaurant
 *         address:
 *           type: string
 *           description: The address of the restaurant
 *       required:
 *         - id
 *         - name
 *         - address
 */


/**
 * @swagger
 * paths:
 *   /restaurants/{id}/menu:
 *     get:
 *       summary: Get the menu of a particular restaurant
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the restaurant
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/MenuItem'
 *         '404':
 *           description: Restaurant not found
 *         '500':
 *           description: Internal Server Error
 *
 * components:
 *   schemas:
 *     MenuItem:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the menu item
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the menu item
 *       required:
 *         - name
 *         - price
 */


/**
 * @swagger
 * paths:
 *   /restaurants/{id}/menu:
 *     post:
 *       summary: Add an item to the menu of a particular restaurant
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the restaurant
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       responses:
 *         '200':
 *           description: Menu item added successfully
 *         '500':
 *           description: Internal Server Error
 *
 * components:
 *   schemas:
 *     MenuItem:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the menu item
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the menu item
 *       required:
 *         - name
 *         - price
 */


/**
 * @swagger
 * paths:
 *   /restaurants/{id}/menu/{itemid}:
 *     delete:
 *       summary: Delete a menu item from a particular restaurant
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the restaurant
 *         - in: path
 *           name: itemid
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the menu item
 *       responses:
 *         '200':
 *           description: Menu item deleted successfully
 *         '500':
 *           description: Internal Server Error
 */

const express=require("express");
const Resrouter=express.Router();
const {Restaurentmodel}=require("../models/restaurent.model")
//==========================================>get all restaurent details


Resrouter.get("/restaurants",async(req,res)=>{
    try {
        let data=await Restaurentmodel.find();
        res.status(200).send(data)
    } catch (error) {
        res.send(error.message)
    }
})

//============================================>get details of restaurent by id 

Resrouter.get("/restaurants/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        let data=await Restaurentmodel.find({_id:id});
        if(data!==""||data!==[])
        {
            res.status(200).send(data)
        }else{
            res.status(200).send("cant find info")
        }
       
    } catch (error) {
        res.send(error.message)
    }
})

//===============================================> get menu of perticular restaurent

Resrouter.get("/restaurants/:id/menu",async(req,res)=>{
    try {
        let id=req.params.id;
        let data=await Restaurentmodel.find({_id:id},{menu:1});
        if(data!==""||data!==[])
        {
            
            res.status(200).send(data)
        }else{
            res.status(200).send("cant find info")
        }
       
    } catch (error) {
        res.send(error.message)
    }
})

// ====================================>       add item


Resrouter.post("/restaurants/:id/menu",async(req,res)=>{
    try {
        let _id=req.params.id;
        let data=req.body;
        await Restaurentmodel.findByIdAndUpdate(_id,{$push:{menu:data}});
       
            
            res.status(200).send("update it succesfully")
       
    
       
       
    } catch (error) {
        res.send(error.message)
    }
})

// delete item in menu

Resrouter.delete("/restaurants/:id/menu/:itemid",async(req,res)=>{
    try {
        let _id=req.params.id;
        let itemid=req.params.itemid;
        

        await Restaurentmodel.findByIdAndUpdate(_id,{$pull:{menu:{_id:itemid}}});
       
            
            res.status(200).send("deleted it succesfully")
       
    
       
       
    } catch (error) {
        res.send(error.message)
    }
})


module.exports={Resrouter}