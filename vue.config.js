const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');  // webpack을 import 해야 DefinePlugin을 사용할 수 있습니다.

module.exports = defineConfig({
  transpileDependencies: true,  // 이 설정은 그대로 두세요.

  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL || 'http://34.47.90.90:8081:8081' || 'http://34.47.90.90:8081:8080', // Spring Boot 서버 주소
        changeOrigin: true, // CORS 헤더 변경 허용
        pathRewrite: { '^/api': '' }, // '/api' 제거
        port: 3000,
      },
    },
  },

  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(true), // 기능 플래그 설정
      }),
    ],
  },
});
