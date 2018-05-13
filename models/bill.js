const mongoose = require('mongoose')
require('mongoose-double')(mongoose);

const billSchema = new mongoose.Schema({
  sender: {
    firmName: { type: String, required: true },
    gstin: { type: String, required: true },
    email: { type: String, required: true},
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    website: String,
  },
  reciever: {
    firmName: { type: String, required: true },
    gstin: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    
  },
  invoice: {
    type: { type: String, required: true},
    date: { type: Date, default: Date.now}
  },
  items: [
    { 
      sr: { type: Number, required: true },
      description: { type: String, required: true },
      hsn: Number,
      quantity: { type: Number, required: true},
      unit: { type: String, required: true},
      ratePerItem: { type: mongoose.Schema.Types.Double, required: true},
      discount: { type: mongoose.Schema.Types.Double, required: true},
      taxableValue: { type: mongoose.Schema.Types.Double, required: true},
      cgstRate: mongoose.Schema.Types.Double,
      cgstAmount: mongoose.Schema.Types.Double,
      sgstRate: mongoose.Schema.Types.Double,
      sgstAmount: mongoose.Schema.Types.Double,
      igstRate: mongoose.Schema.Types.Double,
      igstAmount: mongoose.Schema.Types.Double,
      netAmount: { type: mongoose.Schema.Types.Double, required: true }
    }
  ],
  totalTaxableAmount: { type: mongoose.Schema.Types.Double, required: true},
  totalTax: { type: mongoose.Schema.Types.Double, required: true},
  invoiceTotal: { type: mongoose.Schema.Types.Double, required: true }
});

module.exports = mongoose.model("Bill", billSchema);