import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// Svelte custom elements has problems with HMR https://nuclia.com/developers/how-to-run-svelte-custom-elements-in-dev-mode/
const fullReloadAlways = {
  name: 'full-reload-always-plugin',
  handleHotUpdate({ server }) {
    server.ws.send({ type: 'full-reload' })
    return []
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), fullReloadAlways]
})
