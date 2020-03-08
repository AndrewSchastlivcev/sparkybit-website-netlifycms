const fonts = ($, options) => {
    const {fonts} = options
    if (fonts.fontFamily && fonts.fontWeight) {
    const preconnect = '<link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>'
    const fontFamily = `<link href="https://fonts.googleapis.com/css?family=${fonts.fontFamily}:${fonts.fontWeight}" rel="stylesheet"></link>`
    $('head').append(preconnect)
    $('head').append(fontFamily)
    }
    return $
}

module.exports = fonts