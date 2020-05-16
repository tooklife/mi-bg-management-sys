<template>
<!--  页面加载效果-->
<div class="body">
	<div id="app" v-loading="loading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
		<div class="container" align="center">
			<div class="col-md-6" style="margin-top: 10%;">

				<transition  enter-active-class="animated swing">
					<component :is="isshow" @handelSwitch="childShow"></component>
				</transition>
			</div>
		</div>
  	</div>
</div>
</template>

<script>

import regist from './regist'
import login from './login'
  export default {
      name:'loginPage',
      data(){
          return{
			  loading: true,
			  registShow: false,
			  loginShow: true,
			//   show:true
			  isshow:'login'
          }
      },
      components:{
		  regist,
		  login
	  },
      created(){
          setTimeout(()=>{
              this.loading = false;
          },1000)
	  },
     
	  methods: {
		  childShow(payload){
			console.log(payload);
			// this.registShow = payload[0];
			// this.loginShow = payload[1];
			this.isshow = payload;
			console.log(payload);
		  }
		//   change() {
		// 	  this.show = !this.show;
		//   }
	  }
  }
</script>

<style>
  *{
    font-family: "微软雅黑";
  }
  body{
	  /* background-color: skyblue; */
	background: url('../assets/image/banner.jpg');

	background-attachment: fixed;
	background-repeat: no-repeat;
	background-position: center;
	background-size: 100%;
	overflow: hidden;
}
/* blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after, q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
} */
/* start editing from here */

</style>
