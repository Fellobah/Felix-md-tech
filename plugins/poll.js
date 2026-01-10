const fs = require('fs')
const path = require('path')
const DB = path.join(__dirname, '..', 'session', 'polls.json')

function load() { try { return JSON.parse(fs.readFileSync(DB, 'utf8')) } catch (e) { return [] } }
function save(a) { fs.writeFileSync(DB, JSON.stringify(a, null, 2)) }

module.exports = {
  command: 'poll',
  run: async (sock, msg, args, ctx) => {
    try {
      if (!args || args.length < 2) return sock.sendMessage(ctx.from, { text: 'Usage: poll <question> | option1;option2;option3' })
      const raw = args.join(' ')
      const parts = raw.split('|').map(s => s.trim())
      if (parts.length < 2) return sock.sendMessage(ctx.from, { text: 'Provide question and options separated by |' })
      const [question, opts] = parts
      const options = opts.split(';').map(s => s.trim()).filter(Boolean)
      if (options.length < 2) return sock.sendMessage(ctx.from, { text: 'Need at least two options' })
      const polls = load()
      const id = Date.now()
      polls.push({ id, question, options, votes: [] })
      save(polls)
      await sock.sendMessage(ctx.from, { text: `Created poll ${id}: ${question}\nOptions: ${options.join(', ')}` })
    } catch (err) { await sock.sendMessage(ctx.from, { text: 'Error: ' + err.message }) }
  }
}
