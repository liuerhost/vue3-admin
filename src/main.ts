import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '../src/router/index'
import 'element-plus/dist/index.css'
import '../src/assets/css/icon.css'
import { createPinia } from 'pinia'
/**
 * 完整引入 elementPlus 不推荐
 * import ElementPlus from 'element-plus'
 */

const pinia = createPinia();
const app = createApp(App);
app.use(router);

app.use(pinia);
app.mount('#app')
