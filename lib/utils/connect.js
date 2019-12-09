const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
        console.log('Now connected!!!');
    });

    mongoose.connection.on('error', () => {
        console.log('Unable to connect...');
    });
};

module.exports = connect;
