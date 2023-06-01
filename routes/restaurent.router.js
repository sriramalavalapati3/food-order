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