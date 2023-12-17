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
    const res = await fetch(
      location.pathname.split('/').slice(0, -1).join('/') +
        `/i18n/${language}.json`
    )

    translations = await res.json()
  } catch (error) {
    console.error('Error loading translation file:' + error)
  }
}
