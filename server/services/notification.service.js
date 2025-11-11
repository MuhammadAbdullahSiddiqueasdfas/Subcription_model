import dayjs from 'dayjs';

/**
 * Notification service for sending reminders
 * This is a placeholder implementation - integrate with your preferred service
 */

export const sendEmailReminder = async (subscription, daysUntilRenewal) => {
    try {
        const { user, renewalDate, plan } = subscription;
        
        console.log(`📧 Sending email reminder to ${user.email}`);
        console.log(`   Subscription: ${plan || 'Unknown Plan'}`);
        console.log(`   Renewal Date: ${dayjs(renewalDate).format('MMMM DD, YYYY')}`);
        console.log(`   Days Until Renewal: ${daysUntilRenewal}`);
        
        // TODO: Integrate with email service (SendGrid, AWS SES, etc.)
        // Example with SendGrid:
        // const msg = {
        //     to: user.email,
        //     from: 'noreply@yourapp.com',
        //     subject: `Subscription Renewal Reminder - ${daysUntilRenewal} days left`,
        //     html: generateEmailTemplate(subscription, daysUntilRenewal)
        // };
        // await sgMail.send(msg);
        
        return {
            success: true,
            method: 'email',
            recipient: user.email,
            sentAt: new Date()
        };
    } catch (error) {
        console.error('Error sending email reminder:', error);
        throw error;
    }
};

export const sendSMSReminder = async (subscription, daysUntilRenewal) => {
    try {
        const { user } = subscription;
        
        if (!user.phone) {
            console.log(`No phone number for user ${user.email}, skipping SMS`);
            return { success: false, reason: 'No phone number' };
        }
        
        console.log(`📱 Sending SMS reminder to ${user.phone}`);
        
        // TODO: Integrate with SMS service (Twilio, AWS SNS, etc.)
        // Example with Twilio:
        // await twilioClient.messages.create({
        //     body: `Reminder: Your subscription renews in ${daysUntilRenewal} days`,
        //     from: '+1234567890',
        //     to: user.phone
        // });
        
        return {
            success: true,
            method: 'sms',
            recipient: user.phone,
            sentAt: new Date()
        };
    } catch (error) {
        console.error('Error sending SMS reminder:', error);
        throw error;
    }
};

export const createInAppNotification = async (subscription, daysUntilRenewal) => {
    try {
        const { user, _id: subscriptionId } = subscription;
        
        console.log(`🔔 Creating in-app notification for user ${user._id}`);
        
        // TODO: Save to notifications collection in database
        // const notification = await Notification.create({
        //     userId: user._id,
        //     type: 'subscription_renewal',
        //     title: 'Subscription Renewal Reminder',
        //     message: `Your subscription will renew in ${daysUntilRenewal} days`,
        //     data: {
        //         subscriptionId,
        //         daysUntilRenewal,
        //         renewalDate: subscription.renewalDate
        //     },
        //     read: false,
        //     createdAt: new Date()
        // });
        
        return {
            success: true,
            method: 'in-app',
            recipient: user._id,
            sentAt: new Date()
        };
    } catch (error) {
        console.error('Error creating in-app notification:', error);
        throw error;
    }
};

const generateEmailTemplate = (subscription, daysUntilRenewal) => {
    const { user, renewalDate, plan, amount } = subscription;
    
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Subscription Renewal Reminder</h2>
            <p>Hi ${user.name || user.email},</p>
            <p>This is a friendly reminder that your subscription will renew soon.</p>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>Subscription Details:</h3>
                <p><strong>Plan:</strong> ${plan || 'Standard Plan'}</p>
                <p><strong>Amount:</strong> $${amount || '0.00'}</p>
                <p><strong>Renewal Date:</strong> ${dayjs(renewalDate).format('MMMM DD, YYYY')}</p>
                <p><strong>Days Until Renewal:</strong> ${daysUntilRenewal}</p>
            </div>
            
            <p>If you need to make any changes to your subscription, please log in to your account.</p>
            <p>Thank you for being a valued customer!</p>
        </div>
    `;
};