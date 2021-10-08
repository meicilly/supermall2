<template>
  <div id="app">
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
   <mian-tabbar/>
  </div>
</template>
<script>

import MianTabbar from './components/MainTabbar.vue'

export default {
  name: 'App',
  components: {
    MianTabbar
  }
}
</script>

<style>
  @import "assets/css/base.css";

</style>
