import { Router } from 'express';
import { createSubscription, getUserSubscription } from '../controllers/subscription.controller.js';
import authorize from '../middlewares/auth.middleware.js';
import Subscription from '../models/subscription.model.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', async (req, res) => { 
    try {
        // This is a simple test route - in production you'd want proper authentication
        const subscriptions = await Subscription.find().populate('user', 'name email').limit(10);
        res.json({ 
            success: true,
            message: 'Subscription API',
            count: subscriptions.length,
            subscriptions 
        }); 
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

subscriptionRouter.get('/:id', (req, res) => { 
    res.json({ message: `Get subscription details for ID: ${req.params.id}` }); 
});

// Temporary route without auth for testing
subscriptionRouter.post('/test', createSubscription);

// Original route with auth (for production)
subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => { 
    res.json({ message: `Update subscription ${req.params.id}` }); 
});

subscriptionRouter.delete('/:id', (req, res) => { 
    res.json({ message: `Delete subscription ${req.params.id}` }); 
});

subscriptionRouter.get('/user/:id', authorize, getUserSubscription);

subscriptionRouter.put('/:id/cancel', (req, res) => { 
    res.json({ message: `Cancel subscription ${req.params.id}` }); 
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => { 
    res.json({ message: 'Get upcoming renewals' }); 
});

export default subscriptionRouter;