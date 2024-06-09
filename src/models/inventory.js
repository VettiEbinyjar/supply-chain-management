const mongoose = require('mongoose');
const { Schema } = mongoose;

const inventorySchema = new Schema({
  itemName: String,
  sku: String,
  quantity: Number,
  warehouseLocation: String,
  supplier: { type: Schema.Types.ObjectId, ref: 'Supplier' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Inventory', inventorySchema);
