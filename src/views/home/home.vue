<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control  ref="tabControl1"
    :titles="['流行','新款','精选']" @tabClick="tabClick" class="tab-control"
    v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probeType="3"
             @scroll="contenScroll"
             :pullUpLoad="true"
             @pullingUp="loadMore">
    <home-swiper :banners="banners" @imageLoad="imageLoad"></home-swiper>
    <home-recommand-view :recommends="recommends"/>
    <feature-view/>
    <tab-control  ref="tabControl2"
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

import {debounce} from '../../common/utils/utils'
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
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed:false,
        saveY:0
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
      //1.图片加载完成的事件监听
      const refresh = debounce(this.$refs.scroll.refresh,200)
       //监听item中图片加载完成
      this.$bus.$on('itemImageLoad',()=>{
        //console.log('ad')
        //this.$refs.scroll.refresh()
        refresh()
      })
       //2.获取tabControl的offsetTop
       //所有的组件都有$el
      //this.tabOffsetTop = this.$refs.tabControl
      //console.log(this.$refs.tabControl.$el.offsetTop)
    },
    methods:{
      //防抖函数

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
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick(){
       this.$refs.scroll.scrollTo(0,0)
       //console.log(this.$refs.scroll.scroll)
       //this.$refs.scroll.scroll.startY === 0
      },
      //拿到滚动的数据
      contenScroll(position){
        //console.log(position)
        //1.判断BackTop是否显示
        this.isShowBackTop = -position.y > 1000
        //2.决定tabcontrol是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      //加载更多
      loadMore(){
        //console.log("上拉加载更多")
        this.getHomeGoods(this.currentType)
        //重新计算高度
        //this.$refs.scroll.scroll.refresh()
      },
      //计算图片加载完成后的高度
      imageLoad(){
       //console.log(this.$refs.tabControl.$el.offsetTop)
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }
      },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    activated(){
      //console.log("进入")
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated(){
      //console.log("离开")
      this.saveY = this.$refs.scroll.getScrollY()
      //console.log(this.saveY)
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
  /* position: sticky;
  top:44px;
  background-color: #fff;
  z-index: 9; */
  position: relative;
  z-index: 9;
  background-color: aliceblue;
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
