const charset = ($) => {
  const meta = '<meta charset="utf-8" />'
  $('head').append(meta)
  return $
}
module.exports = charset
