module.exports = {
  command: 'random',
  run: async (sock, msg, args, ctx) => {
    try {
      if (!args || args.length === 0) {
        // random choice from provided quoted message or return 0-100
        const r = Math.floor(Math.random() * 101)
        return sock.sendMessage(ctx.from, { text: 'Random number: ' + r })
      }
      if (args.length === 1 && args[0].includes('-')) {
        const [a,b] = args[0].split('-').map(Number)
        const r = Math.floor(Math.random() * (b - a + 1)) + a
        return sock.sendMessage(ctx.from, { text: String(r) })
      }
      // pick one from list
      const pick = args[Math.floor(Math.random() * args.length)]
      await sock.sendMessage(ctx.from, { text: pick })
    } catch (err) { await sock.sendMessage(ctx.from, { text: 'Error: ' + err.message }) }
  }
}
