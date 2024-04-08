const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Sequence = require('./Sequance');


// Define the user schema
const productSchema = new mongoose.Schema({
  Product_id: { type: Number, index: true, unique: true },
  Product_images: [ ],
  Product_name: String,
  Product_description: String,
  Product_features: [
    {
      feature_name: String,
      feature_value: String,
    }
  ],
  Product_price: Number,
  Product_stock: Number,
  Product_catagory: String
});

// Middleware to increment Product_id before saving
productSchema.pre('save', async function (next) {
  try {
    const product = this;
    const sequence = await Sequence.findOneAndUpdate(
      { _id: 'productid' },
      { $inc: { product_sequence_value: 1 } },
      { new: true, upsert: true }
    );
    product.Product_id = sequence.product_sequence_value;
    next();
  } catch (error) {
    next(error);
  }
});

const productmodel = mongoose.model('ProductApi', productSchema);
router.use(express.json());
router.get('/products/:Product_id',async (req, res) => {
  console.log("req.params.Product_id:::",req.params.Product_id);
  const product = await productmodel.findOne({Product_id: req.params.Product_id});
  console.log("product::::", product);
  res.send(product);
});
router.get('/products',async (req, res) => {
    const product = await productmodel.find();
        res.send(product);
});
router.post('/products', async (req, res) => {
  console.log("REQ.BODY::::",req.body);
    const { Product_name, Product_images, Product_description, Product_price, Product_features,Product_stock } = req.body;
    
    const product = new productmodel({
      Product_name,
      Product_description,
      Product_images,
      Product_price,
      Product_features,
      Product_stock
    });
    console.log("PRODUCT::::",product);
  
    // Save the product to the database
    const savedProduct = await product.save();
  
    res.send(savedProduct);
});
router.delete('/products/:Product_id', async (req, res) => {
  try {
    const productId = req.params.Product_id;
    
    // Find the product by its ID and delete it
    const deletedProduct = await productmodel.findOneAndDelete({ Product_id: productId });

    if (!deletedProduct) {
      return res.status(404).send({ message: 'Product not found' });
    }

    res.send({ message: 'Product deleted successfully', deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});


  module.exports = router;