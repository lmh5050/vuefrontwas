import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // router를 import

createApp(App).use(router)
  .use(router)   // Vue 애플리케이션에 router를 추가
  .mount('#app');  // #app 요소에 마운트
