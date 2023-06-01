const mongoose=require("mongoose");

// ===============================================>  userSchema
const orderSchema=mongoose.Schema({
   
    "user" : { type: ObjectId, ref: 'USERSDETAILS' },
    "restaurant" : { type: ObjectId, ref: 'RestaurentDETAILS' },
  "items": [{
   "name": String,
    "price": Number,
    "quantity": Number
  }],
  "totalPrice": Number,
  "deliveryAddress": {
    "street": String,
    "city": String,
    "state": String,
    "country": String,
    "zip": String
  },
  "status": String
   
})
const Ordermodel=mongoose.model("OrderDETAILS",orderSchema);

module.exports={Ordermodel}