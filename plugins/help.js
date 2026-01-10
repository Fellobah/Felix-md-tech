module.exports = {
  command: 'help',
  run: async (sock, msg, args, ctx) => {
    const lines = [
      'Available commands:',
      '- help: show this message',
      '- ping: basic latency check',
      '- info: platform and process info',
      '- ram: memory and load',
      '- uptime: process uptime',
      '- echo <text>: echo back text',
      "- tiktok <url>: download TikTok (yt-dlp)",
      "- tiktok meta <url>: metadata via yt-dlp",
      "- downloader <url>: generic downloader (yt-dlp)",
      '- qr <text>: get QR code link',
      '- translate <to> <text>: translate text (libretranslate)',
      '- sticker: convert image to sticker (placeholder)'
    ]
    await sock.sendMessage(ctx.from, { text: lines.join('\n') })
  }
}
