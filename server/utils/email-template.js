export const emailTemplates = [
    {
        label: 'renewal_reminder_7',
        generateSubject: (mailInfo) => `Subscription Renewal in 7 Days - ${mailInfo.planName}`,
        generateBody: (mailInfo) => `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #333;">🔔 Subscription Renewal Reminder</h2>
                <p>Hi ${mailInfo.userName},</p>
                <p>Your subscription <strong>${mailInfo.subscription}</strong> will renew in <strong>7 days</strong>.</p>
                <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
                    <p><strong>Plan:</strong> ${mailInfo.planName}</p>
                    <p><strong>Price:</strong> ${mailInfo.price}</p>
                    <p><strong>Renewal Date:</strong> ${mailInfo.renewalDate}</p>
                </div>
                <p>Thank you!</p>
            </div>
        `
    },
    {
        label: 'renewal_reminder_5',
        generateSubject: (mailInfo) => `Subscription Renewal in 5 Days - ${mailInfo.planName}`,
        generateBody: (mailInfo) => `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #ff9800;">⚠️ Subscription Renewal in 5 Days</h2>
                <p>Hi ${mailInfo.userName},</p>
                <p>Your subscription <strong>${mailInfo.subscription}</strong> will renew in <strong>5 days</strong>.</p>
                <div style="background: #fff3e0; padding: 15px; border-radius: 5px;">
                    <p><strong>Plan:</strong> ${mailInfo.planName}</p>
                    <p><strong>Price:</strong> ${mailInfo.price}</p>
                    <p><strong>Renewal Date:</strong> ${mailInfo.renewalDate}</p>
                </div>
            </div>
        `
    },
    {
        label: 'renewal_reminder_2',
        generateSubject: (mailInfo) => `Subscription Renewal in 2 Days - ${mailInfo.planName}`,
        generateBody: (mailInfo) => `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #f44336;">🚨 Subscription Renewal in 2 Days!</h2>
                <p>Hi ${mailInfo.userName},</p>
                <p><strong>Important:</strong> Your subscription will renew in just <strong>2 days</strong>!</p>
                <div style="background: #ffebee; padding: 15px; border-radius: 5px;">
                    <p><strong>Plan:</strong> ${mailInfo.planName}</p>
                    <p><strong>Price:</strong> ${mailInfo.price}</p>
                    <p><strong>Renewal Date:</strong> ${mailInfo.renewalDate}</p>
                </div>
            </div>
        `
    },
    {
        label: 'renewal_reminder_1',
        generateSubject: (mailInfo) => `Subscription Renewal Tomorrow - ${mailInfo.planName}`,
        generateBody: (mailInfo) => `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #d32f2f;">🔥 Subscription Renewal Tomorrow!</h2>
                <p>Hi ${mailInfo.userName},</p>
                <p><strong>Final Notice:</strong> Your subscription will renew <strong>tomorrow</strong>!</p>
                <div style="background: #ffcdd2; padding: 15px; border-radius: 5px;">
                    <p><strong>Plan:</strong> ${mailInfo.planName}</p>
                    <p><strong>Price:</strong> ${mailInfo.price}</p>
                    <p><strong>Renewal Date:</strong> ${mailInfo.renewalDate}</p>
                </div>
            </div>
        `
    }
];