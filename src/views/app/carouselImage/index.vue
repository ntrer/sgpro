<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="50px">

      <el-form-item label="名称" prop="name">
        <el-input
        style="width: 160px;"
          v-model="queryParams.name"
          placeholder="请输入"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>


      <el-form-item label="类型" prop="type">
       <el-select v-model="queryParams.type" placeholder="请选择" clearable  style="width: 100%;">
         <el-option v-for="(item, index) in typeList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
       </el-select>
      </el-form-item>



     <el-form-item label="开始时间" prop="beginTime" label-width="100px">
       <el-date-picker clearable size="small"
       style="width: 190px;"
         v-model="queryParams.beginTime"
         type="datetime"
         format="yyyy-MM-dd HH:mm:ss"
         value-format="yyyy-MM-dd HH:mm:ss"
         placeholder="请选择">
       </el-date-picker>
     </el-form-item>
     <el-form-item label="结束时间" prop="endTime" label-width="100px">
       <el-date-picker clearable size="small"
       style="width: 190px;"
         v-model="queryParams.endTime"
         type="datetime"
         format="yyyy-MM-dd HH:mm:ss"
         value-format="yyyy-MM-dd HH:mm:ss"
         placeholder="请选择">
       </el-date-picker>
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
          v-hasPermi="['app:carouselImage:add']"
        >新增轮播图</el-button>

        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd2"
          v-hasPermi="['app:carouselImage:add']"
        >新增视频</el-button>


        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd3"
          v-hasPermi="['app:carouselImage:add']"
        >新增广告</el-button>


       <!-- <el-button
          type="primary"
          plain
          icon="el-icon-edit"
          size="mini"
          @click="handleAdd4"
          v-hasPermi="['basicManage:seckill:mainimg']"
        >设置内部秒杀主图</el-button>

        <el-button
          type="primary"
          plain
          icon="el-icon-edit"
          size="mini"
          @click="handleAdd5"
          v-hasPermi="['basicManage:seckill:mainimg']"
        >设置外部秒杀主图</el-button> -->


        <!-- <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd6(1)"
            v-hasPermi="['app:carouselImage:query']"
        >广告插图1</el-button>

        <el-button
           type="primary"
           plain
           icon="el-icon-plus"
           size="mini"
           @click="handleAdd6(2)"
           v-hasPermi="['app:carouselImage:query']"
        >广告插图2</el-button>

        <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd6(3)"
            v-hasPermi="['app:carouselImage:query']"
         >广告插图3</el-button> -->



      </el-col>









      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table border v-loading="loading" :data="carouselImageList" @selection-change="handleSelectionChange">
      <el-table-column label="名称" align="center" prop="name" width="180"/>
      <el-table-column label="类型" align="center" prop="del" :formatter="typeFormat"/>
      <el-table-column label="所属组织" align="center" prop="organizationName" width="180"/>
      <el-table-column label="排序" align="center" prop="sort" />
      <el-table-column label="图片" align="center" width="140">
        <template slot-scope="scope">
          <span v-if="scope.row.type==2">-</span>
          <el-image
              v-if="scope.row.type!=2"
              style="height: 60px"
               fit="contain"
              :src="scope.row.imgUrlFull"
              >
            </el-image>
        </template>

      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180"/>
      <el-table-column label="状态" align="center" prop="enable" :formatter="enableFormat"/>
      <!-- <el-table-column label="状态2" align="center" prop="del" :formatter="delFormat"/> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['app:carouselImage:edit']"
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['app:carouselImage:remove']"
          >停用</el-button>
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



   <el-dialog :title="title" :visible.sync="open3" width="500px" append-to-body>
     <el-form ref="form" :model="form" :rules="rules" label-width="100px">

     <el-form-item label="名称" prop="name" >
       <el-input v-model="form.name" placeholder="请输入" />
     </el-form-item>



     <!-- <el-form-item label="所属组织" prop="organizationId">
      <el-select v-model="form.organizationId" placeholder="请选择" clearable  style="width: 100%;">
        <el-option v-for="(item, index) in organizationInfoList" :key="item.orgId" :label="item.organizationName" :value="item.id"/>
      </el-select>
     </el-form-item> -->


     <el-form-item label="广告" prop="imgUrl" class="require">
      <imgUpload ref="imageupload" v-model="imgList" :limit="1" :isSingle="false"></imgUpload>
     </el-form-item>



     <el-form-item label="是否跳转链接" prop="isJump">
      <el-select v-model="form.isJump" placeholder="请选择" clearable  style="width: 100%;">
        <el-option v-for="(item, index) in isJumoList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
      </el-select>
     </el-form-item>


     <el-form-item label="跳转链接类型" prop="jumpUrlType" v-if="form.isJump==1">
      <el-select v-model="form.jumpUrlType" placeholder="请选择" clearable  style="width: 100%;">
        <el-option v-for="(item, index) in jumpUrlTypeList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
      </el-select>
     </el-form-item>

     <el-form-item label="活动链接" prop="bizId" v-if="form.isJump==1&&form.jumpUrlType==1">
      <el-select v-model="form.bizId" placeholder="请选择" clearable  style="width: 100%;">
        <el-option v-for="(item, index) in CarouselactivityList" :key="item.activityId" :label="item.activityName" :value="item.id"/>
      </el-select>
     </el-form-item>

     <el-form-item label="商品链接" prop="bizId" v-if="form.isJump==1&&form.jumpUrlType==2">
      <el-select v-model="selectGoods" placeholder="请选择" clearable  style="width: 100%;">
        <el-option v-for="(item, index) in CarouselactivityGoodsRelationList" :key="item.goodsId" :label="item.goodsName" :value="item.goodsId"/>
      </el-select>
     </el-form-item>


     <el-form-item v-if="form.isJump==1&&form.jumpUrlType==3" label="跳转链接" prop="url">
       <el-input v-model="form.url" placeholder="请输入" />
     </el-form-item>

     <el-form-item label="排序" prop="sort">
       <el-input v-model="form.sort" placeholder="请输入排序" />
     </el-form-item>




     </el-form>
     <div slot="footer" class="dialog-footer">
       <el-button type="primary" @click="submitForm">确 定</el-button>
       <el-button @click="cancel">取 消</el-button>
     </div>
   </el-dialog>





   <el-dialog :title="title" :visible.sync="open2" width="500px" append-to-body>
     <el-form ref="form" :model="form" :rules="rules" label-width="100px">

       <el-form-item label="名称" prop="name" >
         <el-input v-model="form.name" placeholder="请输入" />
       </el-form-item>


       <!-- <el-form-item label="所属组织" prop="organizationId">
        <el-select v-model="form.organizationId" placeholder="请选择" clearable  style="width: 100%;">
          <el-option v-for="(item, index) in organizationInfoList" :key="item.orgId" :label="item.organizationName" :value="item.id"/>
        </el-select>
       </el-form-item> -->

       <el-form-item label="视频" prop="imgUrl" >
        <el-upload
          class="upload-demo"
          :action="this.uploadUrl"
          :on-success="handleSuccess"
          accept=".mp4"
          :limit="1"
          :file-list="videoList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
       </el-form-item>


       <el-form-item label="排序" prop="sort">
         <el-input v-model="form.sort" placeholder="请输入排序" />
       </el-form-item>




     </el-form>
     <div slot="footer" class="dialog-footer">
       <el-button type="primary" @click="submitForm">确 定</el-button>
       <el-button @click="cancel">取 消</el-button>
     </div>
   </el-dialog>







    <!-- 添加或修改小程序轮播图对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">

        <el-form-item label="名称" prop="name" >
          <el-input v-model="form.name" placeholder="请输入" />
        </el-form-item>



        <!-- <el-form-item label="所属组织" prop="organizationId">
         <el-select v-model="form.organizationId" placeholder="请选择" clearable  style="width: 100%;">
           <el-option v-for="(item, index) in organizationInfoList" :key="item.orgId" :label="item.organizationName" :value="item.id"/>
         </el-select>
        </el-form-item> -->


        <el-form-item label="图片" prop="imgUrl" class="require">
         <imgUpload ref="imageupload" v-model="imgList" :limit="1" :isSingle="false"></imgUpload>
        </el-form-item>



        <el-form-item label="是否跳转链接" prop="isJump">
         <el-select v-model="form.isJump" placeholder="请选择" clearable  style="width: 100%;">
           <el-option v-for="(item, index) in isJumoList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
         </el-select>
        </el-form-item>


        <el-form-item label="跳转链接类型" prop="jumpUrlType" v-if="form.isJump==1">
         <el-select v-model="form.jumpUrlType" placeholder="请选择" clearable  style="width: 100%;">
           <el-option v-for="(item, index) in jumpUrlTypeList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
         </el-select>
        </el-form-item>

        <el-form-item label="活动链接" prop="bizId" v-if="form.isJump==1&&form.jumpUrlType==1">
         <el-select v-model="form.bizId" placeholder="请选择" clearable  style="width: 100%;">
           <el-option v-for="(item, index) in CarouselactivityList" :key="item.id" :label="item.activityName" :value="item.id"/>
         </el-select>
        </el-form-item>

        <el-form-item label="商品链接" prop="bizId" v-if="form.isJump==1&&form.jumpUrlType==2">
         <el-select v-model="selectGoods" placeholder="请选择" clearable  style="width: 100%;" @change="getchangeValue">
           <el-option v-for="(item, index) in CarouselactivityGoodsRelationList" :key="item.goodsId" :label="item.goodsName" :value="item.goodsId"/>
         </el-select>
        </el-form-item>


        <el-form-item v-if="form.isJump==1&&form.jumpUrlType==3" label="跳转链接" prop="url">
          <el-input v-model="form.url" placeholder="请输入" />
        </el-form-item>

        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" placeholder="请输入排序" />
        </el-form-item>




      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>




    <el-dialog title="设置内部秒杀主图" :visible.sync="open4" width="500px" append-to-body>
      <el-form ref="form" :model="form2"  label-width="100px">
        <el-form-item label="内部秒杀主图" prop="seckillMainImgUrl">
         <imgUpload ref="imageupload6" v-model="MainImgList" :limit="1"></imgUpload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitMainImgForm">确 定</el-button>
        <el-button @click="cancelMainImg">取 消</el-button>
      </div>
    </el-dialog>


    <el-dialog title="设置外部秒杀主图" :visible.sync="open5" width="500px" append-to-body>
      <el-form ref="form" :model="form3"  label-width="100px">
        <el-form-item label="外部秒杀主图" prop="seckillOutMainImgUrl">
         <imgUpload ref="imageupload7" v-model="MainImgList2" :limit="1"></imgUpload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitMainImgForm2">确 定</el-button>
        <el-button @click="cancelMainImg2">取 消</el-button>
      </div>
    </el-dialog>




    <el-dialog title="广告插图" :visible.sync="open6" width="500px" append-to-body>
      <el-form ref="form2" :model="form2" label-width="100px">

        <el-form-item label="名称" prop="name" >
          <el-input v-model="form2.name" placeholder="请输入" />
        </el-form-item>



        <!-- <el-form-item label="所属组织" prop="organizationId">
         <el-select v-model="form2.organizationId" placeholder="请选择" clearable  style="width: 100%;">
           <el-option v-for="(item, index) in organizationInfoList" :key="item.orgId" :label="item.organizationName" :value="item.id"/>
         </el-select>
        </el-form-item> -->


        <el-form-item label="图片" prop="imgUrl" class="require">
         <imgUpload ref="imageupload" v-model="imgList" :limit="1" :isSingle="false"></imgUpload>
        </el-form-item>



        <el-form-item label="是否跳转链接" prop="isJump">
         <el-select v-model="form2.isJump" placeholder="请选择" clearable  style="width: 100%;">
           <el-option v-for="(item, index) in isJumoList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
         </el-select>
        </el-form-item>


        <el-form-item label="跳转链接类型" prop="jumpUrlType" v-if="form2.isJump==1">
         <el-select v-model="form2.jumpUrlType" placeholder="请选择" clearable  style="width: 100%;">
           <el-option v-for="(item, index) in jumpUrlTypeList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
         </el-select>
        </el-form-item>

        <el-form-item label="活动链接" prop="bizId" v-if="form2.isJump==1&&form2.jumpUrlType==1">
         <el-select v-model="form2.bizId" placeholder="请选择" clearable  style="width: 100%;">
           <el-option v-for="(item, index) in CarouselactivityList" :key="item.id" :label="item.activityName" :value="item.id"/>
         </el-select>
        </el-form-item>

        <el-form-item label="商品链接" prop="bizId" v-if="form2.isJump==1&&form2.jumpUrlType==2">
         <el-select v-model="selectGoods" placeholder="请选择" clearable  style="width: 100%;" @change="getchangeValue">
           <el-option v-for="(item, index) in CarouselactivityGoodsRelationList" :key="item.goodsId" :label="item.goodsName" :value="item.goodsId"/>
         </el-select>
        </el-form-item>


        <el-form-item v-if="form2.isJump==1&&form2.jumpUrlType==3" label="跳转链接" prop="url">
          <el-input v-model="form2.url" placeholder="请输入" />
        </el-form-item>

        <el-form-item label="排序" prop="sort">
          <el-input v-model="form2.sort" placeholder="请输入排序" />
        </el-form-item>




      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm2">确 定</el-button>
        <el-button @click="cancel2">取 消</el-button>
      </div>
    </el-dialog>





  </div>



