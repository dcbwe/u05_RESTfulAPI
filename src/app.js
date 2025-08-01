const express = require('express');
const corsMiddleware = require('./services/CORSConfigInstance');
const { errorHandler } = require('./utils/apiError');
const userRoutes = require('./routes/userRoutes');

function createApp() {
    const app = express();
    app.use(express.json());
    // app.use(corsMiddleware);
    app.use('/users', userRoutes);
    app.use(errorHandler);
    return app;
}

module.exports = createApp;
