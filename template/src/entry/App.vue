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
      const envInfo = { query: { ...parsingURLParams() } };

      // 首次缓存环境参数
      this.$store.commit(Types.ENV_INFO, envInfo);
      Vue.storage.cache(Types.ENV_INFO, envInfo);

      // uni-app 环境 ready 事件
      if (process.env.NODE_ENV === 'development') {
        Vue.env.wechatApplet = false;
        Vue.env.alipayApplet = false;

        // 标记环境分析完成
        this.ready = true;
      }
      else {
        document.addEventListener('UniAppJSBridgeReady', () => {
          const { alipay, wechat } = Vue.env;

          uni.getEnv((res) => {
            Vue.env.wechatApplet = res.miniprogram && wechat;
            Vue.env.alipayApplet = res.miniprogram && alipay;

            // 向小程序派发 ready 事件（仅支付宝支持实时 message，微信无效）
            if (Vue.env.alipayApplet) {
              // uni 的 message 规定都必须将消息体置于 data 属性中
              uni.postMessage({ data: { type: 'ready' } });
            }

            // 标记环境分析完成
            this.ready = true;
          });
        });
      }

    }
  }
};
</script>
