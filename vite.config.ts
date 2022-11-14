import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'

import viteImagemin from 'vite-plugin-imagemin'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  //参数mode为开发模式或生产模式

  // env是拿到自己定义的 环境变量
  const env = loadEnv(mode, process.cwd()) // 获取.env文件里定义的环境变量

  console.log(env)

  return {
    // 相对路径，
    base: './',
    plugins: [
      vue(),
      viteCompression(),
      // 图片压缩
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false
        },
        optipng: {
          optimizationLevel: 7
        },
        mozjpeg: {
          quality: 20
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox'
            },
            {
              name: 'removeEmptyAttrs',
              active: false
            }
          ]
        }
      })
      //visualizer({
      //  open: true, //注意这里要设置为true，否则无效
      //  gzipSize: true,
      //  brotliSize: true
      //})
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      // 打包的压缩模式
      minify: 'terser',
      terserOptions: {
        // 去掉cosole
        compress: {
          // 生产环境移出console
          drop_console: true,
          drop_debugger: true
        }
      },

      // 打包文件名
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },

    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_APP_PORT) || 3200
      //proxy: {
      //  '/api': {
      //    target: env.VITE_APP_API_BASEURL,
      //    changeOrigin: true,
      //    rewrite: (path) => path.replace(/^\/api/, '')
      //  }
      //}
    }
  }
})
