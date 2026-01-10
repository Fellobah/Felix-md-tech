module.exports = {
  command: 'search',
  run: async (sock, msg, args, ctx) => {
    try {
      if (!args || args.length === 0) return sock.sendMessage(ctx.from, { text: 'Usage: search <query>' })
      const q = args.join(' ')
      const url = 'https://duckduckgo.com/?q=' + encodeURIComponent(q)
      await sock.sendMessage(ctx.from, { text: 'Search URL: ' + url })
    } catch (err) { await sock.sendMessage(ctx.from, { text: 'Error: ' + err.message }) }
  }
}
