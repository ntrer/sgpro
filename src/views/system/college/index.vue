<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="功能名称" prop="name">
        <el-input
        style="width: 160px;"
          v-model="queryParams.name"
          placeholder="请输入功能名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:college:add']"
        >新增</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table  border v-loading="loading" :data="organizationList" @selection-change="handleSelectionChange">
      <el-table-column label="功能名称" align="center" prop="name" width="240"/>
      <el-table-column label="功能主图" align="center" width="240">
        <template slot-scope="scope">
          <el-image
              style="height: 60px"
               fit="contain"
              :src="scope.row.imgUrlFull"
              >
            </el-image>
        </template>

      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="240">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{yy}-{mm}-{dd} {hh}:{mm}:{ss}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basicManage:organization:edit']"
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:college:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改组织对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">


        <el-form-item label="功能名称" prop="name" style="margin-top: 20rpx;">
          <el-input v-model="form.name" placeholder="请输入"  style="width: 200px"/>
        </el-form-item>

         <el-form-item label="功能主图" prop="pictureListStr">
           <imgUpload ref="imageupload"  v-model="imgList" :limit="1"></imgUpload>
         </el-form-item>

        <el-form-item label="上传图片" prop="pictureListStr">
          <imgUpload ref="imageupload2"  v-model="imgList2" :limit="9" :isSingle="false"></imgUpload>
        </el-form-item>


        <el-form-item label="添加视频" prop="textListStr">
          <el-button size="small" type="primary" @click="addItem">新增视频</el-button>
        </el-form-item>

         <el-form-item label="视频" prop="data" v-for="(item,index) in VideoList" :key="index">

           <div id="">
              <div id="" style="display: flex;align-items: center; justify-content: space-between;">
                <el-form-item label="视频类型" prop="videoType">
                  <el-select v-model="item.videoType" placeholder="请选择" clearable style="width: 200px">
                    <el-option v-for="(item1, index) in TypeList" :key="item1.dictValue" :label="item1.dictLabel" :value="item1.dictValue"/>
                  </el-select>
                </el-form-item>

                <i class="el-icon-delete" style="margin-left: 50rpx;" @click="deleteItem(item,index)"></i>

              </div>


              <el-form-item label="上传封面图" prop="videoThumbnail">
                <imgUpload ref="imageupload3"  v-model="imgList3" :limit="1" ></imgUpload>
              </el-form-item>



              <div id="" style="margin-top: 20rpx;">
                <el-form-item label="上传视频" prop="videoListStr" >
                   <el-upload
                     class="upload-demo"
                     :action="uploadUrl"
                     :on-success="handleSuccess"
                     accept=".mp4"
                     :limit="1"
                     :file-list="videoList">
                     <el-button size="small" type="primary">点击上传</el-button>
                   </el-upload>
                  </el-form-item>

              </div>



              <div id="">
                <el-form-item label="视频文字" prop="videoText" style="margin-top: 20rpx;">
                  <el-input v-model="item.videoText" placeholder="请输入"  style="width: 200px"/>
                </el-form-item>
              </div>




           </div>





         </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {updatecollege,getcollege,delcollege,addcollege,listcollege} from "@/api/system/college";
