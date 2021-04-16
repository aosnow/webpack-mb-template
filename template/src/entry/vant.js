// ------------------------------------------------------------------------------
// name: ui
// author: mudas( mschool.tech )
// created: 2019.10.02 下午 16:47
// ------------------------------------------------------------------------------

import Vue from 'vue';
import { Lazyload, Toast, Notify, Dialog } from 'vant';

// show
Vue.use(Lazyload);

// feedback
Vue.toast = Toast;
Vue.prototype.$toast = Toast;
Vue.notify = Notify;
Vue.prototype.$notify = Notify;
Vue.dialog = Dialog;
Vue.prototype.$dialog = Dialog;

// 顶部提示信息公共配置
Notify.setDefaultOptions({ duration: 2500 });

const Components = [
  // layout
  'row', 'col',

  // base
  'icon',
  'button',
  'image',
  'cell', 'cell-group',
  'popup',

  // show
  'swipe', 'swipe-item',
  'list',
  'notice-bar',
  'sticky',
  'divider',
  'empty',
  'count-down',
  'panel',
  'step', 'steps',
  'collapse', 'collapse-item',

  // feedback
  'loading',
  'dropdown-menu', 'dropdown-item',

  // Nav
  'nav-bar',
  'grid', 'grid-item',
  'tab', 'tabs',
  'tabbar', 'tabbar-item',

  // form
  'form',
  'field',
  'rate',
  'search',
  'switch',
  'picker',
  'datetime-picker',
  'radio', 'radio-group',
  'checkbox', 'checkbox-group',
  'tag',
  'stepper',
  'slider'

];

function genComponentLoader(name, prefix = 'van') {
  return {
    name: prefix + '-' + name,
    main() {
      import('vant/es/' + name + '/style/less');
      return import('vant/es/' + name);
    }
  };
}

Components.forEach(item => {
  const component = genComponentLoader(item);
  Vue.component(component.name, component.main);
});
