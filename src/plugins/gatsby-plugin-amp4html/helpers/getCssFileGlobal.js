const fs = require("fs-extra"),
  cssFileName = require("./cssFileName")

const getCssFileGlobal = arrCSS => {
  let resultGlobalStyle = ""
  arrCSS.forEach(css => {
    const bufferCSS = fs.readFileSync(css, "utf-8")
    if (cssFileName(css) === "global") {
      resultGlobalStyle = bufferCSS
    }
  })
  return resultGlobalStyle
}

module.exports = getCssFileGlobal
