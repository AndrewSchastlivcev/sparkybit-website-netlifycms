const clean = ($) => {
    $("head").text("")
    $("noscript").remove()
    $("script").remove()
    return $
}

module.exports = clean
