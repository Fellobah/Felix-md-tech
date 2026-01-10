const fs = require('fs')
const path = require('path')
const DB = path.join(__dirname, '..', 'session', 'reminders.json')

function load() {
  try { return JSON.parse(fs.readFileSync(DB, 'utf8')) } catch (e) { return [] }
}
function save(arr) { fs.writeFileSync(DB, JSON.stringify(arr, null, 2)) }

module.exports = {
  command: 'remind',
  run: async (sock, msg, args, ctx) => {
    try {
      if (!args || args.length === 0) return sock.sendMessage(ctx.from, { text: 'Usage: remind <in minutes> <message>' })
      const mins = Number(args[0])
      const text = args.slice(1).join(' ')
      if (isNaN(mins) || !text) return sock.sendMessage(ctx.from, { text: 'Invalid usage' })
      const items = load()
      const when = Date.now() + mins * 60000
      items.push({ id: Date.now(), when, text, chat: ctx.from })
      save(items)
      await sock.sendMessage(ctx.from, { text: `Reminder set in ${mins} minutes.` })
    } catch (err) { await sock.sendMessage(ctx.from, { text: 'Error: ' + err.message }) }
  }
}
