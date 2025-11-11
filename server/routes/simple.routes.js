import { Router } from 'express';
import { 
    createSimpleSubscription, 
    getSimpleSubscriptions, 
    testWorkflow 
} from '../controllers/simple-subscription.controller.js';

const simpleRouter = Router();

// Simple routes that work without database
simpleRouter.get('/', getSimpleSubscriptions);
simpleRouter.post('/', createSimpleSubscription);
simpleRouter.get('/test-workflow', testWorkflow);

export default simpleRouter;