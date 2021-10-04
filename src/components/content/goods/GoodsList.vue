<template>
  <div class="goods">
    <goods-lists-item v-for="(item,index) in goods" :key="index"
    :goodsItem="item"/>
  </div>
</template>

<script>
import GoodsListsItem from './GoodsListItem.vue'
  export default {
    components:{
      GoodsListsItem
    },
    props:{
      goods:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
.goods{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-around;
  padding: 2px;
}
</style>
