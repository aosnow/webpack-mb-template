// ------------------------------------------------------------------------------
// name: index.d
// author: 喵大斯( mschool.tech )
// created: 2019/8/22
// ------------------------------------------------------------------------------

import Vue, { ComponentOptions } from 'vue';
import { EnvHolderType } from '@mudas/env';
import { ProjectConfig } from './config';

declare module 'vue/types/vue' {
  // Vue.xxx 静态成员
  interface VueConstructor {
    conf: ProjectConfig;
    env: EnvType;
  }

  // this.$xxx 实例成员
  interface Vue {
    $conf: ProjectConfig;
    $env: EnvType;
  }
}

declare interface EnvType extends EnvHolderType {
  alipayApplet?: boolean;
  wechatApplet?: boolean;
}

// 扩展 vue 构造参数
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    handler?: Handlers;
  }
}

declare function handlerType(options?: { type: string, detail: any }): void;

declare interface Handlers {
  [index: string]: typeof handlerType;
}
