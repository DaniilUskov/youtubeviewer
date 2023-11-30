import { defineConfig } from '@umijs/max';

export default defineConfig({
  hash: true,
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  // layout: {
  //   title: '@umijs/max',
  // },
  proxy: {
    '/api/': {
      target: 'http://127.0.0.1:5219',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  routes: [
    {
      path: '/',
      component: './index',
    },
  ],
  npmClient: 'yarn',
});
