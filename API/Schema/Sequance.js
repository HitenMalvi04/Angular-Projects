const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  user_sequence_value: { type: Number, default: 212262001 },
  cart_sequence_value: { type: Number, default: 212263001 },
  product_sequence_value: { type: Number, default: 212264001 },
  order_sequence_value: { type: Number, default: 212265001 },
});

const Sequence = mongoose.model('Sequence', sequenceSchema);

module.exports = Sequence;
