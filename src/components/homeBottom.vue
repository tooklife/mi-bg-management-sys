<template>
    <div class="bottom">
      <img src="../assets/image/logo.png" alt="">
      <div>
        © 作者：572865462 | 邮箱：572865462@qq.com
      </div>
    </div>
</template>

<script>
    export default {
        name: "homeBottom"
    }
</script>

<style scoped>
  .bottom{
    background: #d9dbda;
    text-align: center;
    width: calc(100% - 10px);
    height: 130px;
    padding: 40px;
    margin: 5px;
    line-height: 40px;
    box-sizing: border-boxl
  }
  .bottom img{
    width: 60px;
    /* height: 40px; */
  }
  .bottom div{
    color: #7d7d7b;
    font-size: 12px;
  }
</style>
