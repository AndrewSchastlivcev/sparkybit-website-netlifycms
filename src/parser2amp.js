const path = require("path")
const slash = require("slash")
const chalk = require("chalk")
const fs = require("fs-extra")
const globby = require("globby")
const cheerio = require("cheerio")
const CleanCSS = require("clean-css")
const log = console.log
log(chalk.white.bgRed.bold("****node modules requied****"))

///////////////////UTILS/////////////////
const htmlPageName = html => {
  const indexPage = "amp" //will receive from papameter
  const htmlPathParse = path.parse(html).dir.split("/")
  let htmlName =
    htmlPathParse[htmlPathParse.length - 1] === indexPage //index page name doesn't match as css file (amp)
      ? "index"
      : htmlPathParse[htmlPathParse.length - 1]
  return htmlName
}
const cssFileName = css => {
  return path.basename(css, ".css")
}

const mergeCSStoHTML = (arrCSS, globalCSS, html) => {
  let resultStyle = `/*no custom style*/`
  arrCSS.forEach(css => {
    const bufferCSS = fs.readFileSync(css, "utf-8")
    if (htmlPageName(html) === cssFileName(css)) {
      resultStyle = bufferCSS
      log(chalk.white.bgBlue.bold("merge custom + global css to html"))
    } else {
      log(chalk.white.bgBlue.bold("no change"))
      return
    }
  })
  return resultStyle
}

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

const compressCSS = (inputCSS, options = {}) => {
  let output = new CleanCSS(options).minify(inputCSS)
  return output.styles
}
/////////////////UTILS END///////////////

const parser = () => {
  const pluginOptions = {
    htmlFiles: ["**/*.html"],
    cssFiles: ["**/*.css"],
    publicDir: "public",
    srcDir: "src",
    ampDir: "public/amp",
    stylesDir: "src/pages/amp/styles",
  }

  const defaultOptions = {
    htmlFiles: ["**/*.html"],
    cssFiles: ["**/*.css"],
    publicDir: "public",
    srcDir: "src",
    stylesDir: null,
    gaConfigPath: null,
    ampDir: null,
    serviceWorker: null,
  }

  const {
    htmlFiles,
    cssFiles,
    publicDir,
    gaConfigPath,
    stylesDir,
    ampDir,
    serviceWorker,
  } = {
    ...defaultOptions,
    ...pluginOptions,
  }

  const rootPath = process.cwd()

  //amp path
  const ampPath = htmlFiles.map(file =>
    slash(path.join(rootPath, ampDir, file))
  )
  //style path
  const stylePath = cssFiles.map(css =>
    slash(path.join(rootPath, stylesDir, css))
  )

  //collect amp html pages
  const arrHTML = globby.sync(ampPath)
  //collect amp css files
  const arrCSS = globby.sync(stylePath)
  const globalCSS = getCssFileGlobal(arrCSS)

  console.log("page count--", arrHTML.length)
  console.log("css count--", arrCSS.length)

  //const bufferCSS = fs.readFileSync(arrCSS[3], "utf-8")
  //console.log("bufer", bufferCSS)

  //console.log(htmlPageName(arrHTML[9]))
  //console.log(cssFileName(arrCSS[1]))

  /* const findCSStoHTML = () => {
	arrHTML.forEach(html => {
	arrCSS.forEach(css => {
	if (htmlPageName(html) === cssFileName(css)) {
	console.log("res", cssFileName(css))
	}
	})
	})
	}
	findCSStoHTML()
	 */

  ///////////////////
  //edit html page//
  /////////////////

  const promisesHTML = arrHTML.map(async html => {
    let result = null
    const distr = "./"
    const customFont = "Montserrat"
    const customFontWeight = [400, 600, 700, 800, 900]
    const bufferHTML = fs.readFileSync(html)
    const bufferCss = globalCSS + mergeCSStoHTML(arrCSS, globalCSS, html)
    const customCSS = compressCSS(bufferCss)
    const boiler =
      "<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>"
    const customStyle = `<style amp-custom>${customCSS}</style>`
    const ampScript =
      '<script async src="https://cdn.ampproject.org/v0.js"></script>'
    const ampIframe = `<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>`
    const sidebar = `<script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>`
    let $ = cheerio.load(bufferHTML.toString())
    try {
      //remove from page
      $("head").text("")
      $("noscript").remove()
      $("script").remove()

      //add to <head> page
      $("html").attr("amp", "")
      $("head").append('<meta charset="utf-8" />')
      $("head").append(
        '<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">'
      )
      $("head").append('<link rel="canonical" href="/article.html">')
      $("head").append(
        '<link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>'
      )
      $("head").append(
        `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=${customFont}:${customFontWeight}&display=swap">`
      )
      $("head").append(
        `<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>`
      )
      $("head").append("<title>")
      $("title").text("ArticleText")

      $("head").append(`${boiler}`)

      $("head").append(`${customStyle}`)

      $("head").append(`${ampIframe}`)
      //$("head").append(`${sidebar}`)
      $("head").append(`${ampScript}`)
      result = $.html()
      if (result) {
        const basePath = slash(path.join(process.cwd()))
        const outPut = slash(path.join(process.cwd(), distr))
        const newFilePath = html.replace(basePath, outPut)
        fs.outputFileSync(newFilePath, result)
      } else {
        fs.writeFileSync(html, result)
      }
    } catch (err) {
      throw new Error(err)
    } finally {
      log(chalk.white.bgGreen.bold("Parsing HTML complite "))
    }
  })
  return Promise.all(promisesHTML)
}
parser()

log(chalk.white.bgRed.bold("***END***"))
