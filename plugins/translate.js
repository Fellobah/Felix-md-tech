const https = require('https')

module.exports = {
  command: 'translate',
  run: async (sock, msg, args, ctx) => {
    try {
      if (!args || args.length < 2) return sock.sendMessage(ctx.from, { text: 'Usage: translate <to> <text>' })
      const to = args[0]
      const text = args.slice(1).join(' ')
      const payload = JSON.stringify({ q: text, source: 'auto', target: to, format: 'text' })
      const opts = {
        hostname: 'libretranslate.de',
        path: '/translate',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) }
      }
      const res = await new Promise((resolve, reject) => {
        const req = https.request(opts, r => {
          let data = ''
          r.on('data', c => data += c)
          r.on('end', () => resolve({ status: r.statusCode, body: data }))
        })
        req.on('error', reject)
        req.write(payload)
        req.end()
      })
      if (res.status !== 200) return sock.sendMessage(ctx.from, { text: 'Translate error: ' + res.status })
      const j = JSON.parse(res.body)
      await sock.sendMessage(ctx.from, { text: j.translatedText || 'No translation returned' })
    } catch (err) {
      await sock.sendMessage(ctx.from, { text: 'Error: ' + (err.message || String(err)) })
    }
  }
}
