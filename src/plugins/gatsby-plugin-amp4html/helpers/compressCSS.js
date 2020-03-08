const CleanCSS = require("clean-css")

const compressCSS = (inputCSS, options = {}) => {
  let output = new CleanCSS(options).minify(inputCSS)
  return output.styles
}

module.exports = compressCSS
