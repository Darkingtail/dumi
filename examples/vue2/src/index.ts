import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import MyComponent from './MyComponent/index.vue'; // 确保这里引用的是 src 里的组件

Vue.use(ElementUI);
Vue.use(Antd);

export { MyComponent }; // 导出 MyComponent 供文档使用
export default {}; // 确保有一个默认导出，虽然通常不需要，但防止某些框架行为
