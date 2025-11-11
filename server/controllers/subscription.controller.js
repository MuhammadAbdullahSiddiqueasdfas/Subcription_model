import { workflowClient } from '../config/upstash.js';
import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req, res, next) => {
    try {
      // For testing - create a dummy user if not authenticated
      let userId = req.user?._id;
      
      if (!userId) {
        // Create or find a test user
        const User = (await import('../models/user.model.js')).default;
        let testUser = await User.findOne({ email: 'test@example.com' });
        
        if (!testUser) {
          testUser = await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'hashedpassword123' // This should be hashed in real app
          });
        }
        userId = testUser._id;
      }

      // Add startDate if not provided
      const subscriptionData = {
        ...req.body,
        user: userId,
        startDate: req.body.startDate || new Date()
      };

      const subscription = await Subscription.create(subscriptionData);
  
      // Trigger workflow for subscription reminders (commented out for now)
      // await workflowClient.trigger({
      //   url: `${process.env.BASE_URL || 'http://localhost:3000'}/api/v1/workflows`,
      //   body: { subscriptionId: subscription._id.toString() }
      // });

      res.status(201).json({
        success: true,
        subscription,
        message: 'Subscription created successfully! Workflow will be triggered when configured.'
      });
    } catch (e) {
      console.error('Error creating subscription:', e);
      next(e);
    }
  };
  
  export const getUserSubscription = async (req, res, next) => {
    try {
        if (req.user.id != req.params.id) {
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }
        const subscriptions = await Subscription.find({ user: req.params.id });
        res.status(200).json({ success: true, subscriptions });

    } catch (error) {
        next(error);
    }
  }

 