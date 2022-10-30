const News = require("../models/News");

const router = require("express").Router();

//CREATE

router.post("/",async (req, res) => {
  const newNews = new News(req.body);
  try {
      const savedNews = await newNews.save();
      res.status(200).json(savedNews);
  } catch (err) {
    res.status(500).json(err);
  }
});
//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedNews);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:id",async (req, res) => {
  try {
    const news = await News.findById( req.params.id);
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:userId",async (req, res) => {
  try {
    const news = await News.find( {userId: req.params.userId});
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/",async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/",async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let news;

    if (qNew) {
       news = await  News.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
        news = await News.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
        news = await News.find();
    }

    res.status(200).json(news);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;