const path = require("path")

const htmlPageName = html => {
  const indexPage = "amp" //will receive from papameter
  const htmlPathParse = path.parse(html).dir.split("/")
  let htmlName =
    htmlPathParse[htmlPathParse.length - 1] === indexPage //index page name doesn't match as css file (amp)
      ? "index"
      : htmlPathParse[htmlPathParse.length - 1]
  return htmlName
}

module.exports = htmlPageName
