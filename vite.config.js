import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'node:path'

// Svelte custom elements has problems with HMR https://nuclia.com/developers/how-to-run-svelte-custom-elements-in-dev-mode/
const fullReloadAlways = {
  handleHotUpdate({ server }) {
    server.ws.send({ type: 'full-reload' })
    return []
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), fullReloadAlways],
  resolve: {
    alias: {
      '@': path.resolve('./src')
    }
  }
})
