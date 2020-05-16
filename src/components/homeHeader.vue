<template>
  <el-row class="header">
<!--    点击按钮控制左侧的menu缩进-->
    <el-col :span="2">
      <el-button type="info" icon="el-icon-menu" circle @click="changeMenu"></el-button>
    </el-col>

<!--    导出文件部分-->
    <el-col :span="7" :offset="7" class="inputBox">
      <el-select v-model="selected1" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="success" @click="exportExcel" class="excelSend">导出</el-button>
    </el-col>
    
<!--    查询、帮助、关于  -->
    <el-col class="userMessage" :span="6">
      <span class="spanBox" @click="drawer = true">查询</span>
      <span class="spanBox">帮助</span>
      <span class="spanBox">关于</span>
      
<!--      个人信息  头像及相关内容   -->
      <div>
        <el-popover
          width="130"
          trigger="click">
          <div class="userSel">
            <div @click="handleAdminMsg">用户信息</div>
            <div @click="drpOut">退出登录</div>
          </div>
          <div class="userLogo" slot="reference">
            <img :src="logoImg" alt="">
            <div>
              <i class="el-icon-caret-bottom"></i>
            </div>
          </div>
        </el-popover>
      </div>
    </el-col>

<!--     弹出查询模块    -->
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      size="38%">
      <el-form :model="form">
          <el-form-item label="查询表格" :label-width="formLabelWidth">
            <el-select v-model="selected2" placeholder="请选择" @change="selectedCag">
              <el-option
                v-for="item in form.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <component :is="isshow" @getChildVal="handleChildCal"></component>
        </el-form>
    </el-drawer>

<!-- 展示查询信息 -->
    <el-dialog title="用户信息" :visible.sync="dialogTableVisible1">
      <el-table :data="userData">
        <el-table-column property="nickName" label="用户昵称" align="center"></el-table-column>
        <el-table-column property="userName" label="用户名" align="center"></el-table-column>
        <el-table-column label="密码" align="center">
            <template slot-scope="scope">
                <div>
                    {{scope.row.passWord | pswFormat}}
                </div>
            </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
            <template slot-scope="scope">

                <el-button size="mini" type="primary" icon="el-icon-view" circle @click="getUserMsg(scope.row.userId)"></el-button>

                <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="delUserMsg(scope)"></el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="订单信息" :visible.sync="dialogTableVisible2" width="70%">
      <el-table :data="orderData">
        <el-table-column label="日期" align="center">
            <template slot-scope="scope">
                <div>
                    {{scope.row.createTime | dataFormat}}
                </div>
            </template>
        </el-table-column>
        <el-table-column property="consign" label="收货人" align="center"></el-table-column>
        <el-table-column property="consignPhone" label="收货电话" align="center"></el-table-column>
        
        <el-table-column property="payMethod" label="支付方式" align="center"></el-table-column>
        <el-table-column property="orderNumber" label="订单号" align="center" width="300px"></el-table-column>
        <el-table-column align="center" label="操作">
            <template slot-scope="scope">

                <el-button size="mini" type="primary" icon="el-icon-view"  circle @click="getOrderMsg(scope.row.orderId)"></el-button>

                <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="delOrderMsg(scope)"></el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="商品信息" :visible.sync="dialogTableVisible3">
      <el-table :data="productData">
        <el-table-column label="商品类型" align="center">
            <template slot-scope="scope">
                <div>
                    {{scope.row.proType | protypeFm}}
                </div>
            </template>
        </el-table-column>
        <el-table-column property="name" label="商品名字" align="center"></el-table-column>
        <el-table-column property="originalPrice" label="商品原价" align="center"></el-table-column>
        <el-table-column property="currentPrice" label="商品现价" align="center"></el-table-column>
        
        <el-table-column align="center" label="操作">
            <template slot-scope="scope">

                <el-button size="mini" type="primary" icon="el-icon-view" circle @click="getProductMsg(scope.row.proId)"></el-button>

                <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="delProductMsg(scope)"></el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="管理员" :visible.sync="dialogTableVisible4">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="头像">
                <el-upload
                    class="avatar-uploader"
                    action="http://mimall.natapp1.cc/admin/upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="账号">
                <el-input v-model="admform.admuser"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="admform.admpsw" show-password></el-input>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="deladmin">确定</el-button>
        </span>
    </el-dialog>

