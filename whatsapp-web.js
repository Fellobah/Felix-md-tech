const { Client, LocalAuth } = require('whatsapp-web.js');

// Use LocalAuth to store session automatically
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    console.log('Scan this QR:', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();
