import App from './App.vue';
import { createApp } from 'vue';
import { router } from '/@/router';
import '/@/assets/style/index.less';

// Ant Design
import AntD from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

// 状态管理
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPersist);
app.use(AntD);
app.use(pinia);
app.use(router);

app.mount('#app');
