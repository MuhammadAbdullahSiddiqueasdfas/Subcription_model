// Simple in-memory storage for testing (no database required)
let subscriptions = [];
let users = [
    {
        _id: '507f1f77bcf86cd799439011',
        name: 'Test User',
        email: 'test@example.com'
    }
];

export const createSimpleSubscription = async (req, res, next) => {
    try {
        const subscriptionData = {
            _id: Date.now().toString(),
            ...req.body,
            user: users[0]._id,
            startDate: req.body.startDate || new Date().toISOString(),
            status: 'active',
            createdAt: new Date().toISOString()
        };

        subscriptions.push(subscriptionData);

        console.log('✅ Subscription created:', subscriptionData.name);
        console.log('📧 Email reminders would be sent to:', users[0].email);

        res.status(201).json({
            success: true,
            subscription: subscriptionData,
            message: 'Subscription created successfully! (In-memory storage - no database required)'
        });
    } catch (error) {
        console.error('Error creating subscription:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getSimpleSubscriptions = async (req, res) => {
    try {
        res.json({
            success: true,
            message: 'Subscriptions retrieved (In-memory storage)',
            count: subscriptions.length,
            subscriptions: subscriptions.map(sub => ({
                ...sub,
                user: users[0] // Populate user data
            }))
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const testWorkflow = async (req, res) => {
    try {
        if (subscriptions.length === 0) {
            return res.json({
                success: false,
                message: 'No subscriptions found. Create a subscription first.'
            });
        }

        const subscription = subscriptions[subscriptions.length - 1]; // Get latest
        
        console.log('🔔 Testing workflow for subscription:', subscription.name);
        console.log('📧 Would send reminders to:', users[0].email);
        console.log('📅 Renewal date:', subscription.renewalDate);

        // Simulate sending reminders
        const reminderDays = [7, 5, 2, 1];
        const results = [];

        for (const days of reminderDays) {
            const result = {
                daysBeforeRenewal: days,
                emailSent: true,
                recipient: users[0].email,
                message: `Reminder: Your ${subscription.name} subscription renews in ${days} days`,
                timestamp: new Date().toISOString()
            };
            results.push(result);
            console.log(`📨 ${days}-day reminder simulated`);
        }

        res.json({
            success: true,
            message: 'Workflow test completed successfully!',
            subscription: {
                ...subscription,
                user: users[0]
            },
            reminderResults: results
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};