const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://64.227.185.193:3009',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
}; 