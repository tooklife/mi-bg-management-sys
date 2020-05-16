<template>
  <div class="animated bounceInRight">

    <el-table :data="tableData" class="tableBox" >
        <el-table-column prop="nickName" label="用户昵称" align="center"></el-table-column>
        <el-table-column prop="userName" label="用户名字" align="center"></el-table-column>
        <el-table-column label="用户密码" align="center">
            <template slot-scope="scope">
                <div>
                    {{scope.row.passWord | pswFormat}}
                </div>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">

            <el-button size="mini" type="primary" icon="el-icon-view" @click="getUserMsg(scope.row.userId)" circle></el-button>

            <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="del(scope)"></el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="choosePage">
        <el-pagination
            background
            layout="prev, pager, next"
            :total="page"
            :page-size="pagesize"
            :current-page="currentpage"
            @current-change="handleCurrentChange">
        </el-pagination>
    </div>

    <el-dialog title="信息编辑" :visible.sync="dialogFormVisible" :append-to-body="true">
        <el-form :model="form">
            <el-form-item label="用户昵称" :label-width="formLabelWidth">
                <el-input v-model="form.nickname" autocomplete="off" class="inputbox"></el-input>
            </el-form-item>
            <el-form-item label="用户性别" :label-width="formLabelWidth">
                <el-radio v-model="form.sex" label="男">男</el-radio>
                <el-radio v-model="form.sex" label="女">女</el-radio>
            </el-form-item>
            <el-form-item label="用户名字" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" class="inputbox"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" :label-width="formLabelWidth">
                <el-input v-model="form.password" autocomplete="off" class="inputbox" show-password></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="edt()">确 定</el-button>
        </div>
    </el-dialog>

  </div>
</template>

<script>
import userData from "../assets/js/user";
    export default {
        name: "userManage",
        data(){
            return{
                tableData:[],
                dialogFormVisible: false,
                form:{
                  userId:0,
                  nickname:'',
                  name:'',
                  password:0,
                  sex:'男'
                },
                formLabelWidth: '120px',
                pagesize:8,
                currentpage:1,
                start:1,
                page: 0
            }
        },
        created() {
            // this.tableData = userData.data;
            this.$axios.get('http://mimall.natapp1.cc/user/selectTotalCount').then(res => {
                console.log(res.data);
              this.page = res.data;

            }).catch(res => {
              console.log(res);
            })

            this.$axios.get('http://mimall.natapp1.cc/user/selectAllUser',{
              params:{
                start: this.start,
                number: this.pagesize
              }
            }).then(res => {
                console.log(res);
                this.tableData = res.data;
            }).catch(res => {
                console.log(res);
            })

        },
        methods:{
            getUserMsg(userId){
                console.log(userId);
                this.$axios.get('http://mimall.natapp1.cc/user/selectByPrimaryKey',{
                    params:{
                        userId
                    }
                }).then(res => {
                    console.log(res);
                    this.form.userId = res.data.userId;
                    this.form.nickname = res.data.nickName;
                    this.form.name = res.data.userName;
                    this.form.password = res.data.passWord;
                    this.form.sex = res.data.sex;
                    this.dialogFormVisible = true;
                })
            },
            edt() {
                let userId = this.form.userId;
                let nickName = this.form.nickname;
                let userName = this.form.name;
                let passWord = this.form.password;
                let sex = this.form.sex;
                console.log(userId,nickName,userName,passWord,sex);
              
                this.$axios('http://mimall.natapp1.cc/user/updateUser',{
                    params:{
                        userId,
                        nickName,
                        userName,
                        passWord,
                        sex
                    }
                }).then(res => {
                    console.log(res);
                    if(res.data == 1){
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                        this.dialogFormVisible = false;
                        this.$axios.get('http://mimall.natapp1.cc/user/selectAllUser',{
                            params:{
                                start: this.start,
                                number: this.pagesize
                            }
                            }).then(res => {
                                console.log(res);
                                this.tableData = res.data;
                            }).catch(res => {
                                console.log(res);
                            })
                        console.log(this.tableData);
                    }
                    
                })
                console.log(userId);
            },
            del(data) {
            
                let index = data.$index;
                let username = data.row.username;

                this.$confirm('确定删除此用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                this.$axios('http://mimall.natapp1.cc/user/deleteUser',{
                    params:{
                    userName:username
                    }
                }).then(res => {
                    console.log();
                    if(res.data == 1){
                        this.tableData.splice(index, 1);
                        this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }else{
                    this.$message({
                        type: 'warning',
                        message: '删除失败!'
                    });
                }
                }).catch(res => {
                    console.log(res);
                })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });

            },
            handleCurrentChange(page) {
                this.$axios.get('http://mimall.natapp1.cc/user/selectAllUser',{
                    params:{
                        start: page,
                        number: this.pagesize
                    }
                }).then(res => {
                    this.tableData = res.data;
                }).catch(res => {
                console.log(res);   
                })
            
            }
        },
        filters: {
            pswFormat: function(data){
                return '******';
            }
        }
    }
</script>

<style scoped>
.inputSearch{
    width: 40%;

}
.tableBox{
    width: calc(100% - 10px);
    margin: 5px;
}
.choosePage{
    text-align: right;
    width: 100%;
    background: #fff;
    padding: 20px 0;
}
.inputbox{
    width: 90%;
}
.dialog-footer{
    text-align: center;
}
</style>
