<template>
  <div id="app">
    <router-view></router-view>
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
