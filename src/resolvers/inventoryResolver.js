const mongoose = require('mongoose');
const Inventory = require('../models/Inventory');
const {authenticate} = require('../middleware/auth');
const { ApolloError } = require('apollo-server-express');

module.exports = {
  Query: {
    getInventoryItems: async (_, { page = 1, limit = 10 }, {req}) => {
      const loggedUser = authenticate(req);
      const userId = new mongoose.Types.ObjectId(loggedUser.id)
      const data =  await Inventory.find({user: userId})
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('supplier');
      return data;
    },
    getInventory: async (_, { id }, {req}) => {
      const loggedUser = authenticate(req);
      const userId = new mongoose.Types.ObjectId(loggedUser.id)
      const inventoryId = new mongoose.Types.ObjectId(id)
      const inventory =  await Inventory.findOne({_id : inventoryId, user: userId}).populate('supplier');
      if(!inventory) throw new ApolloError('Data not Found',"404");
      return inventory;
    }
  },
  Mutation: {
    addInventoryItem: async (_, { itemName, sku, quantity, warehouseLocation, supplierId }, {req}) => {
      const loggedUser = authenticate(req);
      const userId = new mongoose.Types.ObjectId(loggedUser.id)
      const supplrId = new mongoose.Types.ObjectId(supplierId)
      const inventory = await Inventory.create({ itemName, sku, quantity, warehouseLocation, supplier: supplrId, user: userId });
      await inventory.populate('supplier');
      return inventory;
    },
    updateInventoryItem: async (_, { id, itemName, sku, quantity, warehouseLocation, supplierId }, { req }) => {
      const loggedUser = authenticate(req);
      const userId = new mongoose.Types.ObjectId(loggedUser.id);
      const inventoryId = new mongoose.Types.ObjectId(id);
      supplierId = new mongoose.Types.ObjectId(supplierId);
      const data = await Inventory.findOneAndUpdate(
        { _id: inventoryId },
        { itemName, sku, quantity, warehouseLocation, supplier: supplierId, user: userId },
        { new: true, upsert: true }
      );
      if (!data) throw new ApolloError('Data not Found', "404");
      return data;
    },
    deleteInventoryItem: async (_, { id }, {req}) => {
      const loggedUser = authenticate(req);
      await Inventory.findByIdAndDelete(id);
      return "Inventory Item Removed Successfully"
    }
  }
};
