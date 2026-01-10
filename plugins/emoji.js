const EMOJIS = ['😀','😂','🤣','😊','😍','🤔','😎','🙌','🔥','✨']

module.exports = {
  command: 'emoji',
  run: async (sock, msg, args, ctx) => {
    try {
      if (!args || args.length === 0) return sock.sendMessage(ctx.from, { text: EMOJIS.join(' ') })
      const i = Math.floor(Math.random() * EMOJIS.length)
      await sock.sendMessage(ctx.from, { text: EMOJIS[i] })
    } catch (err) { await sock.sendMessage(ctx.from, { text: 'Error: ' + err.message }) }
  }
}
