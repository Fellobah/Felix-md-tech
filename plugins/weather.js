const https = require('https')

module.exports = {
  command: 'weather',
  run: async (sock, msg, args, ctx) => {
    try {
      const loc = args && args.length ? args.join(' ') : 'London'
      const url = `https://wttr.in/${encodeURIComponent(loc)}?format=3`
      https.get(url, res => {
        let data = ''
        res.on('data', c => data += c)
        res.on('end', async () => {
          await sock.sendMessage(ctx.from, { text: `Weather for ${loc}: ${data}` })
        })
      }).on('error', async () => {
        await sock.sendMessage(ctx.from, { text: 'Could not fetch weather.' })
      })
    } catch (err) {
      await sock.sendMessage(ctx.from, { text: 'Error: ' + err.message })
    }
  }
}
