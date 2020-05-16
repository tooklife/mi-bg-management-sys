<template>
  <div>
<!--    logo部分-->
    <div class="logo">
      <img :class="isShow?'logoImg':'logoImg2'" src="../assets/image/logo.png" alt="">
    </div>
<!--    菜单  竖向菜单-->
    <el-menu
      class="menu"
      :default-active="activeMain"
      :collapse="!isShow"
      :collapse-transition=false
      @select="chooseMenu"
    >
      <el-menu-item index="index" class="menuItem">
        <i class="el-icon-s-home"></i>
        <span v-show="isShow">{{lg.index}}</span>
      </el-menu-item>
      <el-menu-item index="userManage" class="menuItem">
        <i class="el-icon-s-order"></i>
        <span v-show="isShow">{{lg.userManage}}</span>
      </el-menu-item>

      

      <el-menu-item index="ordrManagement" class="menuItem">
        <i class="el-icon-s-claim"></i>
        <span v-show="isShow">{{lg.ordrManagement}}</span>
      </el-menu-item>

      <el-submenu index="commodityOverview" class="menuItem">
        <template slot="title">
          <i class="el-icon-s-shop"></i>
          <span v-show="isShow">商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="productBasicInfo" class="menuItem">
            <i class="el-icon-menu"></i>
            <span v-show="isShow">基础信息</span>
          </el-menu-item>
          <!-- <el-menu-item index="productConfigurationInfo" class="menuItem">
            <i class="el-icon-s-grid"></i>
            <span v-show="isShow">配置信息</span>
          </el-menu-item> -->
          <el-menu-item index="productAdd" class="menuItem">
            <i class="el-icon-plus"></i>
            <span v-show="isShow">商品添加</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
  </div>
</template>
<script>
  export default {
      // 获取父组件的宽度缩进    lg：语言
      props:['isShow','lg','activeMain'],
      name:'leftHome',
      data(){
          return{
          }
      },
      methods:{
          // 点击调用父组件的chooseMenu方法
          chooseMenu(key){
              this.$emit("chooseMenu",key)
          }
      },
      watch:{
      }
  }
</script>
<style>
  .logo{
    text-align: center;
    margin: 30px 0;
  }
  .logoImg{
    width: 60px;
    /* height: 50px; */
    transition: 0.2s linear;
  }
  .logoImg2{
    width: 30px;
    /* height: 20px; */
    transition: 0.2s linear;
  }
  .menu{
    width: calc(100% - 1px);
    overflow: hidden;
  }
  /* .menuItem{ */
    /*width: 100%;*/
  /* } */
  /* .el-menu-item.is-active{
    color: #f60;
  } */
</style>
