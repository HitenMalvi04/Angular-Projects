const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Sequence = require('./Sequance');

// Define the user schema
const userSchema = new mongoose.Schema({
  User_id: { type: Number, index: true, unique: true },
  User_name: String,
  User_password: String,
  Cart_id: { type: Number, index: true, unique: true },
});

// Middleware to increment User_id before saving
userSchema.pre('save', function (next) {
  const user = this;
  Sequence.findByIdAndUpdate(
    { _id: 'userId' },
    { $inc: { user_sequence_value:1 , cart_sequence_value:1} },
    { new: true, upsert: true }
  )
    .then((sequence) => {
      user.User_id = sequence.user_sequence_value;
      user.Cart_id = sequence.cart_sequence_value;
      next();
    })
    .catch((error) => {
      next(error);
    });
});

const usermodel = mongoose.model('UsersApi', userSchema);

// module.exports = User;
router.use(express.json());

router.get('/users/:username/:password', async (req, res) => {
  const user = await usermodel.findOne({ User_name: req.params.username , User_password: req.params.password});
  res.send(user);
})

router.get('/users/:id', async (req, res) => {
  // const user = await UsersApi.findById(req.params.id);
  const user = await usermodel.findOne({User_id : req.params.id});
  res.send(user);
})
router.get('/users',async (req, res) => {
  const user = await usermodel.find();
      res.send(user);
});
router.post('/users',async (req, res) => {
  console.log("REQ.BODY::::::",req.body);
  const user = new usermodel({
      User_name:req.body.username,
      User_password:req.body.password
  });
  await user.save();
  res.send(user);
});

module.exports = router;