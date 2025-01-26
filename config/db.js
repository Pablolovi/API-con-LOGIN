require('dotenv').config();

const { Db } = require('mongodb');
const mongoose = require('mongoose');
const dbURI = process.env.MONGODB_URI;

module.exports.connect = () => {
    mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Base de datos conectada'))
    .catch(err => console.log(err));
};