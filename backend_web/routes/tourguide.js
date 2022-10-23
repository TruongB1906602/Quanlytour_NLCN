const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Pay = require("../models/Pay");
const User = require("../models/User");

const router = require("express").Router();

router.post("/",async (req, res) => {
  const newTourguide = new Tourguide(req.body);
  try {
    const savedTourguide = await newTourguide.save();
    res.status(200).json(savedTourguide);
  } catch (err) {
    res.status(500).json(err);
  }
  // return res.send(document);
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedTourguide = await Tourguide.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedTourguide);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Chỗ gây lỗi Check Tourguide
//DELETE
// router.delete("/:id", async (req, res) => {
//   try {
//     await Tourguide.findByIdAndDelete(req.params.id);
//     res.status(200).json("Tourguide has been deleted...");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// 
//GET Tourguide
router.get("/find/:id", async (req, res) => {
  try {
  
    const newProduct = await Product.findById(req.params.id);
    const newOrder = await Order.findById(req.params.id);
    const newCart = await Cart.findById(req.params.id);
    const newUser = await User.findById(req.params.id);
    const newPay = await Pay.findById(req.params.id);

     
    res.status(200).json({
        
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



//GET ALL TourguideS
router.get("/", async (req, res) => {

    try{
      const Products = await Product.find();
      const Orders = await Order.find();
      const Carts = await Cart.find();
      const Users = await User.find();
      const Pays = await Pay.find();
      
      res.status(200).json({
          Products,
          Orders,
          Carts,
          Users,
          Pays
      });
    }catch (err) {
      res.status(500).json(err);
    }
});
//sadsdas

module.exports = router;