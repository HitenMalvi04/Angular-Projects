

  const express = require('express');
  const router = express.Router();
  const mongoose = require('mongoose');
  const Sequence = require('./Sequance');


  // Define the user schema
  const AdminSchema = new mongoose.Schema({
    Admin_id: { type: Number, index: true, unique: true },
    Admin_name: String,
    Admin_password: String,
  });

  // Middleware to increment Admin_id before saving
  AdminSchema.pre('save', function (next) {
    const admin = this;
    Sequence.findByIdAndUpdate(
      { _id: 'adminid' },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    )
      .then((sequence) => {
        admin.Admin_id = sequence.sequence_value;
        next();
      })
      .catch((error) => {
        next(error);
      });
  });

  const adminmodel = mongoose.model('AdminApi', AdminSchema);
  router.use(express.json());
  router.get('/admin',async (req, res) => {
    const admin = await adminmodel.find();
        res.send(admin);
  });
  router.post('/admin',async (req, res) => {
    console.log(req.body);
    const admin = new adminmodel({
        Admin_name:req.body.username,
        Admin_password:req.body.password
    });
    await admin.save();
    res.send(admin);
  });

  module.exports = router;


  // const Admin = mongoose.model('AdminApi', AdminSchema);

  // module.exports = Admin;


