const fs = require('fs')
const path = require('path')

module.exports = {
  command: 'pair',
  run: async (sock, msg, args, ctx) => {
    try {
      const out = path.join(__dirname, '..', 'pairing.png')
      const session = path.join(__dirname, '..', 'session.json')
      const exists = fs.existsSync(out)
      const sess = fs.existsSync(session)
      const lines = []
      lines.push(`Pairing image: ${exists ? out : 'not found'}`)
      lines.push(`Session saved: ${sess ? 'yes' : 'no'}`)
      await sock.sendMessage(ctx.from, { text: lines.join('\n') })
    } catch (err) { await sock.sendMessage(ctx.from, { text: 'Error: ' + (err.message || String(err)) }) }
  }
}
