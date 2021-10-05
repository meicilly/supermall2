<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content">
    <home-swiper :banners="banners"></home-swiper>
    <home-recommand-view :recommends="recommends"/>
    <feature-view/>
    <tab-control class="tab-control"
    :titles="['流行','新款','精选']" @tabClick="tabClick"/>
    <goods-list :goods="showGoods"/>
    </scroll>
<!-- <ul>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
  <li>jdia</li>
</ul> -->
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import HomeSwiper from './childComps/HomeSwiper.vue'
import TabControl  from '@/components/content/tabControl/tabControl.vue'

import {getHomeMultidata,getHomeGoods} from '@/network/home.js'
import HomeRecommandView from './childComps/HomeRecommandView.vue'
import FeatureView from './childComps/FeatureView.vue'
import GoodsList from '../../components/content/goods/GoodsList.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
  export default  {
    components:{
      NavBar,
      HomeSwiper,
      HomeRecommandView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page: 0,list:[]},
          'sell': {page:0,list:[]}
        },
        currentType: 'pop'
      }
    },
    created(){
      //请求多个数据
      this.getHomeMultidata(),
      //请求的商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new'),
      this.getHomeGoods('sell')
    },
    methods:{
      getHomeMultidata(){
        getHomeMultidata().then(res =>{
        //console.log(res.data)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
         getHomeGoods(type,page).then(res => {
          //console.log(res)
         this.goods[type].list.push(...res.data.list)
         this.goods[type].page += 1
      })
      },
      tabClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    }
  }
</script>

<style scoped>
#home{
  padding-top: 44px;
  /* 视口高度 */
  height: 100vh;
  position: relative;
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
.tab-control{
  position: sticky;
  top:44px;
  background-color: #fff;
  z-index: 9;
}
.content{
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>
