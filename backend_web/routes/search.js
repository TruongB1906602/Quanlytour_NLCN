const Product = require('../models/Product');

const router = require('express').Router();
router.post('/', async (req, res) => {
   const inputSearch = req.title;

   const result = await Product.find({ $text: { $search: inputSearch } });
   return res.json(result);
});

module.exports = router;
