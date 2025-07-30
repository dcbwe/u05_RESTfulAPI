const createApp = require('./app');
const { connectDB } = require('./config/database');

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

async function start() {
    try {
        await connectDB(MONGO_URI);
        console.log('✅ MongoDB connected');

        const app = createApp();
        app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
    } catch (err) {
        console.error('🔥 Startup error:', err);
        process.exit(1);
    }
}

start();
