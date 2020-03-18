import Vue from 'vue';
import EasyHttp from '@mudas/http';
import Storage from '@mudas/storage';
import StorageConfig from '@/config/storage.conf';
import { interceptors, transformRequest, transformResponse } from '@/interceptor';

// ----------------------------------------
// 基本环境配置
// ----------------------------------------
import './init';

// ----------------------------------------
// 本地数据和路由
// ----------------------------------------
import store from '@/store';
import router from '@/router';

// ----------------------------------------
// ui 样式
// ----------------------------------------
import '@mudas/reset.css';
import '@/css/main.scss';

// ----------------------------------------
// 启动入口组件
// ----------------------------------------
import App from './App.vue';


Promise.all([
  import(/* webpackChunkName: "config" */ '@/config'),
  import(/* webpackChunkName: "vant" */ '@/entry/vant')
]).then(modules => {

  // 项目配置信息
  Vue.conf = modules[0];

  // UI 框架
  // vant.js 已经处理好 vue.use()

  // 初始化 http
  const { http } = Vue.conf;
  http.forEach(config => {
    config.transformRequest = transformRequest;
    config.transformResponse = transformResponse;
  });
  Vue.use(EasyHttp, http);

  // 注册HTTP通信拦截器函数
  Object.keys(interceptors).forEach(key => {
    Vue.http[key].batchUseInterceptor(interceptors[key]);
  });

  // 初始化 storage
  const storage = new Storage.Store({ unique: process.env.VUE_APP_UNIQUE, config: StorageConfig });
  Vue.use(Storage);

  new Vue({
    store,
    router,
    storage,
    render: h => h(App)
  }).$mount('#app');
});
