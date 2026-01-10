const https = require('https')

module.exports = {
  command: 'shorturl',
  run: async (sock, msg, args, ctx) => {
    try {
      if (!args || !args[0]) return sock.sendMessage(ctx.from, { text: 'Usage: shorturl <url>' })
      const url = args[0]
      const api = 'http://tinyurl.com/api-create.php?url=' + encodeURIComponent(url)
      https.get(api, res => {
        let data = ''
        res.on('data', c => data += c)
        res.on('end', async () => { await sock.sendMessage(ctx.from, { text: 'Short URL: ' + data }) })
      }).on('error', async () => { await sock.sendMessage(ctx.from, { text: 'Could not shorten URL.' }) })
    } catch (err) { await sock.sendMessage(ctx.from, { text: 'Error: ' + err.message }) }
  }
}
