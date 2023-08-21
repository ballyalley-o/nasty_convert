const path = require('path')

const directPath = path.join(__dirname, '..')

const WINDOW = {
  MAIN: {
    height: 600,
    width: 800,
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: true,
    },
  },
}

console.log(WINDOW.MAIN.icon)

module.exports = WINDOW
