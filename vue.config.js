const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,  // 이 설정은 그대로 두세요.

  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL || 'http://34.47.90.90:8081' || 'http://34.47.90.90:8080', // Spring Boot 서버 주소
        changeOrigin: true, // CORS 헤더 변경 허용
        pathRewrite: { '^/api': '' }, // '/api' 제거
        port: 80
      }
    }
  }
});
