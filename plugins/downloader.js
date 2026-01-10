/**
 * Generic downloader plugin (uses yt-dlp)
 * Commands:
 *  - downloader <url>
 *  - downloader meta <url>
 */
const { exec } = require('child_process')
const fs = require('fs')
const os = require('os')
const path = require('path')

module.exports = {
  command: 'downloader',
  run: async (sock, msg, args, ctx) => {
    try {
      if (!args || args.length === 0) return sock.sendMessage(ctx.from, { text: 'Usage: downloader <url> OR downloader meta <url>' })
      let mode = 'dl'
      let url = args[0]
      if (args[0] === 'meta') {
        mode = 'meta'
        url = args[1]
      }
      if (!url || !/^https?:\/\//.test(url)) return sock.sendMessage(ctx.from, { text: 'Please provide a valid URL.' })

      if (mode === 'meta') {
        const meta = await getMetadata(url)
        return sock.sendMessage(ctx.from, { text: JSON.stringify(meta, null, 2).slice(0, 4000) })
      }

      const tmp = path.join(os.tmpdir(), `dl_${Date.now()}`)
      await download(url, tmp)
      const stat = fs.statSync(tmp)
      const buffer = fs.readFileSync(tmp)
      await sock.sendMessage(ctx.from, { document: buffer, mimetype: 'application/octet-stream', fileName: path.basename(tmp) })
      fs.unlinkSync(tmp)
    } catch (err) {
      await sock.sendMessage(ctx.from, { text: `Error: ${err.message}` })
    }
  }
}

function getMetadata(url) {
  return new Promise((resolve, reject) => {
    exec(`yt-dlp -j "${url}"`, { maxBuffer: 1024 * 1024 * 10 }, (err, stdout) => {
      if (err) return reject(err)
      try { resolve(JSON.parse(stdout)) } catch (e) { reject(e) }
    })
  })
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const cmd = `yt-dlp -f best -o "${dest}" "${url}"`
    exec(cmd, { maxBuffer: 1024 * 1024 * 50 }, (err) => {
      if (err) return reject(err)
      if (!fs.existsSync(dest)) return reject(new Error('Download failed'))
      resolve(dest)
    })
  })
}
