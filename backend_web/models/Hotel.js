const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
   
    address: { type: String, required: true, },
    area: { type: String, required: true, },
    // tableprice: { type: String, required: true, },
    // infor: { type: String, required: true, },
    img: { type: Array, required: true },
    categories:String,
    price: { type: Number, required: true },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", HotelSchema);