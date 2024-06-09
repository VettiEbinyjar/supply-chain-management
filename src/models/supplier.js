const mongoose = require('mongoose');
const { Schema } = mongoose;

const supplierSchema = new Schema({
  supplierName: String,
  contactPerson: String,
  phoneNumber: String,
  emailAddress: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Supplier', supplierSchema);