</template>

<script>
import {submitadverImage,listillustration,updatemainimg2,listmainimg,updatemainimg,getCarouselactivityGoodsRelationList2,getCarouselactivityList2,getCarouselactivityGoodsRelationList1,getCarouselactivityList1, listCarouselImage, getCarouselImage, delCarouselImage, addCarouselImage, updateCarouselImage, exportCarouselImage,listOrganizationInfo} from "@/api/app/carouselImage";

import imgUpload from '@/components/imgUpload'
export default {
  name: "CarouselImage",
  components: {
    imgUpload
  },
  data() {
    return {

     uploadUrl:this.UPLOADURL.BaseUrl+"/common/upload?type=10",
     videoList:[],
      typeList: [{
        "dictLabel": "轮播图",
        "dictValue": 1
      },
      {
        "dictLabel": "视频",
        "dictValue": 2
      },
      {
        "dictLabel": "广告",
        "dictValue": 3
      }
      ],

      enableStatus: [{
        "dictLabel": "可用",
        "dictValue": 1
      },
      {
        "dictLabel": "不可用",
        "dictValue": -1
      }
      ],

      delStatus: [{
        "dictLabel": "未删除",
        "dictValue": 1
      },
      {
        "dictLabel": "删除",
        "dictValue": -1
      }
      ],


      isJumoList: [{
        "dictLabel": "跳转",
        "dictValue": 1
      },
      {
        "dictLabel": "不跳转",
        "dictValue": -1
      }
      ],

      jumpUrlTypeList:[
        {
          "dictLabel": "活动链接",
          "dictValue": 1
        },
        {
          "dictLabel": "商品链接",
          "dictValue": 2
        },
        {
          "dictLabel": "外部链接",
          "dictValue": 3
        }
      ],


       open5:false,
       selectGoods:null,
       CarouselactivityList:[],
       CarouselactivityGoodsRelationList:[],
       imgList: [],
       MainImgList:[],
       MainImgList2:[],
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      organizationInfoList:[],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 小程序轮播图表格数据
      carouselImageList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      open2:false,
      open3:false,
      open4:false,
      open6:false,
      adverIllustrationTypes:null,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        organizationId: null,
        imgUrl: null,
        isJump: null,
        url: null,
        name:null,
        sort: null,
        type:null,
        beginTime:null,
        endTime:null,
        createId: null,
        createUserName: null,
        updateId: null,
        updateUserName: null,
        enable: null,
        del: null
      },
      // 表单参数
      form: {},
      form2:{},
      form3:{},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
    this.getlistOrganizationInfo();
  },
  methods: {



    handleAdd6(type){
      this.adverIllustrationTypes=type
      this.reset();
      this.imgList=[]
      this.$nextTick(() => {
        this.$refs.imageupload.syncElUpload();
      })

      let data={
        adverIllustrationType:type
      }
      listillustration(data).then(response => {
       this.open6 = true;
       this.form2.type=3
       this.form2=response.data
       this.listCarouselactivity()
       this.listCarouselactivityGoodsRelation()
        

        //  let data = {
        //      url: response.data.imgUrlFull,
        //      relative_url: response.data.imgUrl
        //    }
        //  this.imgList.push(data)

        // if(this.form2.jumpUrlType==2&&this.form2.isJump==1){
        //    this.selectGoods=this.form2.bizId.split(',')[1]
        // }


      });


    },


    /** 提交按钮 */
    submitForm2() {
     if(this.imgList.length!=0){
      this.form2.imgUrl= this.imgList[0].relative_url
     }
     else{
       this.form2.imgUrl= ''
     }

      if(this.form2.jumpUrlType==2&&this.form2.isJump==1){
        if(this.selectGoods==null){
           this.msgError("请选择商品")
           return
        }
        else{
          console.log(this.selectGoods)
          for (var i = 0; i < this.CarouselactivityGoodsRelationList.length; i++) {
            if(this.selectGoods==this.CarouselactivityGoodsRelationList[i].goodsId)
            this.form2.bizId=this.CarouselactivityGoodsRelationList[i].id+","+this.CarouselactivityGoodsRelationList[i].goodsId
          }

        }

      }

      this.form2.adverIllustrationType=this.adverIllustrationTypes

      console.log(this.form2)


      this.$refs["form2"].validate(valid => {
        if (valid) {
          submitadverImage(this.form2).then(response => {
            this.msgSuccess("操作成功");
            this.open6 = false;
            this.getList();
          });
        }
      });
    },


    cancel2() {
      this.open6 = false;
      this.reset();
    },





    getchangeValue(val){
      console.log(val)
    },


    handleSuccess(file, fileList){
      console.log(fileList)
      this.form.imgUrl=fileList.response.fileName
    },

    // 字典状态字典翻译
    enableFormat(row, column) {
      return this.selectDictLabel(this.enableStatus, row.enable);
    },

    // 字典状态字典翻译
    delFormat(row, column) {
      return this.selectDictLabel(this.delStatus, row.del);
    },

    typeFormat(row, column){
      return this.selectDictLabel(this.typeList, row.type);
    },


    /** 查询小程序轮播图列表 */
    getList() {
      this.loading = true;
      listCarouselImage(this.queryParams).then(response => {
        this.carouselImageList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.open2=false;
      this.open3=false;
      this.reset();
    },
    // 表单重置
    reset() {
        this.imgList=[];
        this.selectGoods=null
      this.form = {
        id: null,
        name:null,
        organizationId: null,
        imgUrl: null,
        isJump: null,
        url: null,
        sort: null,
        createId: null,
        createUserName: null,
        updateId: null,
        updateUserName: null,
        createTime: null,
        updateTime: null,
        enable: null,
        del: null
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


    getlistOrganizationInfo(){

      listOrganizationInfo().then(response => {
        this.organizationInfoList=response.data

      });
    },



    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.form.type=1
      this.title = "添加小程序轮播图";
      this.listCarouselactivity()
      this.listCarouselactivityGoodsRelation()
        this.$nextTick(() => {
          this.$refs.imageupload.syncElUpload();
        })
    },


    handleAdd2() {
      this.reset();
      this.open2 = true;
      this.form.type=2
      this.videoList=[]
      this.title = "添加小程序视频";
    },


    handleAdd3() {
      this.reset();
      this.open3 = true;
      this.form.type=3
      this.title = "添加小程序广告";
      this.listCarouselactivity()
      this.listCarouselactivityGoodsRelation()
        this.$nextTick(() => {
          this.$refs.imageupload.syncElUpload();
        })
    },





    listCarouselactivity(){
      getCarouselactivityList1().then(response => {
        this.CarouselactivityList=response.rows
      });
    },


    listCarouselactivityGoodsRelation(){
      getCarouselactivityGoodsRelationList1().then(response => {
        this.CarouselactivityGoodsRelationList=response.rows
      });
    },

    listCarouselactivity2(id){
      let data={
        id:id
      }
      getCarouselactivityList2(data).then(response => {
        this.CarouselactivityList=response.rows
      });
    },


    listCarouselactivityGoodsRelation2(id){
      let data={
        id:id
      }
      getCarouselactivityGoodsRelationList2(data).then(response => {
        this.CarouselactivityGoodsRelationList=response.rows
      });
    },





    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids

      this.listCarouselactivity()
      this.listCarouselactivityGoodsRelation()

      getCarouselImage(id).then(response => {
        this.form = response.data;
        let data = {
            url: response.data.imgUrlFull,
            relative_url: response.data.imgUrl
          }
        this.imgList.push(data)
        if(row.type==1){
           this.open = true;
        }
        else if(row.type==2){
           this.open2 = true;
        }
        else{
           this.open3 = true;
        }

        if(this.form.jumpUrlType==2&&this.form.isJump==1){
           this.selectGoods=this.form.bizId.split(',')[1]
        }





        this.title = "修改小程序轮播图";
      });
    },
    /** 提交按钮 */
    submitForm() {
      if(this.form.type==1||this.form.type==3){
        if(this.imgList.length!=0){
         this.form.imgUrl= this.imgList[0].relative_url
        }
        else{
          this.form.imgUrl= ''
        }
      }



      if(this.form.jumpUrlType==2&&this.form.isJump==1){
        if(this.selectGoods==null){
           this.msgError("请选择商品")
           return
        }
        else{
          console.log(this.selectGoods)
          for (var i = 0; i < this.CarouselactivityGoodsRelationList.length; i++) {
            if(this.selectGoods==this.CarouselactivityGoodsRelationList[i].goodsId)
            this.form.bizId=this.CarouselactivityGoodsRelationList[i].id+","+this.CarouselactivityGoodsRelationList[i].goodsId
          }

        }

      }



      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCarouselImage(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.open2 = false;
              this.open3 = false;
              this.getList();
            });
          } else {
            addCarouselImage(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.open2 = false;
              this.open3 = false;
              this.getList();
            });
          }
        }
      });
    },



    handleAdd4(){


      listmainimg().then(response => {
        this.open4 = true;
         this.MainImgList=[];
        let data = {
            url: response.rows[0].seckillMainImgUrlFull,
            relative_url: response.rows[0].seckillMainImgUrl
          }
        this.MainImgList.push(data)
      });
    },

    submitMainImgForm(){
       this.form2.seckillMainImgUrl= this.MainImgList[0].relative_url
       updatemainimg(this.form2).then(response => {
         this.msgSuccess("修改成功");
         this.open4 = false;
       });

    },

    cancelMainImg(){
      this.open4=false
      this.MainImgList=[];
    },




    handleAdd5(){

      this.$nextTick(() => {
        this.$refs.imageupload7.syncElUpload();
      })

      listmainimg().then(response => {
        this.open5 = true;
         this.MainImgList2=[];
        let data = {
            url: response.rows[0].seckillOutMainImgUrlFull,
            relative_url: response.rows[0].seckillOutMainImgUrl
          }
        this.MainImgList2.push(data)
      });
    },

    submitMainImgForm2(){
       this.form3.seckillOutMainImgUrl= this.MainImgList2[0].relative_url
       updatemainimg2(this.form3).then(response => {
         this.msgSuccess("修改成功");
         this.open5 = false;
       });

    },

    cancelMainImg2(){
      this.open5=false
      this.MainImgList2=[];
    },







    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除小程序轮播图编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delCarouselImage(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有小程序轮播图数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportCarouselImage(queryParams);
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
