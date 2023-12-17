import { app } from '../../scripts/app.js'

const id = 'Comfy.LinkRenderMode'
const LINK_MAP = {
  Straight: _t('Straight'),
  Linear: _t('Linear'),
  Spline: _t('Spline'),
  Hidden: _t('Hidden'),
}
const ext = {
  name: id,
  async setup(app) {
    app.ui.settings.addSetting({
      id,
      name: _t('Link Render Mode'),
      defaultValue: 2,
      type: 'combo',
      options: [...LiteGraph.LINK_RENDER_MODES, 'Hidden'].map((m, i) => ({
        value: i,
        text: LINK_MAP[m],
        selected: i == app.canvas.links_render_mode,
      })),
      onChange(value) {
        app.canvas.links_render_mode = +value
        app.graph.setDirtyCanvas(true)
      },
    })
  },
}

app.registerExtension(ext)
