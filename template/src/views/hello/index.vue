<!--------------------------------------------------
  name: index.vue
  author: 喵大斯( mschool.tech )
  created: 2019/8/26
---------------------------------------------------->

<template>
  <div class="homepage">
    <van-nav-bar title="测试示例" fixed placeholder left-arrow left-text="返回"/>

    <div class="homepage__body" v-show="active===0">
      <pre class="homepage__body-params">{{envParams}}</pre>
      <van-form @submit="submitHandler">
        <van-field v-model="formData.key" name="key" label="key" placeholder="请输入 url key"/>
        <van-field v-model="formData.value" name="value" label="value" placeholder="请输入 value"/>
        <van-cell>
          <van-button round block type="info">测试增量缓存URL参数</van-button>
          <van-button round block type="info" native-type="button" @click="clickHandler">showLoading</van-button>
        </van-cell>
      </van-form>
    </div>

    <div class="homepage__body" v-show="active===1">
      <pre class="homepage__body-params">{{userInfo}}</pre>

      <van-form @submit="requestHandler">
        <van-field v-model="formData.username" name="username" label="username" placeholder="请输入用户名"/>
        <van-field v-model="formData.password" name="password" label="password" placeholder="请输入密码"/>
        <van-cell>
          <van-button round block type="info" :loading="loading">测试接口请求</van-button>
        </van-cell>
      </van-form>
    </div>

    <van-tabbar v-model="active" @change="changeHandler">
      <van-tabbar-item icon="home-o">环境参数</van-tabbar-item>
      <van-tabbar-item icon="search">接口测试</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as Types from '@/store/types';

export default {
  name: 'index',

  data() {
    return {
      active: 0,
      loading: false,
      formData: {
        username: 'ghl_test',
        password: '123456'
      }
    };
  },

  computed: {
    ...mapGetters({
      envParams: Types.ENV_PARAMS,
      userInfo: Types.USER_LOGIN
    })
  },

  created() {
    const { path, query } = this.$route;
    this.active = query.a ? parseInt(query.a, 10) : this.active;
  },

  methods: {
    clickHandler() {
      const { wx } = window;
      uni.postMessage({ data: { type: 'ready' } });
    },

    changeHandler(index) {
      const { path, query } = this.$route;
      this.$router.replace({ path, query: { ...query, a: index } })
          .catch(reason => null);
    },

    submitHandler() {
      const { key, value } = this.formData;
      // if (key && value) this.$router.replace({ path: this.$route.path, query: { [key]: value } });
      if (key && value) this.$store.commit(Types.ENV_PARAMS, { query: { [key]: value } });
    },

    requestHandler() {
      this.loading = true;
      this.$store.dispatch(Types.USER_LOGIN, {
        username: this.formData.username,
        password: this.formData.password
      }).then(data => {
        console.warn(data);
      }).catch(reason => {
        this.$dialog({ title: '错误', message: reason.message, messageAlign: 'left' });
      }).finally(() => {
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="scss">
@import "~@/css/common/var";

.homepage {

  &__body {
    &-params {
      font-size: .1rem;
      padding: $--padding-base;
      overflow: auto;
      background-color: darken($--background-color-base, 3%);
    }
  }

  &__logo {
    // 按普通 px 单位处理 PC 端排版
    width: 200px;

    // 同样可以使用以 rem 为单位来启用通用于移动和PC的单位方案，1rem=100px
    height: 2rem;

    // 背景图片打包测试
    background-image: url("#{$--assets-path}/logo.png");
  }

}
</style>
