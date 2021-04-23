<!--------------------------------------------------
  name: index.vue
  author: 喵大斯( mschool.tech )
  created: 2019/8/26
---------------------------------------------------->

<template>
  <div class="homepage">
    <van-nav-bar fixed left-arrow left-text="返回" placeholder title="测试示例"/>

    <div v-show="active===0" class="homepage__body">
      <pre class="homepage__body-params">{{envParams}}</pre>
      <van-form @submit="submitHandler">
        <van-field v-model="formData.key" label="key" name="key" placeholder="请输入 url key"/>
        <van-field v-model="formData.value" label="value" name="value" placeholder="请输入 value"/>
        <van-cell>
          <van-button block round type="info">测试增量缓存URL参数</van-button>
        </van-cell>
      </van-form>
    </div>

    <div v-show="active===1" class="homepage__body">
      <pre class="homepage__body-params">{{userInfo}}</pre>

      <van-form @submit="requestHandler">
        <van-field v-model="formData.username" label="username" name="username" placeholder="请输入用户名"/>
        <van-field v-model="formData.password" label="password" name="password" placeholder="请输入密码"/>
        <van-cell>
          <van-button :loading="loading" block round type="info">测试接口请求</van-button>
        </van-cell>
      </van-form>
    </div>

    <div v-show="active===2" class="homepage__body">
      <van-form @submit="mapHandler">
        <van-field v-model="formData.longitude" label="longitude" name="longitude" placeholder="请输入经度"/>
        <van-field v-model="formData.latitude" label="latitude" name="latitude" placeholder="请输入纬度"/>
        <van-field v-model="formData.name" label="name" name="name" placeholder="请输入坐标名称，如“神奇公馆”"/>
        <van-field v-model="formData.address" label="address" name="address" placeholder="请输入坐标地址，如“xx路68号”"/>
        <van-cell>
          <van-button block round type="info">打开小程序地图导航</van-button>
        </van-cell>
      </van-form>
    </div>

    <div class="homepage__logo"></div>

    <van-tabbar v-model="active" placeholder @change="changeHandler">
      <van-tabbar-item icon="home-o">环境参数</van-tabbar-item>
      <van-tabbar-item icon="search">接口测试</van-tabbar-item>
      <van-tabbar-item icon="location-o">地图导航</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
import Query from 'query-string';
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
        password: '123456',

        address: '浙江省杭州市西湖区曙光路73号(近黄龙饭店)',
        latitude: 30.263213,
        longitude: 120.137018,
        name: '浙江图书馆'
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
      this.$router.replace({ path, query: { ...query, a: index } }).catch(reason => null);
    },

    submitHandler() {
      const { key, value } = this.formData;
      if (key && value) this.$store.commit(Types.ENV_PARAMS, { query: { [key]: value } });
    },

    mapHandler() {
      const { longitude, latitude, name, address } = this.formData;
      uni.navigateTo({ url: `/pages/map/index?${Query.stringify({ longitude, latitude, name, address })}` });
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
      overflow: auto;
      padding: $--padding-base;
      background-color: darken($--background-color-base, 3%);
    }
  }

  &__logo {
    width: 100px;

    // 按普通 px 单位处理 PC 端排版
    height: 1rem;

    // 同样可以使用以 rem 为单位来启用通用于移动和PC的单位方案，1rem=100px
    margin: 0 auto;

    // 背景图片打包测试
    background-image: url("#{$--assets-path}/logo.png");
    background-size: contain;
  }

}
</style>
