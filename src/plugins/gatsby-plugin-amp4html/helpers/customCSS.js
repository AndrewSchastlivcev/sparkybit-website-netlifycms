const fs = require("fs-extra"),
  chalk = require("chalk"),
  htmlPageName = require("./htmlPageName"),
  cssFileName = require("./cssFileName"),
  log = console.log

const customCSS = (arrCSS, globalCSS, html) => {
  let resultStyle = `/*no custom style*/`
  arrCSS.forEach(css => {
    const bufferCSS = fs.readFileSync(css, "utf-8")
    if (htmlPageName(html) === cssFileName(css)) {
      resultStyle = bufferCSS
      log(chalk.white.bgBlue.bold("merge custom + global css to html"))
    } else {
      log(chalk.white.bgBlue.bold("global change"))
      return
    }
  })
  return resultStyle
}

module.exports = customCSS
