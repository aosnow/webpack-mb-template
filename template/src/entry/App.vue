<template>
  <div id="app">
    <keep-alive>
      <!--只要显式设置成 true，则页面将被缓存-->
      <router-view v-if="$route.meta.cache&&ready"></router-view>
    </keep-alive>
    <!--默认不进行缓存-->
    <router-view v-if="!$route.meta.cache&&ready"></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import * as Types from '@/store/types';
import { parsingURLParams } from '@mudas/env';

export default {
  data() {
    return {
      ready: false
    };
  },

  created() {
    this.parseParams();
  },

  methods: {

    uniAppJSBridgeReady() {
      const { alipay, wechat } = this.$env;

      this.setParams({
        alipayApplet: window.miniProgram && alipay,
        wechatApplet: window.miniProgram && wechat
      });

      // 标记环境分析完成
      this.ready = true;

      // 向小程序派发 ready 事件（仅支付宝支持实时 message，微信无效）
      if (this.$env.alipayApplet) {
        // uni 的 message 规定都必须将消息体置于 data 属性中
        // 若未使用 uni-app 构建小程序，请直接使用 window.my.postMessage()
        uni.postMessage({ data: { type: 'ready' } });
      }
    },

    // 设置和存储环境参数
    setParams(params) {
      // 分析和存储环境参数
      const envParams = { query: { ...parsingURLParams() }, env: { ...this.$env, ...params } };

      // 设置环境数据
      this.$env.alipayApplet = envParams.env.alipayApplet;
      this.$env.wechatApplet = envParams.env.wechatApplet;

      // 缓存环境参数
      this.$store.commit(Types.ENV_PARAMS, envParams);
      Vue.storage.cache(Types.ENV_PARAMS, envParams);
    },

    // 分析环境参数，并存入缓存和 store
    // 保障在其它页面刷新也能保留环境级的参数信息
    parseParams() {
      const { miniProgram, UniAppJSBridge } = window;

      // uni-app 环境 ready 事件
      if (!miniProgram) {
        this.setParams({ alipayApplet: false, wechatApplet: false });

        // 标记环境分析完成
        this.ready = true;
      }
      // uni-app 环境 ready 事件
      else {
        if (UniAppJSBridge) {
          this.uniAppJSBridgeReady();
        }
        else {
          document.addEventListener('UniAppJSBridgeReady', this.uniAppJSBridgeReady);
        }
      }
    }
  }
};
</script>
