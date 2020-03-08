const sidebar = ($) => {
    const script = `<script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>`
    $('head').append(script)
    $('body').prepend($('amp-sidebar')) //inset amp-sidebar first body element as specification 
    return $
}

module.exports = sidebar