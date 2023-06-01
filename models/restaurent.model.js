const mongoose=require("mongoose");

// ===============================================>  restaurentSchema
const resSchema=mongoose.Schema({
    "name": String,
  "address": {
    "street": String,
    "city": String,
    "state": String,
    "country": String,
    "zip": String
  },
  "menu": [{
    "name": String,
    "description": String,
    "price": Number,
    "image": String
  }]
    
   
})
const Restaurentmodel=mongoose.model("RestaurentDETAILS",resSchema);
module.exports={Restaurentmodel}