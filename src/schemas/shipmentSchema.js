const { gql } = require('apollo-server-express');

module.exports = gql`
  type Shipment {
    id: ID!
    origin: String!
    destination: String!
    status: String!
    estimatedDeliveryDate: String!
    inventoryItems: [Inventory]
  }

  type Query {
    getShipments(page: Int, limit: Int): [Shipment]
    getShipmentById(id: ID!): Shipment
  }

  type Mutation {
    addShipment(origin: String!, destination: String!, status: String!, estimatedDeliveryDate: String!, inventoryItemIds: [ID!]): Shipment
    updateShipment(id: ID!, status: String, estimatedDeliveryDate: String): Shipment
  }
`;
