<template>
    <div class="box">
        
            <chart ref="chart1" class="chart" :options="orgOptions" :auto-resize="true" theme="liner"></chart>
            <div class="logintime">
                <el-table
                :data="loginTime"
                style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="登录人"
                        width="120"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="time"
                        label="登录时间"
                        width="150"
                        align="center">
                    </el-table-column>
                </el-table>
            </div>

        
        
        <div class="ranking">
            <el-table
            :data="orderRank"
            style="width: 100%">
                <el-table-column
                    prop="proId"
                    label="排名"
                    width="100"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="proType"
                    label="类型"
                    width="100"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="商品名称"
                    width="180"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="currentPrice"
                    label="价格"
                    width="100"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="sales"
                    label="销量"
                    width="100"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="好评度"
                    width="150"
                    align="center">
                    <template slot-scope="scope">
                        <div>
                            <el-rate v-model="scope.row.value1"></el-rate>
                            
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        
    </div>
</template>

<script>
import homeData from "../assets/js/home";
let loginName = [];
// import 'echarts/lib/component/polar'
    export default {
        name: "home",
        
        data(){
            
            return{
                
                orgOptions: {},

                time: '',
                
                loginTime: [],

                orderRank: []
            //    商品类型  商品原价  商品现价

            }
            
        
        },
        created(){
            
        },
        mounted() {
            // this.time = new Date;
            // let obj = {};
            // let date = new Date;
            // let year = date.getFullYear();
            // let month = date.getMonth() + 1;
            // let day = date.getDate();
            // let hours = date.getHours();
            // let minute = date.getMinutes();
            // let second = date.getSeconds();
            // let nowTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minute + ':' + second
            // obj['name'] = '张三';  //this.$route.query.name
            // obj['time'] = nowTime;

            // loginName.push(obj);
            // console.log(loginName);

            this.$axios.get('http://mimall.natapp1.cc/product/selectToOrderBy').then(res => {
                console.log(res);
                
                this.orderRank = res.data;
            }).catch(res => {
                console.log(res);
            })

            console.log(this.$route.query.name);
            // this.loginTime.push(obj);
            this.orgOptions = {
                title:{
                    text: '商城一年总收入折线图',
                    show: true
                },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon','Tue']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320, 1183, 1096],
                    type: 'line',
                    smooth: true
                }]
            }


            this.$axios.get('http://mimall.natapp1.cc/admin/selectAdminDate').then(res => {
                console.log(res);
                let timeArr = [];
                timeArr = res.data;
                for (let i = 0; i < timeArr.length; i++) {
                    let time = new Date(timeArr[i].loginDate);
                    let obj = {};
                    let year = time.getFullYear();
                    let month = time.getMonth() + 1;
                    let day = time.getDate();
                    let hours = time.getHours();
                    let minute = time.getMinutes();
                    let second = time.getSeconds();
                    let nowTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minute + ':' + second
                    console.log(nowTime);
                    obj['name'] = timeArr[i].name;
                    obj['time'] = nowTime;
                    this.loginTime.push(obj);
                }
                
                // console.log(nowTime);
            }).catch(res => {
                console.log(res);
            })
        }
        
    }
</script>

<style scoped>
    .box{
       
        background-color: #fff;
        margin: auto 5px;
        padding: 30px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .logintime{
        display: inline-block;
        margin-left: 140px;
        margin-top: 50px;
        height: 300px;
    }
    .logintime, .ranking{
        border: solid 1px #EBEEF5;
        /* display: inline-block; */
    }
    .ranking{
        margin-left: 20px;
    }
    /* .chart{
        float: left;
    } */
     /* .line{
        width: 600px;
        height: 300px;
        height: 600px;
        background-color: bisque
    }  */
    /* #canvas{
        width: 100%;
        height: 100%;
    } */
    /* .wrapper{
        width: 7rem;
        height: 500px;
    } */
</style>
