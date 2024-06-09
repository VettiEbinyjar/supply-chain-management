const mongoose = require('mongoose');
require('dotenv').config();

const logger = require('../helpers/logger')
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        logger.info('MongoDB Connected...');
    } catch (err) {
        logger.error('there is problem when connecting to database');
        logger.error(err.message);
    }
};

module.exports = connectDB;
