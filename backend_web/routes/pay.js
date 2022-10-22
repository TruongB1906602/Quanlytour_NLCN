const Pay = require("../models/Pay");

const router = require("express").Router();

//CREATE

router.post("/",async (req, res) => {
  const newPay = new Pay(req.body);
  try {
      const savedPay = await newPay.save();
      res.status(200).json(savedPay);
  } catch (err) {
    res.status(500).json(err);
  }
});
//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedPay = await Pay.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPay);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Pay.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:id",async (req, res) => {
  try {
    const pay = await Pay.findById( req.params.id);
    res.status(200).json(pay);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:userId",async (req, res) => {
  try {
    const pay = await Pay.find( {userId: req.params.userId});
    res.status(200).json(pay);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Đang phát triển
// // //GET ALL
// router.get("/",async (req, res) => {
//   try {
//     const pays = await Pay.find();
//     res.status(200).json(pays);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.delete("/",async (req, res) => {
  try {
    const pays = await Pay.find();
    res.status(200).json(pays);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/",async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let pays;

    if (qNew) {
       pays = await  Pay.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
        pays = await Pay.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
        pays = await Pay.find();
    }

    res.status(200).json(pays);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;