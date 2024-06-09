const mongoose = require('mongoose');
const { Schema } = mongoose;

const shipmentSchema = new Schema({
  origin: String,
  destination: String,
  status: String,
  estimatedDeliveryDate: Date,
  inventoryItems: [{ type: Schema.Types.ObjectId, ref: 'Inventory' }],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Shipment', shipmentSchema);
