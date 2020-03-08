const manifestFile = require("../../../../public/manifest.webmanifest") //check file by file name option

const manifest = ($) => {
    if(manifestFile) {
    const manifest = `<link rel="manifest" href="/${manifestFile}.json">`
        $('head').append(manifest)       
    } 
    return $
}

module.exports = manifest