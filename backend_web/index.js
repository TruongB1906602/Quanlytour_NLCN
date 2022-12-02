const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const searchRoute = require('./routes/search');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const hotelRoute = require('./routes/hotel');
const cartRoute = require('./routes/cart');
const payRoute = require('./routes/pay');
const adminRoute = require('./routes/admin');
const orderRoute = require('./routes/order');
const newsRoute = require('./routes/news');
const tourGuideRoute = require('./routes/tourguide');
const {
   verifyToken,
   verifyTokenAndAuthorization,
   CheckLogin,
   CheckRoleAdmin,
   checkRoleTourGuide,
   checkRoleCustomer,
} = require('./routes/verifyToken');
//const stripeRoute = require("./routes/stripe");
const cors = require('cors');

dotenv.config();

mongoose
   .connect('mongodb+srv://Ngoctruong29:712001@cluster0.bragn.mongodb.net/truongb1906602?retryWrites=true&w=majority')
   .then(() => console.log('DB Connection Successfull!'))
   .catch((err) => {
      console.log(err);
   });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/search', searchRoute);
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/hotels', hotelRoute);
app.use('/api/news', newsRoute);
app.use('/api/admins', verifyToken, CheckLogin, CheckRoleAdmin, adminRoute);
//Note
app.use('/api/tourguide', verifyToken, CheckLogin, checkRoleTourGuide, tourGuideRoute);
app.use('/api/customer', verifyToken, CheckLogin, checkRoleCustomer);
app.use('/api/pays', verifyToken, payRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);

app.listen(process.env.PORT || 8000, () => {
   console.log('Backend server is running!');
});
