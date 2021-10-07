<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content"
            ref="scroll"
            :probeType="3"
             @scroll="contenScroll"
             :pullUpLoad="true"
             @pullingUp="loadMore">
    <home-swiper :banners="banners" ></home-swiper>
    <home-recommand-view :recommends="recommends"/>
    <feature-view/>
    <tab-control class="tab-control"
    :titles="['流行','新款','精选']" @tabClick="tabClick"/>
    <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
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
import BackTop from '../../components/content/backTop/backTop.vue'
  export default  {
    components:{
      NavBar,
      HomeSwiper,
      HomeRecommandView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,

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
        currentType: 'pop',
        isShowBackTop: false
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
    mounted(){
      const refresh = this.debounce(this.$refs.scroll.refresh,200)
       //监听item中图片加载完成
      this.$bus.$on('itemImageLoad',()=>{
        //console.log('ad')
        //this.$refs.scroll.refresh()
        refresh()
      })
    },
    methods:{
      //防抖函数
      debounce(func,delay){
        let timer = null
        return function(...args){
          if(timer) clearTimeout(timer)
          timer = setTimeout(()=>{
            func.apply(this,args)
          },delay)
        }
      },
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
         //上拉加载完后还需要主动调用方法
         //this.$refs.scroll.scroll.finishPullUp()
         this.$refs.scroll.finishPullUp()

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
      },
      backClick(){
       this.$refs.scroll.scrollTo(0,0)
       //console.log(this.$refs.scroll.scroll)
       //this.$refs.scroll.scroll.startY === 0
      },
      //拿到滚动的数据
      contenScroll(position){
        //console.log(position)
        this.isShowBackTop = -position.y > 1000
      },
      //加载更多
      loadMore(){
        //console.log("上拉加载更多")
        this.getHomeGoods(this.currentType)
        //重新计算高度
        //this.$refs.scroll.scroll.refresh()
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
