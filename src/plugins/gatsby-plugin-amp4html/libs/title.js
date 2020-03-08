const title = ($) => {
    const text = 'ArticleText' //find page title
    $("head").append("<title>")
    $("title").text(text)
    return $
}

module.exports = title