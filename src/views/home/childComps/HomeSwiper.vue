<template>
  <swiper>
        <swiper-item v-for="item in banners" :key="item.sort">
          <a :href="item.link">
            <img :src="item.image" alt="" srcset="" @load="imageLoad">
          </a>
        </swiper-item>
      </swiper>
</template>

<script>
// import Swiper from '@/components/common/swiper/Swiper.vue'
// import SwiperItem from '@/components/common/swiper/SwiperItem.vue'
import {Swiper,SwiperItem} from '@/components/common/swiper/index.js'
  export default {
    props:{
      banners:{
        type:Array,
        default(){
          return []
       } }
      },
      data(){
        return{
          isLoad: false
        }
      },
    components:{
      Swiper,
      SwiperItem
    },
    methods:{
      imageLoad(){
        if(!this.isLoad){
          this.$emit('imageLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
