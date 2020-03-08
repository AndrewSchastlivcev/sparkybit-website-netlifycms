const script = ($) => {
    const ampScript = '<script async src="https://cdn.ampproject.org/v0.js"></script>'
    $("head").append(ampScript)
return $
}

module.exports = script