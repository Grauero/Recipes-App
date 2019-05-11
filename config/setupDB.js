/* eslint-disable no-console */
const mongoose = require('mongoose');

const keys = require('../config/keys');

module.exports = () => {
  mongoose
    .connect(keys.mongoURI, { useNewUrlParser: true })
    .then(() => console.log('Connected to DB'))
    .catch(err => console.error(err));
};
