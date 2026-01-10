const fs = require('fs')
const path = require('path')
const DB = path.join(__dirname, '..', 'session', 'notes.json')

function load() { try { return JSON.parse(fs.readFileSync(DB, 'utf8')) } catch (e) { return {} } }
function save(o) { fs.writeFileSync(DB, JSON.stringify(o, null, 2)) }

module.exports = {
  command: 'note',
  run: async (sock, msg, args, ctx) => {
    try {
      if (!args || args.length === 0) return sock.sendMessage(ctx.from, { text: 'Usage: note set <key> <text> | note get <key>' })
      const cmd = args[0]
      const db = load()
      if (cmd === 'set' && args.length >= 3) {
        const key = args[1]
        const text = args.slice(2).join(' ')
        db[key] = text
        save(db)
        return sock.sendMessage(ctx.from, { text: `Saved note ${key}` })
      }
      if (cmd === 'get' && args.length === 2) {
        const key = args[1]
        return sock.sendMessage(ctx.from, { text: db[key] || 'No note found' })
      }
      await sock.sendMessage(ctx.from, { text: 'Invalid note command' })
    } catch (err) { await sock.sendMessage(ctx.from, { text: 'Error: ' + err.message }) }
  }
}
