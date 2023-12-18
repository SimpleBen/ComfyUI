let translations = {}
let translationCache = {}

function _t(key, args) {
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

function getLanguage() {
  return localStorage.getItem('Comfy.Settings.I18n').replaceAll(`"`, '') || 'zh'
}

async function loadTranslationFile(language) {
  if (!language) return
  try {
    const api_base = location.pathname.split('/').slice(0, -1).join('/')
    const res_i18n = await fetch(`${api_base}/i18n/${language}.json`)
    translations = await res_i18n.json()

    // Extensions I18n
    const res_ext = await fetch(`${api_base}/extensions/i18n`)
    const exts = await res_ext.json()

    for (const ext of exts) {
      if (!ext) continue
      if (!ext.includes(`${language}.json`)) continue

      const res_ext_i18n = await fetch(`${api_base}${ext}`)
      const ext_i18n = await res_ext_i18n.json()
      Object.assign(translations, ext_i18n)
    }
  } catch (error) {
    console.error('Error loading translation file:' + error)
  }
}
