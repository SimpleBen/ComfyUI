import { app } from '../../scripts/app.js'

const id = 'I18n'
const LANGUAGE_MAP = {
  zh: '简体中文',
  en: 'English',
}
const ext = {
  name: id,
  async setup(app) {
    const language = localStorage.getItem('ComfyUI.I18n') || 'zh'
    app.ui.settings.addSetting({
      id,
      name: _t('Language Setting'),
      defaultValue: 'zh',
      type: 'combo',
      options: ['zh', 'en'].map((m) => ({
        value: m,
        text: LANGUAGE_MAP[m],
        selected: m === language,
      })),
    })
  },
}

app.registerExtension(ext)
