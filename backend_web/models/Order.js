
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String },
    tourguideId: { type: String },
  
     quantity: {
       type: Number,
       default: 1,
       required:true
    },
    img: { type: String},
    childquantity: { type: Number },
    phone: { type: String, required: true },
  
    address: { type: String, required: true },
    title: { type: String, required: true },
    Matour: { type: String },
    methods: { type: String, required:true },
    startdate: { type: String },
    email: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    nametourguide: { type: String},
    childprice: { type: Number, required: true },
    adultquantity: { type: Number, required: true },
    
    status: { type: String, default: "Đang xử lý..." },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);