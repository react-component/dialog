/*!
 * content-disposition
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 */

module.exports = contentDisposition

/**
 * Module dependencies.
 */

var basename = require('path').basename

/**
 * RegExp to match US-ASCII string
 */

var asciiStringRegExp = /^[\x00-\x7f]*$/

/**
 * RegExp to match non attr-char, *after* encodeURIComponent (i.e. not including "%")
 */

var encodeUriAttrCharRegExp = /[\x00-\x20"'\(\)*,\/:;<=>?@\[\\\]\{\}\x7f]/g

/**
 * RegExp to match percent encoding escape.
 */

var hexEscapeRegExp = /%[0-9A-F]{2}/i

/**
 * RegExp to match non-US-ASCII characters.
 */

var nonAsciiRegExp = /[^\x00-\x7f]/g

/**
 * RegExp to match chars that must be quoted-pair in RFC 2616
 */

var quoteRegExp = /([\\"])/g

/**
 * RegExp for various RFC 2616 grammar
 *
 * token      = 1*<any CHAR except CTLs or separators>
 * separators = "(" | ")" | "<" | ">" | "@"
 *            | "," | ";" | ":" | "\" | <">
 *            | "/" | "[" | "]" | "?" | "="
 *            | "{" | "}" | SP | HT
 * CHAR       = <any US-ASCII character (octets 0 - 127)>
 * TEXT       = <any OCTET except CTLs, but including LWS>
 * SP         = <US-ASCII SP, space (32)>
 * HT         = <US-ASCII HT, horizontal-tab (9)>
 * CTL        = <any US-ASCII control character (octets 0 - 31) and DEL (127)>
 */

var textRegExp = /^[\u0020-\u007e\u0080-\u00ff]+$/
var tokenRegExp = /^[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+$/

/**
 * Create an attachment Content-Disposition header.
 *
 * @param {string} [filename]
 * @param {object} [options]
 * @param {string} [options.type=attachment]
 * @param {string|boolean} [options.fallback=true]
 * @return {string}
 * @api public
 */

function contentDisposition(filename, options) {
  var opts = options || {}

  // get type
  var type = opts.type || 'attachment'

  if (typeof type !== 'string') {
    throw new TypeError('option type must be a string')
  }

  if (!tokenRegExp.test(type)) {
    throw new TypeError('option type must be a valid token')
  }

  // normalize type
  type = type.toLowerCase()

  if (filename === undefined) {
    return type
  }

  if (typeof filename !== 'string') {
    throw new TypeError('argument filename must be a string')
  }

  // get fallback
  var fallback = opts.fallback !== undefined
    ? opts.fallback
    : true

  if (typeof fallback !== 'string' && typeof fallback !== 'boolean') {
    throw new TypeError('option fallback must be a string or boolean')
  }

  if (typeof fallback === 'string' && nonAsciiRegExp.test(fallback)) {
    throw new TypeError('option fallback must be US-ASCII string')
  }

  // restrict to file base name
  var name = basename(filename)

  // generate fallback name
  var fallbackName = typeof fallback !== 'string'
    ? fallback && getascii(name)
    : basename(fallback)

  var isSimpleHeader = (typeof fallbackName !== 'string' || fallbackName === name)
    && asciiStringRegExp.test(name)
    && !hexEscapeRegExp.test(name)

  if (isSimpleHeader) {
    // simple header
    // file name is always quoted and not a token for RFC 2616 compatibility
    return type + '; filename=' + qstring(name)
  }

  return type
    + (fallbackName !== false ? '; filename=' + qstring(fallbackName) : '')
    + '; filename*=' + ustring(name)
}

/**
 * Get US-ASCII version of string.
 *
 * @param {string} val
 * @return {string}
 * @api private
 */

function getascii(val) {
  // simple Unicode -> US-ASCII transformation
  return String(val).replace(nonAsciiRegExp, '?')
}

/**
 * Percent encode a single character.
 *
 * @param {string} char
 * @return {string}
 * @api private
 */

function pencode(char) {
  var hex = String(char)
    .charCodeAt(0)
    .toString(16)
    .toUpperCase()
  return hex.length === 1
    ? '%0' + hex
    : '%' + hex
}

/**
 * Quote a string for HTTP.
 *
 * @param {string} val
 * @return {string}
 * @api private
 */

function qstring(val) {
  var str = String(val)

  if (str.length > 0 && !textRegExp.test(str)) {
    throw new TypeError('invalid quoted string value')
  }

  return '"' + str.replace(quoteRegExp, '\\$1') + '"'
}

/**
 * Encode a Unicode string for HTTP (RFC 5987).
 *
 * @param {string} val
 * @return {string}
 * @api private
 */

function ustring(val) {
  var str = String(val)

  // percent encode as UTF-8
  var encoded = encodeURIComponent(str)
    .replace(encodeUriAttrCharRegExp, pencode)

  return 'UTF-8\'\'' + encoded
}
