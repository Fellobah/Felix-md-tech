import makeWASocket, { useSingleFileAuthState } from "@whiskeysockets/baileys";
import { writeFileSync } from "fs";
import qrcode from "qrcode-terminal";

const { state, saveState } = useSingleFileAuthState('./session/creds.json');

const sock = makeWASocket({
    auth: state
});

sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
        qrcode.generate(qr, { small: true });
        console.log("Scan this QR code with WhatsApp to log in.");
    }

    if (connection === 'close') {
        console.log('Connection closed:', lastDisconnect?.error?.output?.statusCode);
    }

    if (connection === 'open') {
        console.log('Bot connected successfully!');
    }
});

sock.ev.on('creds.update', saveState);
