const jwt = require('jsonwebtoken');
const { ApolloError } = require('apollo-server-express');

const authenticate = (req) => {
  const bearerToken = req.headers.authorization || '';
  if (!bearerToken) {
    throw new ApolloError('Authorization token is required', "401");
  }
  const parts = bearerToken.split(' ');
  const token = parts.length === 2 ? parts[1] : null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new ApolloError('Invalid or expired token', "401");
  }
};

module.exports = { authenticate };
