require('dotenv').config()

const DEFAULT_OWNER_NUMBER = '254725391914'

module.exports = {
  GOD_MODE: (process.env.GOD_MODE || 'false').toLowerCase() === 'true',
  OWNER: process.env.OWNER || DEFAULT_OWNER_NUMBER,
  CREATOR: process.env.CREATOR || DEFAULT_OWNER_NUMBER
}
