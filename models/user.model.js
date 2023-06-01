const mongoose=require("mongoose");

// ===============================================>  userSchema
const userSchema=mongoose.Schema({
    "name": String,
    "email": String,
    "password": String,
    "address": {
      "street": String,
      "city": String,
     "state": String,
      "country": String,
      "zip": String
    }
   
})
const Usermodel=mongoose.model("USERSDETAILS",userSchema);

module.exports={Usermodel}