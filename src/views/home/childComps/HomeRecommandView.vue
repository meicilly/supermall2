<template>
  <div class="home-rec-view">
    <div v-for="item in recommends" class="recommend-item" :key="item.sort">
      <a href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
.home-rec-view{
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 13px;
  text-align: center;
  padding: 5px 0 20px;
  border-bottom: 8px solid #eee;
}
img{
  height: 75px;
  width: 7npm5px;
  padding: 5px;
}
</style>
