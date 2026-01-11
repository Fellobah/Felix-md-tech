import { delay } from "@whiskeysockets/baileys"

export default async function contactOwners(sock, msg) {
  const jid = msg.key.remoteJid

  // 1️⃣ Animated intro (GIF)
  await sock.sendMessage(jid, {
    video: { url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3ZzZ3Z2Y2Z4eG9kbXU2d2F2Z3VxY2R0dXh6cGx0b2k0bG9nMSZjdD1n/3o7aD2saalBwwftBIY/giphy.mp4" },
    gifPlayback: true,
    caption: "✨ *FELIX MD TECH* ✨\n\n📞 Connecting you to the owners..."
  })

  await delay(1500)

  // 2️⃣ Animated text style message
  await sock.sendMessage(jid, {
    text:
`╭━━━〔 🤖 FELIX MD TECH 〕━━━╮
┃ 👑 *BOT OWNERS*
┃━━━━━━━━━━━━━━━━━
┃ ⚜️ WARRIOR FELIX
┃ ⚜️ MCFELLO
╰━━━━━━━━━━━━━━━━━━╯

📌 Tap the contacts below to chat directly`
  })

  await delay(1000)

  // 3️⃣ Send contact cards (vCard)
  await sock.sendMessage(jid, {
    contacts: {
      displayName: "Felix MD Owners",
      contacts: [
        {
          vcard:
`BEGIN:VCARD
VERSION:3.0
FN:WARRIOR FELIX
ORG:Felix MD Tech;
TEL;type=CELL;type=VOICE;waid=254701881604:+254701881604
END:VCARD`
        },
        {
          vcard:
`BEGIN:VCARD
VERSION:3.0
FN:MCFELLO
ORG:Felix MD Tech;
TEL;type=CELL;type=VOICE;waid=254725391914:+254725391914
END:VCARD`
        }
      ]
    }
  })

  await delay(800)

  // 4️⃣ Final animated footer message
  await sock.sendMessage(jid, {
    text: "💬 *Feel free to contact us for support, setup, or custom bot development!*"
  })
}
