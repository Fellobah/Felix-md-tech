import makeWASocket from '@adiwajshing/baileys';

const sock = makeWASocket();

sock.ev.on('connection.update', (update) => {
    const { connection, qr } = update;
    if (qr) {
        console.log('Scan this QR code:');
        console.log(qr); // You can also generate a QR image using qrcode npm package
    }
    if (connection === 'close') {
        console.log('Connection closed, restarting...');
    }
    if (connection === 'open') {
        console.log('Bot connected!');
    }
});
