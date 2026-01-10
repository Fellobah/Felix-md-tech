module.exports = {
  command: 'echo',
  run: async (sock, msg, args, ctx) => {
    try {
      const text = args && args.length ? args.join(' ') : 'Usage: echo <text>'
      await sock.sendMessage(ctx.from, { text })
    } catch (err) {
      await sock.sendMessage(ctx.from, { text: 'Error: ' + (err.message || String(err)) })
    }
  }
}
