<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
  export default {
    props:{
      probeType:{
        type: Number,
        default(){
          return 0
        }
      },
      pullUpLoad:{
        type: Boolean,
        default(){
          return false
        }
      }
    },
    data(){
      return{
        scroll: null
      }
    },
    mounted(){
      //1.创建对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType: this.probeType,
        pullUpLoad:this.pullUpLoad
      })
      //2.监听滚动的位置
      this.scroll.on('scroll',(position)=>{
        //console.log(position)
        this.$emit('scroll',position)
      })
      //3.监听上拉事件
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
      this.scroll.scrollTo(0,0)

    },
    methods:{
      scrollTo(x,y,time = 300){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
       this.scroll.finishPullUp()
      },
      //解决bug
      refresh(){
        console.log("11")
        this.scroll && this.scroll.refresh()
      }
    }
  }
</script>

<style  scoped>

</style>
