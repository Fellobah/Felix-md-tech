module.exports = {
  command: 'avatar',
  run: async (sock, msg, args, ctx) => {
    try {
      await sock.sendMessage(ctx.from, { text: 'Avatar fetch not implemented; please send profile or mention a user.' })
    } catch (err) { await sock.sendMessage(ctx.from, { text: 'Error: ' + err.message }) }
  }
}
