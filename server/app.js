import express from 'express'
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.router.js';
import subscriptionRouter from './routes/subscription.routes.js'
import simpleRouter from './routes/simple.routes.js';
import { PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import workflowRouter from './routes/workflow.routes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

// Simple API Routes (no database required)
app.use('/api/v1/simple', simpleRouter);

// API Routes (require database)
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscription', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);


app.use(errorMiddleware);

app.listen(PORT, async () => {
    console.log(`🚀 Subscription Tracker API is running on http://localhost:${PORT}`);
    console.log(`📱 Frontend available at: http://localhost:${PORT}`);
    console.log(`🔧 Simple API (no DB): http://localhost:${PORT}/api/v1/simple`);
    
    try {
        await connectToDatabase();
        console.log(`✅ Database connected successfully`);
    } catch (error) {
        console.log(`⚠️  Database connection failed - using simple mode`);
        console.log(`💡 Use /api/v1/simple endpoints for testing without database`);
    }
})

export default app;