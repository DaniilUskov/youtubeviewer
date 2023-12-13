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
      target: 'http://127.0.0.1:5019',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  routes: [
    {
      path: '/',
      component: './index',
    },
    {
      path: '/live',
      component: './live',
    },
    {
      path: '/subscriptions',
      component: './subscriptions',
    },
    {
      path: '/watchlater',
      component: './watchlater',
    },
    {
      path: '/video/:id', 
      component: 'video/[id]' 
    },
    {
      path: '/search/:name', 
      component: 'search/[name]' 
    },
  ],
  npmClient: 'yarn',
});