<!-- 嵌套在查询功能后面的操作模块 -->
    <el-dialog title="信息编辑" :visible.sync="dialogFormVisible" :append-to-body="true">
        <el-form :model="userForm">
            <el-form-item label="用户昵称" :label-width="formLabelWidth">
                <el-input v-model="userForm.nickname" autocomplete="off" class="inputbox"></el-input>
            </el-form-item>
            <el-form-item label="用户性别" :label-width="formLabelWidth">
                <el-radio v-model="userForm.sex" label="男">男</el-radio>
                <el-radio v-model="userForm.sex" label="女">女</el-radio>
            </el-form-item>
            <el-form-item label="用户名字" :label-width="formLabelWidth">
                <el-input v-model="userForm.name" autocomplete="off" class="inputbox"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" :label-width="formLabelWidth">
                <el-input v-model="userForm.password" autocomplete="off" class="inputbox" show-password></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="edt()">确 定</el-button>
        </div>
    </el-dialog>

    <el-dialog title="信息编辑" :visible.sync="dialogFormVisible" :append-to-body="true">
        <el-form :model="orderForm">
            <el-form-item label="创建时间" :label-width="formLabelWidth">
                <el-date-picker
                v-model="orderForm.createTime"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="创建人" :label-width="formLabelWidth">
            <el-input v-model="orderForm.owner" autocomplete="off" class="inputbox"></el-input>
        </el-form-item>
        <el-form-item label="订单号" :label-width="formLabelWidth">
            <el-input v-model="orderForm.orderNumber" autocomplete="off" class="inputbox"></el-input>
        </el-form-item>
        <el-form-item label="收货人" :label-width="formLabelWidth">
            <el-input v-model="orderForm.consign" autocomplete="off" class="inputbox"></el-input>
        </el-form-item>
        <el-form-item label="收货电话" :label-width="formLabelWidth">
            <el-input v-model="orderForm.consignPhone" autocomplete="off" class="inputbox"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" :label-width="formLabelWidth">
            <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="orderForm.consignAddress"
                class="inputbox">
            </el-input>
        </el-form-item>
        <el-form-item label="支付方式" :label-width="formLabelWidth">
            <el-checkbox-group v-model="orderForm.payArr">
                <el-checkbox label="支付宝支付"></el-checkbox>
                <el-checkbox label="微信支付"></el-checkbox>
                <el-checkbox label="网银支付"></el-checkbox>
                <el-checkbox label="小米支付"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        
        <el-form-item label="订单内容" :label-width="formLabelWidth">
            
            <el-table
                :data="this.orderForm.productList"
                border
                style="width: 100%">
                <el-table-column
                    prop="productPicture"
                    label="照片"
                    align="center">
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
            <el-button type="primary">确 定</el-button>
        </div>
    </el-dialog>

    <el-dialog title="信息编辑" :visible.sync="dialogFormVisible" :append-to-body="true" width="60%">
        <el-form :model="productForm">classification
          <el-form-item label="商品分类" :label-width="formLabelWidth">
            <el-select v-model="productForm.classification" placeholder="请选择">
              <!-- <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="商品名字" :label-width="formLabelWidth">
            <el-input v-model="productForm.name" autocomplete="off" class="inputbox"></el-input>
          </el-form-item>
          <el-form-item label="商品照片" :label-width="formLabelWidth">
            
          </el-form-item>
          <el-form-item label="商品原价" :label-width="formLabelWidth">
            <el-input-number v-model="productForm.originalPrice" size="mini" :min="1" :max="10000" label="商品原价" ></el-input-number>&nbsp;&nbsp;元
          </el-form-item>
          <el-form-item label="商品现价" :label-width="formLabelWidth">
            <el-input-number v-model="productForm.currentPrice" size="mini" :min="1" :max="10000" label="商品现价"></el-input-number>&nbsp;&nbsp;元
          </el-form-item>
          <el-form-item label="商品描述" :label-width="formLabelWidth">
            <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="productForm.redNote"
                class="textbox">
            </el-input>
          </el-form-item>
          <el-form-item label="商品配置" :label-width="formLabelWidth">
            <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="productForm.grayNote"
                class="textbox">
            </el-input>
          </el-form-item>
          <el-form-item label="商品版本" :label-width="formLabelWidth">
            <el-checkbox-group v-model="confarr">
                <el-checkbox label="6GB+32GB"></el-checkbox>
                <el-checkbox label="6GB+64GB"></el-checkbox>
                <el-checkbox label="6GB+128GB"></el-checkbox>
                <el-checkbox label="6GB+256GB"></el-checkbox>
                <el-checkbox label="8GB+32GB"></el-checkbox>
                <el-checkbox label="8GB+64GB"></el-checkbox>
                <el-checkbox label="8GB+128GB"></el-checkbox>
                <el-checkbox label="8GB+256GB"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="商品颜色" :label-width="formLabelWidth">
            <el-checkbox-group v-model="colorarr">
                <el-checkbox label="深蓝星球"></el-checkbox>
                <el-checkbox label="暗夜王子"></el-checkbox>
                <el-checkbox label="白色恋人"></el-checkbox>
                <el-checkbox label="魔法绿境"></el-checkbox>
                <el-checkbox label="冰雪极光"></el-checkbox>
                <el-checkbox label="深海微光"></el-checkbox>
                <el-checkbox label="紫玉幻境"></el-checkbox>
                <el-checkbox label="花影惊鸿"></el-checkbox>
                <el-checkbox label="时光独白"></el-checkbox>
                <el-checkbox label="镜花水月"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="商品套餐" :label-width="formLabelWidth">
            <el-checkbox-group v-model="mealarr">
                <el-checkbox label="标配"></el-checkbox>
                <el-checkbox label="+299元得星芒钻幕壳"></el-checkbox>
                <el-checkbox label="+99元得立式无线充"></el-checkbox>
                <el-checkbox label="+39元得条纹保护壳"></el-checkbox>
                <el-checkbox label="+69元得撞色飘带保护壳"></el-checkbox>
                <el-checkbox label="壳膜套装"></el-checkbox>
                <el-checkbox label="+99元得黑鲨手柄套装"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
      </el-dialog>

  </el-row>
