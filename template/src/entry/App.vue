<template>
  <div id="app">
    <keep-alive>
      <!--只要未显式设置成 fasle，则页面将被缓存（包含未设置 cache 值，即默认 true）-->
      <router-view v-if="$route.meta.cache!==false"></router-view>
    </keep-alive>
    <!--强制显式设置成 false，则不进行缓存-->
    <router-view v-if="$route.meta.cache===false"></router-view>
  </div>
</template>
