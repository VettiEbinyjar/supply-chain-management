const { ApolloError } = require('apollo-server-express');
const mongoose = require('mongoose');
const Supplier = require('../models/Supplier');
const {authenticate} = require('../middleware/auth')

const resolvers = {
  Query: {
    getSuppliers: async (_, {} ,{req}) => {
      const loggedUser = authenticate(req);
      const userId = new mongoose.Types.ObjectId(loggedUser.id)
      const suppliers = await Supplier.find({'user': userId});
      if(Array.isArray(suppliers) && suppliers.length === 0) throw new ApolloError('Data not Found',"404");
      return suppliers;
    },
    getSupplierById: async (_, { id }, {req}) => {
      const loggedUser = authenticate(req);
      const userId = new mongoose.Types.ObjectId(loggedUser.id)
      const supplierId = new mongoose.Types.ObjectId(id)
      const supplier = await Supplier.findOne({_id : supplierId,'user': userId});
      if(!supplier) throw new ApolloError('Data not Found',"404");
      return supplier;
    },
  },
  Mutation: {
    addSupplier: async (_, { supplierName, contactPerson, phoneNumber, emailAddress }, {req}) => {
      const loggedUser = authenticate(req);
      const userId = new mongoose.Types.ObjectId(loggedUser.id)
      const supplier = await Supplier.create({ supplierName, contactPerson, phoneNumber, emailAddress, user: userId });
      return supplier;
    },
    updateSupplier: async (_, { id, supplierName, contactPerson, phoneNumber, emailAddress }, {req}) => {
      const loggedUser = authenticate(req);
      const userId = new mongoose.Types.ObjectId(loggedUser.id)
      const supplierId = new mongoose.Types.ObjectId(id)
      return Supplier.findOneAndUpdate({_id : supplierId, "user": userId }, { supplierName, contactPerson, phoneNumber, emailAddress, user : userId }, { upsert: true });
    },
    deleteSupplier: async (_, { id }, {req}) => {
      const loggedUser = authenticate(req);
      const userId = new mongoose.Types.ObjectId(loggedUser.id)
      const supplierId = new mongoose.Types.ObjectId(id)
      const supplier = await Supplier.deleteOne({_id : supplierId, "user": userId});
      return 'Supplier deleted successfully';
    },
  },
};

module.exports = resolvers;
