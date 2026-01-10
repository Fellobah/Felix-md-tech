const os = require('os')

module.exports = {
  command: 'info',
  run: async (sock, msg, args, ctx) => {
    try {
      const lines = []
      lines.push(`Platform: ${process.platform} ${os.arch()}`)
      lines.push(`Node: ${process.version}`)
      lines.push(`Uptime: ${Math.floor(process.uptime())}s`)
      lines.push(`CPU cores: ${os.cpus().length}`)
      lines.push(`Memory: ${Math.round(os.totalmem() / 1024 / 1024)} MB total`)
      await sock.sendMessage(ctx.from, { text: lines.join('\n') })
    } catch (err) {
      await sock.sendMessage(ctx.from, { text: `Error: ${err.message}` })
    }
  }
}
