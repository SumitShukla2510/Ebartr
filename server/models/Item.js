const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  position: String,
  date: { type: Date }, 
  description: String,
  image: { data: Buffer, contentType: String }, 
  contactNo: String, 
  price: { type: Number }, 
  userID:String
});

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;
