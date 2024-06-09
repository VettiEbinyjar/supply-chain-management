const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String
  }

  type Query {
    me: User
  }

  type Mutation {
    register(username: String!, email: String!, password: String!, confirmPassword: String!): User
    login(email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
