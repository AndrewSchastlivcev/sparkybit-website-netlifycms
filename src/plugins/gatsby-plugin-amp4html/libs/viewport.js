const viewport = ($) => {
  const viewport = '<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">'  
  $('head').append(viewport)
  return $
}

module.exports = viewport
