import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD } from './env.js';

export const accountEmail = 'a24998113@gmail.com';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'a24998113@gmail.com',
        pass: EMAIL_PASSWORD || 'your-app-password-here'
    }
});