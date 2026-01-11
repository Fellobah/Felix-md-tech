
const express = require('express');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (for creds.json)
app.use('/session', express.static(path.join(__dirname, 'session')));

// Generate QR Code for pairing
app.get('/pair', async (req, res) => {
    try {
        // Example session string (replace with your bot QR code string)
        const sessionString = "YOUR_BOT_SESSION_STRING_HERE";

        // Generate QR code as data URL
        const qrDataURL = await QRCode.toDataURL(sessionString);

        // Display in a simple HTML page
        res.send(`
            <html>
            <head>
                <title>Felix MD Bot - Pairing</title>
                <style>
                    body { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; font-family:sans-serif; background:#111; color:#fff; }
                    img { margin-top:20px; }
                    a { display:inline-block; margin-top:20px; padding:10px 20px; background:#25D366; color:#fff; text-decoration:none; border-radius:5px; font-weight:bold; }
                    a:hover { background:#128C7E; }
                </style>
            </head>
            <body>
                <h1>Scan QR to Connect Felix MD Bot</h1>
                <img src="${qrDataURL}" alt="WhatsApp QR Code" />
                <a href="/session/creds.json" download>Download Session (creds.json)</a>
            </body>
            </html>
        `);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error generating QR code.');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
