const css = ($, style) => {
  if (style) {
    const customStyle = `<style amp-custom>${style}</style>`
    $("head").append(customStyle)
  }
  return $

}

module.exports = css
