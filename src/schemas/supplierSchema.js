const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Supplier {
    id: ID!
    supplierName: String!
    contactPerson: String!
    phoneNumber: String!
    emailAddress: String!
  }

  type Query {
    getSuppliers: [Supplier]
    getSupplierById(id: ID!): Supplier
  }

  type Mutation {
    addSupplier(supplierName: String!, contactPerson: String!, phoneNumber: String!, emailAddress: String!): Supplier
    updateSupplier(id: ID!, supplierName: String, contactPerson: String, phoneNumber: String, emailAddress: String): Supplier
    deleteSupplier(id: ID!): String
  }
`;

module.exports = typeDefs;
