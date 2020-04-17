<template>
  <div id="app">
    <keep-alive>
      <!--只要未显式设置成 fasle，则页面将被缓存（包含未设置 cache 值，即默认 true）-->
      <router-view v-if="$route.meta.cache!==false&&ready"></router-view>
    </keep-alive>
    <!--强制显式设置成 false，则不进行缓存-->
    <router-view v-if="$route.meta.cache===false&&ready"></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import * as Types from '@/store/types';
import { parsingUserAgentEnv, parsingURLParams, parsingAppletEnv } from '@mudas/env';

export default {
  data() {
    return {
      ready: false
    };
  },

  created() {
    this.parsingParams();
  },

  methods: {
    // 分析环境参数，并存入缓存和 store
    // 保障在其它页面刷新也能保留环境级的参数信息
    parsingParams() {
      // 分析和存储环境参数
      const envInfo = { query: { ...parsingURLParams() }, env: { ...parsingUserAgentEnv() } };

      // 首次缓存环境参数
      this.$store.commit(Types.ENV_INFO, envInfo);
      Vue.storage.cache(Types.ENV_INFO, envInfo);

      parsingAppletEnv()
      .then((applet) => {
        const newEnvData = { env: { ...applet } };

        // 增量写入小程序环境信息
        this.$store.commit(Types.ENV_INFO, newEnvData);
        Vue.storage.cache(Types.ENV_INFO, newEnvData);

        // 支付宝小程序环境，向小程序派发 ready 事件
        // 微信小程序环境不支持实时 PostMessage，只能通过 bindload 监听 webview 容器来由小程序端处理
        if (applet.alipayApplet) {
          window.my.postMessage({ type: 'ready' });
        }
      })
      .finally(() => {
        // 环境分析结束
        this.ready = true;
      });

    }
  }
};
</script>
