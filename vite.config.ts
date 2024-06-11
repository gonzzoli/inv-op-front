import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@src", replacement: path.resolve(__dirname, "src") },
      { find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
      { find: "@componentes", replacement: path.resolve(__dirname, "src/componentes") },
      { find: "@paginas", replacement: path.resolve(__dirname, "src/paginas") },
      { find: "@servicios", replacement: path.resolve(__dirname, "src/servicios") },
      { find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
    ],
  }
})
