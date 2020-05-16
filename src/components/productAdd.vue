<template>
    <div class="animated bounceInRight ">
        <el-form ref="form" :model="form" label-width="80px" class="mybox">
            <el-form-item label="商品分类">
                <el-select v-model="form.proType" placeholder="请选择商品分类">
                <el-option label="手机" value="手机"></el-option>
                <el-option label="手环" value="手环"></el-option>
                <el-option label="家电" value="家电"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品名字">
                <el-input v-model="form.name" class="inputbox"></el-input>
            </el-form-item>
            <el-form-item label="商品照片">
                <el-upload
                    ref="upload"
                    action="http://mimall.natapp1.cc/product/upload"
                    :accept="'image/*'"
                    list-type="picture-card"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :before-upload="beforeUpload"
                    :auto-upload="true">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                    <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                    >
                    <span class="el-upload-list__item-actions">
                        <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                        >
                        <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file)"
                        >
                        <i class="el-icon-download"></i>
                        </span>
                        <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                        >
                        <i class="el-icon-delete"></i>
                        </span>
                    </span>
                    </div>
                </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            </el-form-item>
            <el-form-item label="商品原价">
                <el-input-number v-model="form.originalPrice" :min="1" size="mini" :max="10000" label="原价"></el-input-number>&nbsp;&nbsp;元
            </el-form-item>
            <el-form-item label="商品现价">
                <el-input-number v-model="form.currentPrice" :min="1" size="mini" :max="10000" label="现价"></el-input-number>&nbsp;&nbsp;元
            </el-form-item>
            <el-form-item label="商品库存">
                <el-input-number v-model="form.totality" :min="1" size="mini" :max="10000" label="库存"></el-input-number>&nbsp;&nbsp;件
            </el-form-item>
            <el-form-item label="商品描述">
                <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="form.redNote"
                    class="textareabox">
                </el-input>
            </el-form-item>
            <el-form-item label="商品配置">
                <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="form.grayNote"
                    class="textareabox">
                </el-input>
            </el-form-item>
            <el-form-item label="商品版本">
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
          <el-form-item label="商品颜色">
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
            <el-form-item label="商品套餐">
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
          
            <el-form-item>
                <el-button type="primary" @click="submitForm()">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import $ from 'jquery';
  export default {
    data() {
      return {
        form: {
            name: '',
            proType: '',
            originalPrice: 0,
            currentPrice: 0,
            totality: 0,
            redNote: '',
            grayNote: '',
            conf:[],
            color:[],
            meal:[],
            picture1:'',
            picture2:'',
            picture3:''
        },
        fileList:[],
        picarr:[],
        confarr: [],
        colorarr: [],
        mealarr: [],
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false
      }
    },
    methods: {
       submitForm() {

        this.form.picture1 = this.picarr[0].response;
        this.form.picture2 = this.picarr[1].response;
        this.form.picture3 = this.picarr[2].response;
        let configer = this.confarr;
        let color = this.colorarr;
        let meal = this.mealarr;

        let chooseconf = [];
        let choosecolor = [];
        let choosemeal = [];
        
        for (let i = 0; i < configer.length; i++) {
          chooseconf[i] = {};
          for (let j = 0; j < chooseconf.length; j++) {
            let key = 'conf';
            let val = configer[i];
            chooseconf[i][key] = val;
            
          }
          
        }

        for (let i = 0; i < color.length; i++) {
          choosecolor[i] = {};
          for (let j = 0; j < choosecolor.length; j++) {
            let key = 'color';
            let val = color[i];
            choosecolor[i][key] = val;
            
          }
          
        }

        for (let i = 0; i < meal.length; i++) {
          choosemeal[i] = {};
          for (let j = 0; j < choosemeal.length; j++) {
            let key = 'meal';
            let val = meal[i];
            choosemeal[i][key] = val;
            
          }
          
        }

        this.form.conf = chooseconf;
        this.form.color = choosecolor;
        this.form.meal = choosemeal;
       
        $.ajax({
          type: "post",
          url: "http://mimall.natapp1.cc/product/insertProduct",
          data: JSON.stringify(this.form),
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          success: res => {
            console.log(res);
            if(res == 1){
                this.$message({
                    message: '创建成功',
                    type: 'success'
                });
                this.form.proType = '';
                this.form.name = '';
                this.form.originalPrice = 0;
                this.form.currentPrice = 0;
                this.form.totality = 0;
                this.form.redNote = '';
                this.form.grayNote = '';
                this.confarr = [];
                this.colorarr = [];
                this.mealarr = [];
                this.$refs.upload.clearFiles();
            }else{
                this.$message.error('创建失败');
            }
          }
        });
      },
      handleRemove(file, fileList) {
        let picArr = this.picarr;
        
        
        this.$axios.get('http://mimall.natapp1.cc/product/deleteFile',{
            params:{
                fileName: file.response
            }
        }).then(res => {
            console.log(res);
            if(res.data){
                for (let i = 0; i < picArr.length; i++) {
                    if(picArr[i].uid == file.uid){
                        picArr.splice(i,1);
                    }
                    
                    
                }
            }
        }).catch(res => {
            console.log(res);
        })
        
      },
      beforeUpload(file){
          console.log('上传之前的文件:'+file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      },
      handleSuccess(response, file, fileList){
        console.log(response);
        console.log(fileList);
        this.picarr = fileList;
        console.log(this.picarr);
      },
      handleError(err){
        console.log(err);
      }
    }
  }
</script>
<style scoped>
.el-form-item{
  width: 700px;
}
.el-form{
  background-color: #fff;
  margin: 0 6px;
  padding: 20px 0;
}
.inputbox{
    width:32%
}
.textareabox{
    width: 60%;
}
</style>