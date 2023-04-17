For proper use, add this setting to `vite.config.ts`

```js
// vite.config.ts
  server: {
    proxy: {
      '/api': {
        target: 'https://usnc.dev-webdevep.ru/auth-back/api/v2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
```
