const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
   {
      title: { type: String, required: true, unique: true },
      desc: { type: String },
      startdate: { type: String, required: true },
      tourguide: { type: String },
      enddate: { type: String, required: true },
      destination: { type: String, required: true },
      empty: { type: Number, required: true },
      schedule: { type: String },
      note: { type: String },
      img: { type: Array, required: true },
      categories: String,
      price: { type: Number, required: true },
      saleprice: { type: Number },
      childprice: { type: Number, required: true },
      childquantity: { type: Number, default: 0 },
      adultquantity: { type: Number, default: 0 },
   },
   { timestamps: true },
);
ProductSchema.index({ title: 'text' });
module.exports = mongoose.model('Product', ProductSchema);
