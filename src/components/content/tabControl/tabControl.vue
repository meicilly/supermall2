<template>
  <div class="tab-control">
      <div v-for="(item,index) in titles"
      class="tab-control-item"
      @click="itemClick(index)"
      :class="{active:index === currentIndex}" :key="index">
        <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
  export default {
    props:{
      titles:{
        type: Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        currentIndex:0
      }
    },
    methods:{
      itemClick(index){
        //console.log(index)
        this.currentIndex = index
        //console.log(this.currentIndex)
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style lang="css">
.tab-control{
  display: flex;
  justify-content: space-around;
  text-align: center;
}
.tab-control-item{
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}
/* .tab-control-item :hover{
  color: pink;
  padding-bottom: 2px;
  border-bottom: 4px solid pink;
} */
.active{
  color: var(--color-high-text);

}
.active span{
  border-bottom: 3px solid var(--color-tint);
}
</style>
