const mongoose = require('mongoose');
const { ApolloError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');
const User = require('../models/user');
const {authenticate} = require('../middleware/auth');
const {generateToken, verifyToken} = require('../helpers/jwtHandler');

const resolvers = {
  Query: {
    me: async (_, {}, {req}) => {
      try{
        const user = authenticate(req);
        const getOneUser = await User.findById(user.id);
        const token = generateToken(getOneUser);
        if(!getOneUser) throw new ApolloError('User not Found' , '404')
        return { ...getOneUser._doc, id : getOneUser._id, token  };
      } catch(error){
        throw new ApolloError(error)
      }
    },
  },
  Mutation: {
    register: async (_, { username, email, password, confirmPassword }) => {
      if(password !== confirmPassword) {
        throw new ApolloError('password and confirm password are not matching', '400');
      }
      const user = await User.findOne({email} , {email:1});
      if(user) {
        throw new ApolloError('User already exists', '400');
      }
      const salt = await bcrypt.genSalt(10);
      const HashedPassword = await bcrypt.hash(password, salt);
      const createUser = await User.create({ username, email, password: HashedPassword });
      const token = generateToken(createUser);
      return { ...createUser._doc, id : createUser._id, token };
    },
  login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new ApolloError('User not found');
      const isMatch = await user.comparePassword(password);
      if (!isMatch) throw new ApolloError('Invalid credentials', '400');

      const token = generateToken(user);
      return { ...user._doc, id: user._id, token };
    },
  },
};

module.exports = resolvers;
