require('dotenv').config();

const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://nadiaGincoff:RMjTz0pQLcZOqYsC@nasacluster.hzqyqgy.mongodb.net/?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
  console.log('MongoDB connection is ready!');
});

mongoose.connection.on('error', (error) => {
  console.error(error);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect
}