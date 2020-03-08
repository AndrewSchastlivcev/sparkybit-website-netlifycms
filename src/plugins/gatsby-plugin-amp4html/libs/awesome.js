const awesome = ($, options) => {
    const {fonts} = options
    if(fonts.awesomeIcons) {
    const icons = `<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>`
    $('head').append(icons)
}
return $
}

module.exports = awesome