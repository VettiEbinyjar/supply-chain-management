// src/schemas/inventorySchema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Inventory {
    id: ID!
    itemName: String!
    sku: String!
    quantity: Int!
    warehouseLocation: String!
    supplier: Supplier
  }

  type Query {
    getInventoryItems(page: Int, limit: Int): [Inventory]
    getInventory(id: String): Inventory
  }

  type Mutation {
    addInventoryItem(itemName: String!, sku: String!, quantity: Int!, warehouseLocation: String!, supplierId: ID!): Inventory
    updateInventoryItem(id: ID!, itemName: String, sku: String, quantity: Int, warehouseLocation: String, supplierId: ID): Inventory
    deleteInventoryItem(id: ID!): String
  }
`;

module.exports = typeDefs;
