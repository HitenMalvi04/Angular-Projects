const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Sequence = require('./Sequance');


const orderSchema = new mongoose.Schema({
  Order_id: { type: Number, index: true, unique: true },
  User_id: Number,
  Cart_id: Number,
  Cart_products: [
    {
        Product_id: { type: Number, index: true },
        quantity: { type: Number, default: 1 },
    },
  ],
  Order_price: Number,
  Order_status: String,
});

// Middleware to increment Product_id before saving
orderSchema.pre('save', async function (next) {
  try {
    const order = this;
    const sequence = await Sequence.findOneAndUpdate(
      { _id: 'orderid' },
      { $inc: { order_sequence_value: 1 } },
      { new: true, upsert: true }
    );
    order.Order_id = sequence.order_sequence_value;
    next();
  } catch (error) {
    next(error);
  } 
});



const orderModel = mongoose.model('OrderApi', orderSchema);

router.use(express.json());


router.get('/orders',async (req, res) => {
    const ord = await orderModel.find();
        res.send(ord);
});
router.get('/orders/:id',async (req, res) => {
    const ord = await orderModel.find({User_id : req.params.id});
        res.send(ord);
});
router.post('/orders', async (req, res) => {
    try {
      const { User_id, Cart_id, Cart_products, Order_price } = req.body;
  
      // Create a new Cart instance
      const ord = new orderModel({
        User_id,
        Cart_id,
        Cart_products,
        Order_price,
        Order_status : "pending",
      });
      console.log("ORD::::",ord);
      // Save the cart to the database
      const savedOrd = await ord.save();
      console.log("SAVED_ORD:::::",savedOrd);
      res.status(201).json(savedOrd);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.patch('/orders/:Order_id', async (req, res) => {
  const status = req.body.Order_status;
  console.log("Order_id",req.params.Order_id);
  const ord = await orderModel.findOne({Order_id: req.params.Order_id});
  console.log("order BEFORE",ord);
  console.log("req.body::::",req.body);
  ord.Order_status = status;
  await ord.save();
  console.log("order AFTER",ord);
  res.send(ord);
});




module.exports = router;