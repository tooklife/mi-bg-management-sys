<template>
  <div class="animated bounceInRight">
    <el-table :data="tableData" class="tableBox">
      
        <el-table-column prop="orderStatus" label="订单状态" align="center"></el-table-column>
        <el-table-column prop="owner" label="创建人" align="center" width="150"></el-table-column>
        <el-table-column  label="创建时间" align="center" width="150">
        <template slot-scope="scope">
            {{scope.row.createTime | dataFormat}}
        </template>
        </el-table-column>
        <el-table-column prop="consign" label="收货人" align="center"></el-table-column>
        <el-table-column prop="consignPhone" label="收货电话" align="center" width="120"></el-table-column>
        
        
        <el-table-column prop="payMethod" label="支付方式" align="center"></el-table-column>
        <el-table-column prop="orderNumber" label="订单号" align="center" width="320"></el-table-column>
      
        <el-table-column label="操作" fixed="right" width="110" align="center">
            <template slot-scope="scope">

                <el-button size="mini" type="primary" icon="el-icon-view" @click="edtMsg(scope.row.orderId)" circle></el-button>

                <el-button size="mini" type="danger" icon="el-icon-delete" @click="delOrder(scope)" circle></el-button>
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
            <el-form-item label="创建时间" :label-width="formLabelWidth">
                <el-date-picker
                v-model="form.createTime"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="创建人" :label-width="formLabelWidth">
            <el-input v-model="form.owner" autocomplete="off" class="inputbox"></el-input>
        </el-form-item>
        <el-form-item label="订单号" :label-width="formLabelWidth">
            <el-input v-model="form.orderNumber" autocomplete="off" class="inputbox"></el-input>
        </el-form-item>
        <el-form-item label="收货人" :label-width="formLabelWidth">
            <el-input v-model="form.consign" autocomplete="off" class="inputbox"></el-input>
        </el-form-item>
        <el-form-item label="收货电话" :label-width="formLabelWidth">
            <el-input v-model="form.consignPhone" autocomplete="off" class="inputbox"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" :label-width="formLabelWidth">
            <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="form.consignAddress"
                class="inputbox">
            </el-input>
        </el-form-item>
        <el-form-item label="支付方式" :label-width="formLabelWidth">
            <el-checkbox-group v-model="payArr">
                <el-checkbox label="支付宝支付"></el-checkbox>
                <el-checkbox label="微信支付"></el-checkbox>
                <el-checkbox label="网银支付"></el-checkbox>
                <el-checkbox label="小米支付"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        
        <el-form-item label="订单内容" :label-width="formLabelWidth">
            
            <el-table
                :data="this.form.productList"
                border
                style="width: 100%">
                <el-table-column
                    label="照片"
                    align="center">
                    <template slot-scope="scope">
                        <div>
                            <img class="orderImg" :src="scope.row.productPicture | imgFilter" alt="">
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="productName"
                    label="名字"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="productColor"
                    label="颜色"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="productMount"
                    label="价格"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="productNumber"
                    label="总数"
                    align="center">
                </el-table-column>
            </el-table>


        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="modify">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
    name: "ordrManagement",
    data(){
        return{
            tableData:[],
            dialogFormVisible: false,
            form: {
                orderId:'',
                orderStatus: 1,
                nickName:'',
                createTime:'',
                owner:'',
                consign: '',
                consignPhone: '',
                consignAddress: '',
                orderNumber: '',
                productList: []
            },
            payArr: [],
            formLabelWidth: '120px',
            pagesize: 10,
            currentpage: 1,
            start: 1,
            page: 0,
            
        }
    },
    created() {

        this.$axios.get('http://mimall.natapp1.cc/order/selectTotalCount').then(res => {
            this.page = res.data;
        }).catch(res => {
            console.log(res);
        })

        this.$axios.get('http://mimall.natapp1.cc/order/selectAll',{
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
    filters:{
        dataFormat: function(data){
            let d = new Date(data);
            let str = '';
            let [day, month, year] = [d.getDate(), parseInt(d.getMonth())+1, d.getFullYear()]
            str = year + '年' + month + '月' + day + '日';
            return str;
        },
        imgFilter(data){
            return `http://mimall.natapp1.cc/picture${data}`;
        }
    },
    methods:{
        edtMsg(orderId) {
            console.log(orderId);
            this.dialogFormVisible = true;
            this.$axios('http://mimall.natapp1.cc/order/selectByPrimaryKey',{
                params:{
                orderId
                }
            }).then(res => {
                console.log(res);
                console.log(this.form);
                this.form.orderId = res.data.orderId;
                this.payArr = [];
                this.form.productList = [];
                this.form.owner = res.data.owner;
                this.form.createTime = res.data.createTime;
                this.form.consign = res.data.consign;
                this.form.consignPhone = res.data.consignPhone;
                this.form.consignAddress = res.data.consignAddress;
                this.payArr.push(res.data.payMethod);
                this.form.productList = res.data.productList;
                this.form.orderNumber = res.data.orderNumber;
                this.form.nickName = res.data.nickName;
            }).catch(res => {
                console.log(res);
            })
        },
        delOrder(data) {
            
            let [orderId, index] = [data.row.orderId, data.$index];

            this.$confirm('确定删除此订单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios('http://mimall.natapp1.cc/order/deleteByPrimaryKey',{
                    params:{
                        orderId
                    }
                }).then(res => {
                    console.log(res);
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
            }).catch(res =>{
                console.log(res);
            })
        },
        handleCurrentChange(page) {
            this.$axios.get('http://mimall.natapp1.cc/order/selectAll',{
                params:{
                    start: page,
                    number: this.pagesize
                }
            }).then(res => {
                console.log(res);
                this.tableData = res.data;
            }).catch(res => {
                console.log(res);
            })
        },
        modify(){
            this.form.payMethod = this.payArr[0];
            
            console.log(this.form);
            $.ajax({
                type: "post",
                url: "http://mimall.natapp1.cc/order/updateOrder",
                data: JSON.stringify(this.form),
                contentType: "application/json",
                dataType: "json",
                success: res => {
                    console.log(res);
                    if(res == 1){
                        this.$message({
                            type: 'success',
                            message: '修改订单成功!'
                        });
                        this.dialogFormVisible = false;
                        this.$axios.get('http://mimall.natapp1.cc/order/selectAll',{
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
                    }
                }
            });
        }
        
    }
}
</script>

<style scoped>
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
.orderImg{
    width: 36px;
}
</style>
