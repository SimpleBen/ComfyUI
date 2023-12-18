const fs = require('fs')
const path = require('path')

const json = fs.readFileSync(path.resolve("../web/i18n/en.json"), "utf-8");
let translations = JSON.parse(json)
let translationCache = {}

export function _t(key, args) {
  const cacheKey = args ? key + JSON.stringify(args) : key
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey]
  }

  let str = translations[key] || key

  if (args) {
    Object.keys(args).forEach((argKey) => {
      const placeholder = `{${argKey}}`
      str = str.replace(new RegExp(placeholder, 'g'), args[argKey])
    })
  }

  translationCache[cacheKey] = str
  return str
}
