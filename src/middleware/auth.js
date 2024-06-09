const jwt = require('jsonwebtoken');
const { ApolloError } = require('apollo-server-express');

const authenticate = (req) => {
  const token = req.headers.authorization || '';

  if (!token) {
    throw new ApolloError('Authorization token is required', "401");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new ApolloError('Invalid or expired token', "401");
  }
};

module.exports = { authenticate };
