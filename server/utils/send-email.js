import dayjs from 'dayjs';
import { transporter, accountEmail } from '../config/nodemailer.js';
import { emailTemplates } from './email-template.js';

export const sendReminderEmail = async ({
    to, type, subscription
}) => {
    if (!to || !type) {
        throw new Error('Missing required parameters');
    }
    
    const template = emailTemplates.find((t) => t.label === type);
    
    if (!template) throw new Error('Invalid email type');

    const mailInfo = {
        userName: subscription.user.name || 'Valued Customer',
        subscription: subscription.name || 'Your Subscription',
        renewalDate: dayjs(subscription.renewalDate).format('MMM D, YYYY'),
        planName: subscription.name || 'Standard Plan',
        price: `${subscription.currency || '$'} ${subscription.price || '0.00'} (${subscription.frequency || 'monthly'})`,
        paymentMethod: subscription.paymentMethod || 'Default Payment Method',
    };

    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);

    const mailOptions = {
        from: accountEmail,
        to: to,
        subject: subject,
        html: message,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.log('Error sending email:', error);
        throw error;
    }
};