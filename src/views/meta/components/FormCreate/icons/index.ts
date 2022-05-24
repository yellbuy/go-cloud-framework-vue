import type { App } from 'vue'
export default {
  install: (app:App) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const files = import.meta.globEager('./svg/*.svg')
    const keys=Object.values(files)
    const icons = keys.map((t, index) => ({src: t.default, id: index}))
    
    // const context = require.context('./svg', false, /\.svg$/)
    // context.keys().map(context)
  }
}
