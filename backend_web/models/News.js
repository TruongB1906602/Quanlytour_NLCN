const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    destination: { type: String, required: true, },
    img: { type: Array, required: true },
   
  },
  { timestamps: true }
); 

module.exports = mongoose.model("News", NewsSchema);