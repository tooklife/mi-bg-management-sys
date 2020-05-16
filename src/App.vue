<template>
<!--  页面加载效果-->
  <div id="app" v-loading="loading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)"
  >
  <router-view></router-view>
  </div>
</template>

<script>
  export default {
      name:'app',
      data(){
          return{
              loading:true
          }
      },
      components:{
          
      },
      created(){
          setTimeout(()=>{
              this.loading = false;
          },1000)
      },
      methods:{
        // CheckLogin(obj){
        //   if(obj.username.value=='')
        //   {
        //     alert('请输入用户名');
        //     obj.username.focus();
        //     return false;
        //   }
        //   if(obj.password.value=='')
        //   {
        //     alert('请输入登录密码');
        //     obj.password.focus();
        //     return false;
        //   }
        //   return true;
        // },
        // back (){
        //   this.$router.push({path:'/homepage'})
        // }
          
      },
      watch:{
         
      }
  }
</script>

<style>
  *{
    font-family: "微软雅黑";
  }
</style>
