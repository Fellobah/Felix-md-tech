module.exports = {
  command: 'calc',
  run: async (sock, msg, args, ctx) => {
    try {
      const expr = args && args.length ? args.join(' ') : ''
      if (!expr) return sock.sendMessage(ctx.from, { text: 'Usage: calc <expression>' })
      const safe = expr.replace(/[^0-9+\-*/(). %]/g, '')
      if (safe.length === 0) return sock.sendMessage(ctx.from, { text: 'Invalid expression' })
      let result
      try { result = eval(safe) } catch (e) { return sock.sendMessage(ctx.from, { text: 'Eval error' }) }
      await sock.sendMessage(ctx.from, { text: String(result) })
    } catch (err) {
      await sock.sendMessage(ctx.from, { text: 'Error: ' + err.message })
    }
  }
}
