<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style  scoped>
.goods-item{
  /* display: flex; */
  width: 48%;

}
.goods-item img {
    width: 100%;
    height: 222px;
    border-radius: 5px;
    border:3px solid var(--color-tint);
  }
.goods-item .goods-info{
  font-size: 12px;
  bottom: 5px;
  display: flex;
  flex-direction: column;
}
.goods-item .goods-info p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  margin-bottom: 3px;
}
.goods-item .goods-info .price{
  color: var(--color-high-text);
  text-align: center;
}
.goods-item .goods-info .collect{
  text-align: center;
}
.goods-info .collect::before {
    content: ' ';
    /* position: absolute; */
    /* left: 160px;
    top: -1px; */
    /* margin: 2px; */
    padding-top: -3px;
    padding-left: 7px;
    padding-right: 7px;
    width: 14px;
    height: 14px;
    background: url("~assets/images/common/collect.svg") 0 0/14px 14px no-repeat;
  }
</style>
