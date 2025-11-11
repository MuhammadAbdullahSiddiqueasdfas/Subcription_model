import { createRequire } from 'module';
import dayjs from 'dayjs';
import Subscription from '../models/subscription.model.js';
import { sendReminderEmail } from '../utils/send-email.js';
const require = createRequire(import.meta.url)

const REMINDERS = [7, 5, 2, 1];

const { serve } = require('@upstash/workflow/express')

export const sendReminders = serve(async (context) => {
    try {
        const { subscriptionId } = context.requestPayload;

        if (!subscriptionId) {
            console.error('No subscriptionId provided in request payload');
            return;
        }

        const subscription = await fetchSubscription(context, subscriptionId);

        if (!subscription || subscription.status !== 'active') {
            console.log(`Subscription ${subscriptionId} is not active or not found. Stopping workflow.`);
            return;
        }

        const renewalDate = dayjs(subscription.renewalDate);

        if (renewalDate.isBefore(dayjs())) {
            console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
            return;
        }

        console.log(`Starting reminder workflow for subscription ${subscriptionId}, renewal date: ${renewalDate.format()}`);

        for (const daysBefore of REMINDERS) {
            const reminderDate = renewalDate.subtract(daysBefore, 'day');

            if (reminderDate.isAfter(dayjs())) {
                await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
            }



            // Re-fetch subscription to check if it's still active
            const currentSubscription = await fetchSubscription(context, subscriptionId);
            if (!currentSubscription || currentSubscription.status !== 'active') {
                console.log(`Subscription ${subscriptionId} is no longer active. Stopping workflow.`);
                return;
            }

            await triggerReminder(context, `Reminder ${daysBefore} days before`, currentSubscription);
        }
    } catch (error) {
        console.error('Error in sendReminders workflow:', error);
        throw error;
    }
});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email')
    })
}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date.format()}`);
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label, subscription) => {
    return await context.run(label, async () => {
        const daysUntilRenewal = parseInt(label.match(/\d+/)[0]);

        console.log(`Triggering ${label} reminder for subscription ${subscription._id}`);

        try {
            // Send email reminder
            const emailResult = await sendReminderEmail({
                to: subscription.user.email,
                type: `renewal_reminder_${daysUntilRenewal}`,
                subscription: subscription
            });

            console.log(`✅ Email reminder sent successfully for subscription ${subscription._id}`);

            return {
                success: true,
                reminderType: label,
                subscriptionId: subscription._id,
                userEmail: subscription.user.email,
                daysUntilRenewal,
                emailResult,
                sentAt: new Date()
            };
        } catch (error) {
            console.error(`❌ Error sending reminder for subscription ${subscription._id}:`, error);

            return {
                success: false,
                reminderType: label,
                subscriptionId: subscription._id,
                error: error.message,
                sentAt: new Date()
            };
        }
    });
}
