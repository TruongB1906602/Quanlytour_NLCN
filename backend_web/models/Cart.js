const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    title: { type: String, required: true},
    img: { type: String, required: true },
    
    price: { type: Number, required: true },
    childprice: { type: Number, required: true },
    childquantity: { type: Number, required: true },
    adultquantity: { type: Number, required: true },
    adultquantity: { type: Number, required: true },
    startdate: { type: String },
    empty: { type: Number, required: true, },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);