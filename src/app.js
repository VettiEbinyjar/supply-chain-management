// src/index.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
dotenv.config();

const connectDB =  require('./config/db')
const createAolloServer =  require('./apolloServer')

const createExpressApp = async () => {
  const app = express();
  app.use(express.json());
  app.use(morgan('combined'));
  app.use(helmet());
  await connectDB()
  const server = await createAolloServer();
  server.applyMiddleware({ app })
  return app;
};

module.exports = createExpressApp;
