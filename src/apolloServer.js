const { ApolloServer } = require('apollo-server-express');

const inventoryTypeDefs = require('./schemas/inventorySchema');
const inventoryResolvers = require('./resolvers/inventoryResolver');
const shipmentTypeDefs = require('./schemas/shipmentSchema');
const shipmentResolvers = require('./resolvers/shipmentResolver');
const supplierTypeDefs = require('./schemas/supplierSchema');
const supplierResolvers = require('./resolvers/supplierResolver');
const userTypeDefs = require('./schemas/userSchema');
const userResolvers = require('./resolvers/userResolver');


const createAolloServer = async ()=>{
    const server = new ApolloServer({
        typeDefs: [inventoryTypeDefs, shipmentTypeDefs, supplierTypeDefs, userTypeDefs],
        resolvers: [inventoryResolvers, shipmentResolvers, supplierResolvers, userResolvers],
        context: ({ req }) => ({req}),
        formatError: (err) => {
          return {
            message: err.message,
            code: err.extensions.code,
            additional: err.extensions.additional,
            path: err.path,
          };
        },
      });
      await server.start()
      return server;
}

module.exports = createAolloServer;
