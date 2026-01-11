import 'dotenv/config';  // loads environment variables from .env
import { createBot } from 'whatsapp-cloud-api';

// Get credentials from .env
const from = process.env.WHATSAPP_PHONE_NUMBER_ID;
const token = process.env.WHATSAPP_ACCESS_TOKEN;

// Create bot instance
const bot = createBot(from, token);

// Send a test message
async function sendTestMessage() {
    try {
        const response = await bot.sendText('RECIPIENT_PHONE_NUMBER', 'Hello! This is my WhatsApp bot 🚀');
        console.log('Message sent:', response);
    } catch (err) {
        console.error('Error sending message:', err);
    }
}

sendTestMessage();
