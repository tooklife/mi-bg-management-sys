<template>
  <div class="animated bounceInRight">
    <el-table :data="tableData" class="tableBox">
      
      <el-table-column label="商品分类" align="center">
          <template slot-scope="scope">
              <div>
                  {{scope.row.proType | protypeFm}}
              </div>
          </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
      
      <el-table-column prop="originalPrice" label="商品原价" align="center"></el-table-column>
      <el-table-column prop="currentPrice" label="商品现价" align="center"></el-table-column>
      
      
      <el-table-column label="操作" fixed="right" width="110" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-view" circle @click="getProductMsg(scope.row.proId)"></el-button>
            
          <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="delProductMsg(scope)"></el-button>
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

    <el-dialog title="信息编辑" :visible.sync="dialogFormVisible" :append-to-body="true" width="60%">
        <el-form :model="form">
          <el-form-item label="商品分类" :label-width="formLabelWidth">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名字" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" class="inputbox"></el-input>
          </el-form-item>
          <el-form-item label="商品照片" :label-width="formLabelWidth">
              <img :src="form.picture1" alt="" class="productImg">
              <img :src="form.picture2" alt="" class="productImg">
              <img :src="form.picture3" alt="" class="productImg">
          </el-form-item>
          <el-form-item label="商品原价" :label-width="formLabelWidth">
            <el-input-number v-model="form.originalPrice" size="mini" :min="1" :max="10000" label="商品原价" ></el-input-number>&nbsp;&nbsp;元
          </el-form-item>
          <el-form-item label="商品现价" :label-width="formLabelWidth">
            <el-input-number v-model="form.currentPrice" size="mini" :min="1" :max="10000" label="商品现价"></el-input-number>&nbsp;&nbsp;元
          </el-form-item>
          <el-form-item label="商品描述" :label-width="formLabelWidth">
            <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="form.redNote"
                class="textbox">
            </el-input>
          </el-form-item>
          <el-form-item label="商品配置" :label-width="formLabelWidth">
            <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="form.grayNote"
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
          <el-button type="primary" @click="modify">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
  import userData from "../assets/js/user";
    export default {
        name: "productBasicInfo",
        data(){
            return{
                tableData:[],
                value: 0,
                dialogFormVisible: false,
                option: [{
                    value: 1,
                    label: '手机'
                    }, {
                    value: 2,
                    label: '手环'
                    }, {
                    value: 3,
                    label: '家电'
                }],
                form:{
                    proId:'',
                    proType:'',
                    name:'',
                    originalPrice: 0,
                    currentPrice: 0,
                    redNote: '',
                    grayNote:'',
                    color:[],
                    conf:[],
                    meal:[],
                    picture1: '',
                    picture2: '',
                    picture3: ''
                },
                confarr: [],
                colorarr: [],
                mealarr: [],
                formLabelWidth: '120px',
                pagesize: 10,
                currentpage: 1,
                start: 1,
                page: 0
            }
        },
        created() {
            // this.tableData = userData.data;
            this.$axios.get('http://mimall.natapp1.cc/product/selectTotalCount').then(res => {
              
              this.page = res.data;
            }).catch(res => {
              console.log(res);
            })

            console.log(this.start,this.pagesize);

            this.$axios.get('http://mimall.natapp1.cc/product/selectAll',{
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
        mounted() {
          
        },
        methods:{
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
                    this.form.proId = res.data.proId;
                    this.form.name = res.data.name;
                    this.form.originalPrice = res.data.originalPrice;
                    this.form.currentPrice = res.data.currentPrice;
                    this.form.redNote = res.data.redNote;
                    this.form.grayNote = res.data.grayNote;
                    this.form.proType = res.data.proType;
                    this.form.picture1 = `http://mimall.natapp1.cc/picture/${res.data.picture1}`;
                    this.form.picture2 = `http://mimall.natapp1.cc/picture/${res.data.picture2}`;
                    this.form.picture3 = `http://mimall.natapp1.cc/picture/${res.data.picture3}`;

                    switch (res.data.proType) {
                        case '手环':
                            this.value = 2;
                            break;
                        case '家电':
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
                console.log(data);
                let index = data.$index;
                let proId = data.row.proId;
                // let num = index - 1;
                // console.log(num);
                console.log(this.tableData[index]);
                let picture1 = this.tableData[index].picture1;
                let picture2 = this.tableData[index].picture2;
                let picture3 = this.tableData[index].picture3;
                this.$confirm('确定删除此商品?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                this.$axios('http://mimall.natapp1.cc/product/deleteProduct',{
                    params:{
                        proId,
                        picture1,
                        picture2,
                        picture3
                    }
                }).then(res => {
                    console.log(res);
                    if(res.data == 1){
                        this.tableData.splice(index, 1);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.dialogFormVisible = false;
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
            handleCurrentChange (page) {
                
                this.$axios.get('http://mimall.natapp1.cc/product/selectAll',{
                params:{
                    start: page,
                    number: this.pagesize
                }
                }).then(res => {
                    console.log(res);
                    console.log(res.data[0].picture1);
                    this.tableData = res.data;
                }).catch(res => {
                    console.log(res);
                })
                
            },
            modify() {
                console.log(this.form);
                $.ajax({
                    type: "post",
                    url: "http://mimall.natapp1.cc/product/updateProduct",
                    data: JSON.stringify(this.form),
                    contentType: "application/json",
                    dataType: "json",
                    success:  res => {
                        
                        console.log(res);
                        if(res == 1){
                            this.$message({
                                type: 'success',
                                message: '商品修改成功!'
                            });
                            this.dialogFormVisible = false;
                            this.$axios.get('http://mimall.natapp1.cc/product/selectAll',{
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
                        }else{
                            this.$message({
                                type: 'warning',
                                message: '商品修改失败!'
                            });
                        }
                    }
                });
            }
        },
        filters:{
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
      width: 200px;
  }
  .textbox{
      width: 500px;
  }
  .dialog-footer{
      text-align: center;
  }
  .productImg{
      width: 140px;
      margin-right: 10px;
  }
</style>
