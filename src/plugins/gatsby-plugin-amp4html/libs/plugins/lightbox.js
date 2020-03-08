const lightbox = ($) => {
    const script = `<script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"></script>`
    $('head').append(script)
    return $
}

module.exports = lightbox