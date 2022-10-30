const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Pay = require("../models/Pay");
const User = require("../models/User");
const New = require("../models/News");




const router = require("express").Router();

router.post("/",async (req, res) => {
  const newAdmin = new Admin(req.body);
  try {
    const savedAdmin = await newAdmin.save();
    res.status(200).json(savedAdmin);
  } catch (err) {
    res.status(500).json(err);
  }
  // return res.send(document);
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedAdmin);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Chỗ gây lỗi Check Admin
//DELETE
// router.delete("/:id", async (req, res) => {
//   try {
//     await Admin.findByIdAndDelete(req.params.id);
//     res.status(200).json("Admin has been deleted...");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// 
//GET Admin
router.get("/find/:id", async (req, res) => {
  try {
  
    const newProduct = await Product.findById(req.params.id);
    const newOrder = await Order.findById(req.params.id);
    const newCart = await Cart.findById(req.params.id);
    const newUser = await User.findById(req.params.id);
    const newPay = await Pay.findById(req.params.id);
    const newNews = await News.findById(req.params.id);

     
    res.status(200).json({
        
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



//GET ALL AdminS
router.get("/", async (req, res) => {

    try{
      const Products = await Product.find();
      const Orders = await Order.find();
      const Carts = await Cart.find();
      const Users = await User.find();
      const Pays = await Pay.find();
      const News = await New.find();
      
      res.status(200).json({
          Products,
          Orders,
          Carts,
          Users,
          Pays,
          News,
      });
    }catch (err) {
      res.status(500).json(err);
    }
});
//sadsdas

module.exports = router;