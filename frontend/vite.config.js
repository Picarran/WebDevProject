import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // 打包后的输出目录
    assetsDir: "assets", // 静态资源的存放目录
  },
});
