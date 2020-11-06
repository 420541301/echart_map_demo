<template>
  <div id="app">
    <div class="aaa">
      <router-link to="/echartmap">echartmap</router-link>|
      <router-link to="/baidumap">baidumap</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
.aaa {
  text-align: center;
}
</style>
