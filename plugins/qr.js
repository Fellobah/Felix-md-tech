const encode = require('querystring').escape

module.exports = {
  command: 'qr',
  run: async (sock, msg, args, ctx) => {
    try {
      const text = args && args.length ? args.join(' ') : ''
      if (!text) return sock.sendMessage(ctx.from, { text: 'Usage: qr <text>' })
      const url = 'https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=' + encode(text)
      await sock.sendMessage(ctx.from, { text: 'QR code URL: ' + url })
    } catch (err) {
      await sock.sendMessage(ctx.from, { text: 'Error: ' + (err.message || String(err)) })
    }
  }
}
