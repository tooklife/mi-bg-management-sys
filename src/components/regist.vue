<template>

        <div class="inset">
          <form name="login" id="login" method="post" action="ecmsadmin.php" onSubmit="retuen false">
            <input type="hidden" name="enews" value="login">
            <div>
              <h2>后台管理系统</h2>
              <span style="text-align: left;text-indent: 0.4em;"><label>姓名</label></span>
              <span><input type="text" v-model="name" class="textbox" ></span>
            </div>
            <div>
              <span style="text-align: left;text-indent: 0.4em;"><label>密码</label></span>
              <span><input  v-model="password" type="password" class="password"></span>
            </div>
            <div class="sign">
              <el-button type="primary" @click="open">提交</el-button>
              <!-- <input type="button" value="注册" class="submit" @click="regist()"/> -->
            </div>
            <div class="prompt">
              <span @click="swich">已有账号，去登陆</span>
            </div>
          </form>
        </div>
       
</template>
<script>
export default {
    name:'regist',
    data (){
        return {
            name: '',
			password: ''
        }
    },
    mounted(){
        document.onkeydown = event => {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 13) {
                this.$axios('http://mimall.natapp1.cc/admin/register',{
            params:{
              name:this.name,
              passWord:this.password
            }
          }).then(res => {
            if(res.data == 1){
              
              this.$confirm('注册成功', '确认信息', {
                distinguishCancelAndClose: true,
                confirmButtonText: '去登陆',
                cancelButtonText: '取消'
              }).then(() => {
                  this.$emit('handelSwitch','login');
                }).catch(action => {
                  this.name = '';
                  this.password = '';
                  this.$message({
                    type: 'info',
                    message: action === 'cancel'
                      ? '取消登录'
                      : '取消登录'
                  })
                });



            }else{
                this.$message({
                    type: 'warning',
                    message: '注册失败!'
                });
            }
          }).catch(res => {
            console.log(res);
          })
            }
        };
    },
    methods: {
        regist (){
          console.log(this.name);
          console.log(this.password);
          
          return false;
      },
      swich (){
        this.$emit('handelSwitch','login');
      },
      open() {

        this.$axios('http://mimall.natapp1.cc/admin/register',{
            params:{
              name:this.name,
              passWord:this.password
            }
          }).then(res => {
            if(res.data == 1){
              
              this.$confirm('注册成功', '确认信息', {
                distinguishCancelAndClose: true,
                confirmButtonText: '去登陆',
                cancelButtonText: '取消'
              }).then(() => {
                  this.$emit('handelSwitch','login');
                }).catch(action => {
                  this.name = '';
                  this.password = '';
                  this.$message({
                    type: 'info',
                    message: action === 'cancel'
                      ? '取消登录'
                      : '取消登录'
                  })
                });



            }else{
                this.$message({
                    type: 'warning',
                    message: '注册失败!'
                });
            }
          }).catch(res => {
            console.log(res);
          })
      }
    }
}
</script>
<style scoped>
  a {
	text-decoration: none;
}
img {
	max-width: 100%;
}
/*end reset*/
/****-----start-body----****/
/* body {
	background-color: #0091e6;
} */
h1 {
	font-size: 2.4em;
	padding-bottom: 28px;
	color: #fff;
	text-align: center;
}
h2 {
	font-size: 1.5em;
	padding-bottom: 28px;
	color: #0091e6;
	text-align: center;
}
.login {
	padding: 2em 0;
}
.inset {
	position: relative;
	background: #fff;
	padding: 2.5em;
	border-radius: 0.3em;
	-webkit-border-radius: 0.3em;
	-o-border-radius: 0.3em;
	-moz-border-radius: 0.3em;
	box-shadow: 0px 0px 15px #545454;
}
form span {
	display: block;
	font-size: 1.0em;
	/* color: #333; */
	font-weight: 400;
}
input[type="text"], input[type="password"] {
	padding: 9px;
	width: 93.4%;
	font-size: 1.1em;
	margin: 3px 0px 25px;
	color: #666666;
	background: #f0f0f0;
	border: none;
	font-weight:400;
	outline: none;
	-webkit-transition: all 0.3s ease-out;
	-moz-transition: all 0.3s ease-out;
	-ms-transition: all 0.3s ease-out;
	-o-transition: all 0.3s ease-out;
	transition: all 0.3s ease-out;
	border-radius: 0.2em;
	-webkit-border-radius: 0.2em;
	-o-border-radius: 0.2em;
	-moz-border-radius: 0.2em;
}
input[type="text"]:hover, input[type="Password"]:hover, #active {
	border: none;
	outline: none;
}
.sign {
	padding: 10px 0 0;
	text-align: center;
}
.rzm{ position:relative}
.rzm img{ position: absolute;top:0px;right:0px; height:45px;}

/*----start-responsive design-----*/
h1 {
	font-size: 2.2em;
}

@media (max-width:991px) {
    h1 {
      font-size: 2em;
    }
	}
	
	h1 {
		font-size: 2.1em;
	}
	
	.inset {
		padding: 2em;
	}
	h1 {
		font-size: 1.9em;
	}
	.login {
		padding: 2em 0 0;
	}
	.prompt {
		text-align: right;
		box-sizing: border-box;
		padding: 15px;
		font-size: 12px;
	}
	.prompt span{
		padding: 0 10px;
		color: #999;
		cursor: pointer;
	}
	.prompt span:hover{
		color: #666;
	}
</style>