</template>
<script>
    export default {
        name:'homeHeader',
        data(){
            return{
              // 左侧的开关
                value:true,
                // logo的路径
                logoImg: '',
                imageUrl: '',
                checkImgUrl:'',
                // 导出文件
                options: [{
                    value: 'user',
                    label: '用户表'
                }, {
                    value: 'order',
                    label: '订单表'
                }, {
                    value: 'commodity',
                    label: '商品表'
                }],
                selected1:'user',   //  导出文件
                selected2:'user',  // 查询文件
                drawer: false,  // 弹出查询窗口
                direction: 'rtl', // 右边弹出查询窗口
                formLabelWidth: '120px', 
                dialogFormVisible:false,
                dialogTableVisible1: false,
                dialogTableVisible2: false,
                dialogTableVisible3: false,
                dialogTableVisible4: false,
                form:{
                    options: [{
                        value: 'user',
                        label: '用户表格'
                    }, {
                        value: 'order',
                        label: '订单表格'
                    }, {
                        value: 'commodity',
                        label: '商品表格'
                    }],
                    input:''
                },
                isshow:'user',
                userData: [],
                orderData: [],
                productData: [],
                admform:{
                    admuser:'',
                    admpsw: '',
                    adminId: ''
                },
                userForm:{
                    userId:0,
                    nickname:'',
                    name:'',
                    password:0,
                    sex:'男'
                },
                orderForm:{
                    orderId:'',
                    orderStatus: 1,
                    nickName:'',
                    createTime:'',
                    owner:'',
                    consign: '',
                    consignPhone: '',
                    consignAddress: '',
                    orderNumber: '',
                    payArr: [],
                    productList: [
                        {
                            productPicture: "",
                            productName: "Redmi",
                            productColor: "K30",
                            productMount: 2150,
                            productNumber: 1
                        }
                    ]
                },
                productForm:{
                    proId:'',
                    proType:'',
                    name:'',
                    originalPrice: 0,
                    currentPrice: 0,
                    redNote: '',
                    grayNote:'',
                    color:[],
                    conf:[],
                    meal:[]
                },
                confarr: [],
                colorarr: [],
                mealarr: [],
                userImg: ''
            }
        },
        created(){
            this.admform.admuser = this.$route.query.name
            this.$axios.get('http://mimall.natapp1.cc/admin/selectByName',{
                params:{
                    name: this.admform.admuser
                }
            }).then(res => {
                this.admform.admuser = res.data.name;
                this.admform.admpsw = res.data.passWord;
                this.admform.adminId = res.data.adminId;
                this.logoImg = res.data.avatar ? `http://mimall.natapp1.cc/picture/${res.data.avatar}` : `http://mimall.natapp1.cc/picture/user.jpg`;
                console.log(res);
            }).catch(res => {
                console.log(res);
            })
        },
        components:{
            "order":{
                template:`
                    <div class="smallbox">
                        <el-form-item label="所属人" :label-width="formLabelWidth">
                        <el-input v-model="person" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item label="收货人" :label-width="formLabelWidth">
                        <el-input v-model="rcvr" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item label="订单号" :label-width="formLabelWidth">
                        <el-input v-model="orderNum" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item :label-width="formLabelWidth">
                            <el-button type="primary" @click="getValue">查询</el-button>
                        </el-form-item>
                    </div>
                `,
                data(){
                    return{
                    formLabelWidth: '120px',
                    person:'',
                    rcvr:'',
                    orderNum:''
                    }
                },
                methods:{
                    getValue (){
                    // console.log(this.username);
                    this.$emit('getChildVal',this.person,this.rcvr,this.orderNum);
                    }
                }
            },
            "commodity":{
                template:`
                    <div class="smallbox"> 
                        <el-form-item label="商品类型" :label-width="formLabelWidth">
                        <el-select v-model="selected" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item label="商品名称" :label-width="formLabelWidth">
                        <el-input v-model="odrName" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item :label-width="formLabelWidth">
                            <el-button type="primary" @click="getValue">查询</el-button>
                        </el-form-item>
                    </div>
                `,
                data(){
                    return{
                    formLabelWidth: '120px',
                    odrName:'',
                    selected: 'shouji',
                    options :[{
                        value: 'shouji',
                        label: '手机'
                    },{
                        value: 'jiadian',
                        label: '家电'
                    },{
                        value: 'shouhuan',
                        label: '手环'
                    }],
                    
                    }
                },
                methods:{
                    getValue (){
                    // console.log(this.username);
                        this.$emit('getChildVal',this.selected,this.odrName);
                    }
                    
                }
            },
            "user":{
                template:`
                <div class="smallbox">
                    <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="username" placeholder="请输入内容" ></el-input>
                    </el-form-item>
                    <el-form-item label="用户昵称" :label-width="formLabelWidth">
                    <el-input v-model="nickname" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item :label-width="formLabelWidth">
                        <el-button type="primary" @click="getValue">查询</el-button>
                    </el-form-item>
                </div>
                `,
                data(){
                    return{
                    formLabelWidth: '120px',
                    username:'',
                    nickname:''
                    }
                },
                methods:{
                    getValue (){
                    // console.log(this.username);
                    this.$emit('getChildVal',this.username,this.nickname);
                    }
                }
            }
        },
        methods:{
          // 控制左侧菜单
            changeMenu(){
                this.value = !this.value;
            },
            selectedCag(vId){
                this.isshow = vId;
            },
            handleChildCal (...payload){
                console.log(payload);

                switch (this.isshow) {
                case "commodity":
                    let [proType,proName] = payload;
                    console.log(proType, proName)
                    this.$axios('http://mimall.natapp1.cc/product/selectAll',{
                    params:{
                        proType,
                        proName
                    }
                    }).then(res => {
                    console.log(res);
                    if(res.status == 200){
                        this.dialogTableVisible3 = true;
                        this.productData = res.data;
                    }
                    }).catch(res => {
                    console.log(res);
                    })
                    break;
                case "order":
                    
                    let [owner, consign, orderNumber] = payload; 

                    this.$axios('http://mimall.natapp1.cc/order/selectAll',{
                    params:{
                        owner,
                        consign,
                        orderNumber
                    }
                    }).then(res => {
                        console.log(res);
                        if(res.status == 200){
                            this.dialogTableVisible2 = true;
                            this.orderData = res.data;
                            
                        }
                    }).catch(res =>{
                    console.log(res);
                    })
                break;
                default:
                    let [userName, nickName] = payload;
                    console.log(payload);
                    this.$axios('http://mimall.natapp1.cc/user/selectAllUser',{
                    params:{
                        userName,
                        nickName
                    }
                    }).then(res => {
                    console.log(res);
                    if(res.status == 200){
                        this.dialogTableVisible1 = true;
                        this.userData = res.data;
                        console.log(this.userData);
                        
                    }
                    }).catch(res => {
                    console.log(res);
                    })
                    break;
                }
            },
            exportExcel (){
                console.log(this.selected1);
                let sheet = '';
                switch (this.selected1) {
                    case 'order':
                        sheet = '订单表';
                        break;
                    case 'commodity':
                        sheet = '商品表';
                        break;
                    default:
                        sheet = '用户表';
                        break;
                }
                
                this.$axios({
                    url:'http://mimall.natapp1.cc/exportExcel',
                    params:{
                        sheet
                    },
                    responseType: 'blob'
                }).then(res => {
                    console.log(res);
                    
                    let fileName = res.config.params.sheet;
                    let link = document.createElement("a");
                    link.href = window.URL.createObjectURL(new Blob([res.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"}));
                    link.target = "_blank";
                    link.download = fileName;
                    document.body.appendChild(link); 
                    link.click();
                    document.body.removeChild(link);
                }).catch(res => {
                    console.log(res);
                })
            },
            handleAdminMsg(){
                console.log(this.admform);
                this.dialogTableVisible4 = true;
                
            },
            deladmin() {
                this.logoImg = this.checkImgUrl;    
                console.log(this.logoImg);
                console.log(this.admform.admuser);
                console.log(this.admform.admpsw);
                this.$axios.get('http://mimall.natapp1.cc/admin/update',{
                    params:{
                        name: this.admform.admuser,
                        passWord: this.admform.admpsw,
                        adminId: this.admform.adminId,
                        avatar: this.userImg
                    }
                }).then(res => {
                    console.log(res);
                    if(res.data == 1){
                        
                        this.dialogTableVisible4 = false;
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                        this.$route.query.name = this.admform.admuser
                    }else{
                        this.$message({
                            type: 'warning',
                            message: '修改失败!'
                        });
                    }
                }).catch(res => {
                    console.log(res);
                })
            },
            handleAvatarSuccess(res, file,filesList) {
                console.log(res);
                
                this.imageUrl = URL.createObjectURL(file.raw);
                let url = `http://mimall.natapp1.cc/picture/${res}`;
                this.checkImgUrl = url;
                this.userImg = res;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                // const isLt8M = file.size / 1024 / 1024 < 8;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                // if (!isLt8M) {
                // this.$message.error('上传头像图片大小不能超过 8MB!');
                // }
                return isJPG ;
            },
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
            delUserMsg(data) {
            
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
            getOrderMsg(orderId) {
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
            delOrderMsg(data) {
            
                let [orderId, index] = [data.row.orderId, data.$index];

                this.$confirm('确定删除此用户?', '提示', {
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
            getProductMsg(proId){
                console.log(proId);
                this.$axios.get('http://mimall.natapp1.cc/product/selectByPrimaryKey',{
                    params: {
                        proId
                    }
                }).then(res => {
                console.log(res);
                    let [conf, color, meal] = [res.data.conf, res.data.color, res.data.meal];
                
                    let [configars, colors, meals] = [[],[],[]];

                    this.dialogFormVisible = true;
                    // this.value = res.data.proID;
                    this.form.proId = res.data.proId;
                    this.form.name = res.data.name;
                    this.form.originalPrice = res.data.originalPrice;
                    this.form.currentPrice = res.data.currentPrice;
                    this.form.redNote = res.data.redNote;
                    this.form.grayNote = res.data.grayNote;
                    this.form.proType = res.data.proType;
                    

                    switch (res.data.proType) {
                        case 'shouhuan':
                            this.value = 2;
                            break;
                        case 'jiadian':
                            this.value = 3;
                            break;
                        default:
                            this.value = 1;
                            break;
                    }
                    
                    for (let i = 0; i < conf.length; i++) {
                        configars.push(conf[i].conf)
                    }

                    for (let i = 0; i < color.length; i++) {
                        colors.push(color[i].color)
                    }

                    for (let i = 0; i < meal.length; i++) {
                        meals.push(meal[i].meal)
                    }

                    this.colorarr = [];
                    this.confarr = [];
                    this.mealarr = [];
                    this.form.color = [];
                    this.form.conf = [];
                    this.form.meal = [];

                    this.colorarr = Array.from(colors);
                    this.confarr = Array.from(configars);
                    this.mealarr = Array.from(meals);
                    
                    
                    for (let i = 0; i < this.colorarr.length; i++) {
                        let obj= {};
                        obj['color'] = this.colorarr[i];
                        this.form.color.push(obj);
                    }

                    for (let i = 0; i < this.confarr.length; i++) {
                        let obj= {};
                        obj['conf'] = this.confarr[i];
                        this.form.conf.push(obj);
                    }

                    for (let i = 0; i < this.mealarr.length; i++) {
                        let obj= {};
                        obj['meal'] = this.mealarr[i];
                        this.form.meal.push(obj);
                    }
                    console.log(this.form);

                }).catch(res => {
                console.log(res);
                })
            },
            delProductMsg (data) {
                let index = data.$index;
                let productid = data.row.proID
                console.log(productid);
                this.$confirm('确定删除此用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                this.$axios('http://mimall.natapp1.cc/product/deleteProduct',{
                    params:{
                        productId: productid
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
            drpOut() {
                // console.log()
                this.$router.push('/');
            }
        },
        watch:{
            value:function(newValue,oldValue){
                this.value = newValue;
                this.$emit("changeMenu",this.value)
            }
        },
        filters:{
            dataFormat: function(data){
                let d = new Date(data);
                let str = '';
                let [day, month, year] = [d.getDate(), parseInt(d.getMonth())+1, d.getFullYear()]
                str = year + '年' + month + '月' + day + '日';
                return str;
            },
            pswFormat: function(data){
                return '******';
            },
            protypeFm:function(data){
                switch (data) {
                    case 'jiadian':
                        return '家电';
                        break;
                    case 'shouhuan':
                        return '手环';
                        break;
                    default:
                        return '手机';
                        break;
                }
            }
    },
  }
</script>
<style scoped>
  .header{
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .inputSearch{
    width: 100%;
  }
  .userLogo img{
    width: 40px;
    height: 40px;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
    margin-right: 5px;
  }
  .userLogo{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 20px;
  }
  .userMessage{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .userMessage span{
    margin: 10px;
    cursor: pointer;
    color: #fff;
    font-size: 15px;
  }
  .userMessage span:hover{
    color: #125b70;
  }

  .lange{
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    background: #fff;
    border-radius: 50%;
    margin: 0 10px;
  }
  .lange:hover{
    background: #f3f3f3;
  }


  .userSel{
    line-height: 30px;
  }
  .userSel div{
    cursor: pointer;
    color: #8d9a9c;
  }
  .userSel div:hover{
    color: #125b70;
  }

  @media screen and (max-width: 900px){
    .inputBox{
      display: none;
    }
    .spanBox{
      display: none;
    }
  }
  
  .el-button--info{
    color: #909399;
    background-color: #fff;
    border-color: #fff;
  }
  .smallbox{
    padding-right: 20%;
  }
  .excelSend{
      outline: none;
  }

   .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    border: solid 1px #ccc;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    line-height: 70px;
    text-align: center;
  }
  .avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: block;
  }
</style>
