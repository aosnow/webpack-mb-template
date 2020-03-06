<!--------------------------------------------------
  name: switch-group.vue
  author: 喵大斯( mschool.tech )
  created: 2019/6/26
---------------------------------------------------->

<template>
  <div class="switch-group">
    <h2>content:</h2>
    <van-switch v-model="value1">
    </van-switch>
    <van-switch v-model="value2" active-color="#13ce66" inactive-color="#ff4949">
    </van-switch>

    <div class="switch-group__slot">
      <h2>slot.default:</h2>
      <slot class="switch-group__slot--body"></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: 'switch-group',
  data() {
    return {
      value1: true,
      value2: true
    };
  }
};
</script>

<style lang="scss">
@import "~@/css/common/var";

.switch-group {

  .switch-group__slot {
    border: $--border-base;
    padding: $--padding-base;
    margin: $--margin-base;
  }
}
</style>
