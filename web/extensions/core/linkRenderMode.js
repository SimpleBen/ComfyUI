import { app } from '../../scripts/app.js'

const id = 'Comfy.LinkRenderMode'
const LINK_MAP = {
  Straight: '直线',
  Linear: '线性',
  Spline: '曲线',
  Hidden: '隐藏',
}
const ext = {
  name: id,
  async setup(app) {
    app.ui.settings.addSetting({
      id,
      name: '连线渲染模式',
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
