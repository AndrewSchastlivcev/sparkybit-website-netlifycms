const iframe = ($, options) => {  //check if amp-iframe add this script
  const ampIframe = `<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>`
  $("head").append(ampIframe)
  return $
}

module.exports = iframe
