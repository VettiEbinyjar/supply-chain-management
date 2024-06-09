const mongoose = require('mongoose');
const Shipment = require('../models/shipment');
const Inventory = require('../models/Inventory');
const User = require('../models/user');
const { authenticate } = require('../middleware/auth');

module.exports = {
  Query: {
    getShipments: async (_, { page = 1, limit = 10 }, {req}) => {
      const loggedUser = authenticate(req);
      const userId = new mongoose.Types.ObjectId(loggedUser.id)
      const filterQuery = {user : userId};
      return await Shipment.find(filterQuery)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('inventoryItems')
    },
    getShipmentById: async (_, { id }, {req}) => {
      authenticate(req);
      const data =  await Shipment.findById(id).populate('inventoryItems');
      if(!data) throw new ApolloError('Data not Found',"404");
      return data;
    }
  },
  Mutation: {
    addShipment: async (_, { origin, destination, status, estimatedDeliveryDate, inventoryItemIds }, {req}) => {
      const loggedUser = authenticate(req);
      const userId = new mongoose.Types.ObjectId(loggedUser.id)
      const inventories = inventoryItemIds.map(item => new mongoose.Types.ObjectId(item))
      const shipment = await Shipment.create({ origin, destination, status, estimatedDeliveryDate, inventoryItems: inventories , user:  userId }).populate('inventoryItems');
      return shipment;
    },
    updateShipment: async (_, { id, status, estimatedDeliveryDate }, {req}) => {
      authenticate(req);
      const data =  await Shipment.findByIdAndUpdate(id, { status, estimatedDeliveryDate }, { new: true }).populate('inventoryItems');
      if(!data) throw new ApolloError('Data not Found',"404");
      return data;
    }
  }
};
