// ------------------------------------------------------------------------------
// name: initialize - 项目初始化项目环境
// author: mudas( mschool.tech )
// created: 2019/11/14 17:32
// ------------------------------------------------------------------------------

import Vue from 'vue';
import Handler from '@mudas/plugin-vue-handler';
import { parsingUserAgent } from '@mudas/env';
import Http from '@/http';
import Filter from '@/filter';

// ----------------------------------------
// Vue 全局参数设置
// ----------------------------------------
Vue.config.performance = true;
Vue.config.productionTip = process.env.NODE_ENV === 'development';

// ----------------------------------------
// 运行环境信息
// ----------------------------------------
Vue.env = Vue.prototype.$env = parsingUserAgent();

// ----------------------------------------
// 移动端用于调试的 vconsole 工具
// ----------------------------------------
if (!Vue.env.unknow && process.env.VUE_APP_ENV !== 'release') import('@/utils/console');

// ----------------------------------------
// Vue 全局过滤器（依赖 Vue.conf）
// ----------------------------------------
Vue.use(Filter);

// ----------------------------------------
// 初始化 http
// ----------------------------------------
Vue.use(Http);

// ----------------------------------------
// Vue 全局事件监听插件
// ----------------------------------------
Vue.use(Handler);
