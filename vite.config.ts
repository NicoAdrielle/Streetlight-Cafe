import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

const entry = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: { rollupOptions: { input: {
    home: entry('./index.html'),
    story: entry('./story/index.html'),
    menu: entry('./menu/index.html'),
    coffee: entry('./menu/coffee/index.html'),
    nonCoffee: entry('./menu/non-coffee/index.html'),
    tea: entry('./menu/tea-refreshers/index.html'),
    visit: entry('./visit/index.html'),
  } } },
})
