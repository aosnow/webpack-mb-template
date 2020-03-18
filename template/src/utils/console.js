// ------------------------------------------------------------------------------
// name: console
// author: mudas( mschool.tech )
// created: 2019/12/10 20:31
// ------------------------------------------------------------------------------

import Vue from 'vue';
import VConsole from 'vconsole';

const DEVELOP_ENV = process.env.VUE_APP_ENV === 'development';
const RELEASE_ENV = process.env.VUE_APP_ENV === 'release';

// 开发环境、正式环境默认不开启调试工具
if (!DEVELOP_ENV && !RELEASE_ENV) {
  window.vConsole = new VConsole();

  // window 错误
  window.addEventListener('error', (error) => {
    console.error(error);
  }, true);

  // VUE 错误
  Vue.config.errorHandler = (error, vm, info) => {
    console.error(error);
  };
}
