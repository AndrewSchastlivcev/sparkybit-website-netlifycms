const path = require("path")

const cssFileName = css => {
  return path.basename(css, ".css")
}

module.exports = cssFileName
