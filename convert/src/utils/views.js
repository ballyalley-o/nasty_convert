const path = require('path')

const ROOT = 'src'

const VIEW = {
  page: 'index.html',
}

const bounceRoot = path.join(__dirname, '..')

const directPath = (root, path) => {
  return `file://${bounceRoot}/${path}`
}

const views = (path) => {
  return directPath(ROOT, path)
}

module.exports = { views, directPath, VIEW }
