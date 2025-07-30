const mongoose = require('mongoose');

function connectDB(uri) {
    mongoose.connection.on(
        'error', err => console.error('Mongoose connection error:', err)
    );
    mongoose.connection.on(
        'disconnected',() => console.warn('Mongoose disconnected')
    );

    return mongoose.connect(uri, {
        useNewUrlParser:    true,
        useUnifiedTopology: true
    });
}

module.exports = { connectDB };
