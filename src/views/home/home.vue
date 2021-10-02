<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommand-view :recommends="recommends"/>
    <feature-view/>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import HomeSwiper from './childComps/HomeSwiper.vue'


import {getHomeMultidata} from '@/network/home.js'
import HomeRecommandView from './childComps/HomeRecommandView.vue'
import FeatureView from './childComps/FeatureView.vue'



  export default  {
    components:{
      NavBar,
      HomeSwiper,
      HomeRecommandView,
      FeatureView
    },
    data(){
      return{
        banners:[],
        recommends:[]
      }
    },
    created(){
      //请求多个数据
      getHomeMultidata().then(res =>{
        //console.log(res.data)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    }
  }
</script>

<style scoped>
#home{
  padding-top: 44px;
}
.home-nav{
  background-color: var(--color-tint);
  color: aliceblue;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9;
}
</style>