import imgUpload from '@/components/imgUpload'
export default {
  name: "Organization",
  components: {
    imgUpload
  },
  data() {
    return {
      uploadUrl:this.UPLOADURL.BaseUrl+"/common/upload?type=10",
      isEdit:false,
      enableTypeList:[
        {
           "dictLabel": "正常",
           "dictValue": 1
         }, {
           "dictLabel": "停用",
           "dictValue": -1
         },
      ],
      imgList: [],
      imgList2:[],
      imgList3:[],


      VideoList:[],
      videoList:[],
      tempVideoList:[],


      TypeList:[
        {
           "dictLabel": "横版",
           "dictValue": 1
         }, {
           "dictLabel": "竖版",
           "dictValue": 2
         },
      ],


      organizationTypeList:[{
         "dictLabel": "商场",
         "dictValue": 1
       }, {
         "dictLabel": "联盟",
         "dictValue": 2
       },
       {
         "dictLabel": "第三方",
         "dictValue": 3
       },
       {
         "dictLabel": "经销商",
         "dictValue": 4
       }
      ],



      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 组织表格数据
      organizationList: [],
      ShopPayInfoList:[],
      appPayInfoList:[],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        shopPayInfoId: [
          { required: true, message: "公众号不能为空", trigger: "blur" }
        ],
        organizationName: [
          { required: true, message: "组织名称不能为空", trigger: "blur" }
        ],
        areaId: [
          { required: true, message: "省市区不能为空", trigger: "blur" }
        ],
        address: [
          { required: true, message: "地址不能为空", trigger: "blur" }
        ],
        phone: [
          { required: true,
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur" }
        ],
        organizationType: [
          { required: true, message: "小程序商户不能为空", trigger: "change" }
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {



    handleSuccess(file, fileList){
      console.log(file)
      this.tempVideoList.push(fileList.response.fileName)
      console.log(this.tempVideoList)
      this.VideoList[this.VideoList.length-1].fileUrl=fileList.response.fileName
    },


    addItem(){

     if(this.VideoList.length<10){
       this.VideoList.push({
               id:"",
               fileUrl: '',
               videoType: '',
               videoText:'',
               videoThumbnail:''
             })
     }


    },


    deleteItem(item, index) {
          console.log(index)
          this.VideoList.splice(index, 1)
        },



    enableTypeFormat(row,column){
      return this.selectDictLabel(this.enableTypeList, row.enable);
    },

    // 字典状态字典翻译
    organizationTypeFormat(row, column) {
      return this.selectDictLabel(this.organizationTypeList, row.organizationType);
    },


    locationsChange2(value) {
       console.log(value)
       console.log(this.$refs['cascaderAddr'])
      this.form.provinceId=value[0];
      this.form.cityId=value[1];
       this.form.areaId=value[2]

     },

     getlistShopPayInfo(){
       listShopPayInfo().then(response => {
         this.ShopPayInfoList = response.data;
       });
     },

     getlistappPayInfo(){
       listAppPayInfoId().then(response => {
         this.appPayInfoList = response.data;
       });
     },


    /** 查询组织列表 */
    getList() {
      this.loading = true;
      listcollege(this.queryParams).then(response => {
        this.organizationList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.imgList=[];
      this.imgList2=[];
      this.imgList3=[];
      this.VideoList=[]
      this.form = {
        id: null,
        name:null,
        imgUrlFull:null,
        imgList:null,
        videoList:null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.isEdit=false;
      this.title = "添加";
      this.$nextTick(() => {
        this.$refs.imageupload.syncElUpload();
      })
      this.$nextTick(() => {
        this.$refs.imageupload2.syncElUpload();
      })
      this.$nextTick(() => {
        this.$refs.imageupload3.syncElUpload();
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.isEdit=true;
      const id = row.id || this.ids
      getcollege(id).then(response => {
        this.form = response.data;
        let data = {
            url: response.data.imgUrlFull,
            relative_url: response.data.imgUrl
          }
        this.imgList.push(data)





        for (var i = 0; i < response.data.imgList.length; i++) {
          let data2 = {
              id:  response.data.imgList[i].id,
              url: response.data.imgList[i].fileUrlFull,
              relative_url: response.data.imgList[i].fileUrl
            }
          this.imgList2.push(data2)
        }

        for (var i = 0; i < response.data.videoList.length; i++) {
          let data4 = {
              url: response.data.videoList[i].videoThumbnailFull,
              relative_url: response.data.videoList[i].videoThumbnailFull
            }
          this.imgList3.push(data4)
        }
        


        for (var i = 0; i < response.data.videoList.length; i++) {
            let data3={
              id:response.data.videoList[i].id,
              fileUrl: response.data.videoList[i].fileUrl,
              videoType: response.data.videoList[i].videoType,
              videoText:response.data.videoList[i].videoText,
              videoThumbnail:response.data.videoList[i].videoThumbnail
            }
            this.VideoList.push(data3)

        }




        this.open = true;
        this.title = "修改";
      });
    },




    /** 提交按钮 */
    submitForm() {

      console.log(this.imgList2)
      console.log(this.VideoList)
      console.log(this.tempVideoList)

      if(this.imgList.length!=0){
       this.form.imgUrl= this.imgList[0].relative_url
      }
      else{
        this.form.imgUrl= ''
      }

      let tempImg=[]
      for (var i = 0; i < this.imgList2.length; i++) {
        let imgData={
          fileUrl:this.imgList2[i].relative_url
        }
        tempImg.push(imgData)
      }

      // if(this.tempVideoList.length!=0){
      //   let tempVideo=[]
      //   for (var i = 0; i < this.tempVideoList.length; i++) {
      //       let videoData={
      //         id:null,
      //         fileUrl:this.tempVideoList[i],
      //         videoType:this.VideoList[i].videoType,
      //         videoText:this.VideoList[i].videoText
      //       }
      //       this.VideoList.push(videoData)

      //   }
      //   this.form.videoList=this.VideoList

      // }
      // else{
      //   this.form.videoList=this.VideoList
      // }

     for (var i = 0; i < this.imgList3.length; i++) {
        this.VideoList[i].videoThumbnail=this.imgList3[i].relative_url
     }




       this.form.videoList=this.VideoList
       this.form.imgList=tempImg

      console.log(this.form)


      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatecollege(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addcollege(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delcollege(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有组织数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportOrganization(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
<style scoped>

  .require/deep/.el-form-item__label::before{
    content: "*";
    color: #ff4949;
    margin-right: 4px;
  }
</style>
