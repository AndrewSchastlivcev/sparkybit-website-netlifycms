const cheerio = require("cheerio"),
clean = require("./clean"),
amp = require("../libs/amp"),
charset = require("../libs/charset"),
viewport = require("../libs/viewport"),
link = require("../libs/link"),
//manifest = require("../libs/manifest"),
fonts = require("../libs/google/fonts"),
awesome = require("../libs/awesome"),
title = require("../libs/title"),
boilerplate = require("../libs/boilerplate"),
iframe = require("../libs/iframe"),
script = require("../libs/script"),
css = require("../libs/css"),
sidebar = require("../libs/plugins/sidebar"),
lightbox = require("../libs/plugins/lightbox"),
form = require("../libs/plugins/form")

const html2amp = async (html, options = {}, style) => {
    let $ = cheerio.load(html)
    //head transform//
    $ = clean($)
    $ = amp($, options)
    $ = charset($, options)
    $ = viewport($, options)
    $ = link($)
    //$ = manifest($)
    $ = fonts($, options)
    $ = awesome($, options)
    $ = title($)
    $ = boilerplate($)
    $ = iframe($, options)
    $ = script($)
    $ = sidebar($)
    $ = lightbox($)
    $ = form($)
    $ = css($, style)   
    //$ = ga($, options)
    //$ = serviceworker($, options)
    //console.log(options)
    return $.html()
  }
  
  module.exports = html2amp
  