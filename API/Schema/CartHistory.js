const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const cartHSchema = new mongoose.Schema({
  Cart_id: { type: Number, index: true, unique: true },
  User_id: Number,
  Cart_products: [
    {
        Product_id: { type: Number, index: true },
        quantity: { type: Number, default: 1 },
    },
  ],
});

const cartmodel = mongoose.model('CartHistory', cartHSchema);

// module.exports = cart;
router.use(express.json());

router.get('/cart/:User_id',async (req, res) => {
  const cart = await cartmodel.findOne({User_id: req.params.User_id});
      res.send(cart);
});
router.get('/cart',async (req, res) => {
    const cart = await cartmodel.find();
        res.send(cart);
});

router.post('/cart', async (req, res) => {
  try {
    const { User_id, Cart_id, Cart_products } = req.body;

    // Create a new Cart instance
    const cart = new cartmodel({
      Cart_id,
      User_id,
      Cart_products,
    });

    // Save the cart to the database
    const savedCart = await cart.save();
    console.log("SAVEDCART:::::",savedCart);
    res.status(201).json(savedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;