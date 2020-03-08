const path = require("path"),
  slash = require("slash"),
  chalk = require("chalk"),
  fs = require("fs-extra"),
  globby = require("globby"),
  cheerio = require("cheerio"),
  CleanCSS = require("clean-css"),
  log = console.log,
  getCssFileGlobal = require("./helpers/getCssFileGlobal"),
  html2amp = require("./helpers/html2amp"),
  customCSS = require("./helpers/customCSS"),
  compressCSS = require("./helpers/compressCSS")

exports.onPostBuild = (_, pluginOptions) => {
  const defaultOptions = {
    htmlFiles: ["**/*.html"],
    cssFiles: ["**/*.css"],
    publicDir: "public",
    ampDir: "public/amp",
    stylesDir: "src/pages/amp/styles",
    distr: "./",
    gaConfigPath: null,
    serviceWorker: null,
    components: null,
    fonts: null,
  }

  const {
    distr,
    htmlFiles,
    cssFiles,
    publicDir,
    ampDir,
    stylesDir,
    gaConfigPath,
    serviceWorker,
    components,
    fonts,
  } = {
    ...defaultOptions,
    ...pluginOptions,
  }
  const config = {
    gaConfigPath,
    serviceWorker,
    cwd: slash(path.join(process.cwd(), publicDir)),
    components,
    fonts,
  }

  //rootPath
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

  ///////////////////////////////
  //transform html page to amp//
  /////////////////////////////
  const promisesHTML = arrHTML.map(async html => {
    const bufferHTML = fs.readFileSync(html)
    const mergeCSS = globalCSS + customCSS(arrCSS, globalCSS, html)
    const bufferCss = compressCSS(mergeCSS)
    const amp = await html2amp(bufferHTML.toString(), config, bufferCss)
    if (distr) {
      const basePath = slash(path.join(process.cwd())) //has root path
      const outPut = slash(path.join(process.cwd(), distr))
      const newFilePath = html.replace(basePath, outPut)
      fs.outputFileSync(newFilePath, amp)
    } else {
      fs.writeFileSync(html, amp)
    }
  })
  return Promise.all(promisesHTML)
}

log(chalk.white.bgGreen.bold("***plugin amp4html loaded***"))
