const mongoose = require('mongoose')
require('mongoose-double')(mongoose);
const Bill = require('./bill');

const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  phone: {type: String, required: true},
  gstin: {type: String, required: true, unique: true},
  firmName:  {type: String, required: true},
  address: {type: String, required: true},
  city: {type: String, required: true},
  state: {type: String, required: true},
  pincode: {type: String, required: true},
  country: {type: String, required: true, default: "INDIA"},
  website: String,
  bills:[
    {type: mongoose.Schema.Types.ObjectId, ref: "Bill" }
  ],
  joinDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model("User", userSchema);