<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="优惠券名称" prop="couponName">
        <el-input
        style="width: 160px"
          v-model="queryParams.couponName"
          placeholder="请输入"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="优惠券类型" prop="couponType">
        <el-select v-model="queryParams.couponType" placeholder="请选择" clearable style="width: 160px">
          <el-option v-for="(item, index) in couponTypeList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
        </el-select>

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
          v-hasPermi="['app:appCouponTemplate:add']"
        >新增</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>


    <el-table  border v-loading="loading" :data="appCouponTemplateList" >
      <el-table-column label="优惠券名称" align="center" prop="couponName" width="180"/>
      <el-table-column label="类型" align="center" prop="couponType" :formatter="couponTypeFormat"/>
      <el-table-column label="优惠券图片" align="center" width="120">
        <template slot-scope="scope">
          <el-image
              style="height: 40px"
               fit="contain"
              :src="scope.row.couponImageUrl"
              >
            </el-image>
        </template>
      </el-table-column>
      <el-table-column label="金额" align="center" prop="couponPrice" />
      <el-table-column label="门槛" align="center" prop="useThreshold" />
      <el-table-column label="折扣" align="center" prop="discount" />
      <el-table-column label="优惠券总数" align="center" prop="totalNum" />
      <el-table-column label="兑换礼品名称" align="center" prop="exchangeGiftsName" width="180"/>
      <el-table-column label="每人限领张数" align="center" prop="limitedCollectionNum" />
      <el-table-column label="适用范围" align="center" prop="useScope" />
      <el-table-column label="优惠券价格" align="center" prop="price" />
      <el-table-column label="是否开启收费" align="center" prop="isCharge" :formatter="isChargeFormat" width="120"/>
      <el-table-column label="品牌名称" align="center" prop="storeName" width="180"/>
      <el-table-column label="组织名称" align="center" prop="organizationName" width="180"/>
      <el-table-column label="用户名称 " align="center" prop="userName" width="180"/>
       <el-table-column label="截止时间" align="center" prop="closeTime" width="180">
         <template slot-scope="scope">
           <span>{{ parseTime(scope.row.closeTime, '{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
         </template>
       </el-table-column>




      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['app:appCouponTemplate:edit']"
          >修改</el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-bell"
            @click="handleDelete(scope.row)"
            v-hasPermi="['app:appCouponTemplate:examine']"
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

    <!-- 添加或修改优惠券模板对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="560px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">

        <el-form-item label="优惠券名称" prop="couponName">
          <el-input v-model="form.couponName" placeholder="请输入" />
        </el-form-item>

        

        <el-form-item label="优惠券类型" prop="couponType" style="width: 100%;">
          <el-select v-model="form.couponType" placeholder="请选择" style="width: 100%;">
            <el-option v-for="(item, index) in couponTypeList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
          </el-select>
        </el-form-item>
        <el-form-item label="适用范围" prop="useScope">
          <el-input v-model="form.useScope" placeholder="请输入" type="textarea" :rows="3"/>
        </el-form-item>


        <el-form-item label="优惠券图片" prop="couponImageUrl" class="require">
          <imgUpload ref="imageupload" v-model="imgList" :limit="1" :isSingle="false"></imgUpload>
        </el-form-item>
       <el-form-item v-if="form.couponType=='1'" label="优惠券金额" prop="couponPrice">
         <el-input v-model="form.couponPrice" placeholder="请输入" />
       </el-form-item>
       <el-form-item v-else-if="form.couponType=='2'" label="折扣" prop="discount">
         <el-input v-model="form.discount" placeholder="请输入1-10的折扣" />
       </el-form-item>
       <el-form-item v-else-if="form.couponType=='3'" label="兑换礼品名称" prop="exchangeGiftsName">
         <el-input v-model="form.exchangeGiftsName" placeholder="请输入" />
       </el-form-item>
       <el-form-item label="每人限领" prop="limitedCollectionNum">
         <el-input v-model="form.limitedCollectionNum" placeholder="请输入" />
       </el-form-item>

        <el-form-item label="优惠券总数" prop="totalNum">
          <el-input v-model="form.totalNum" placeholder="请输入" />
        </el-form-item>


        <el-form-item label="是否收费" prop="isCharge" style="width: 100%;">
          <el-select v-model="form.isCharge" placeholder="请选择" style="width: 100%;">
            <el-option v-for="(item, index) in isChargeList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
          </el-select>
        </el-form-item>
        
        <el-form-item label="优惠券价格" prop="price">
          <el-input v-model="form.price" placeholder="请输入" />
        </el-form-item>

        <el-form-item label="截止时间" prop="closeTime" style="width: 100%;">
          <el-date-picker clearable size="small"
            style="width: 100%;"
            v-model="form.closeTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择截止时间">
          </el-date-picker>
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
import {examineAppCouponTemplate,listAppCouponTemplate, getAppCouponTemplate, delAppCouponTemplate, addAppCouponTemplate, updateAppCouponTemplate, exportAppCouponTemplate } from "@/api/app/appCouponTemplate";
import imgUpload from '@/components/imgUpload'
export default {
  name: "AppCouponTemplate",
  components: {
    imgUpload
  },
  data() {
    return {

      organizTypeList: [{
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
      },
      {
        "dictLabel": "品牌",
        "dictValue": 5
      }
      ],


      couponTypeList: [{
        "dictLabel": "代金券",
        "dictValue": 1
      }, {
        "dictLabel": "折扣券",
        "dictValue": 2
      },
      {
        "dictLabel": "兑换券",
        "dictValue": 3
      }
      ],


      isChargeList: [{
        "dictLabel": "开启",
        "dictValue": 1
      }, {
        "dictLabel": "未开启",
        "dictValue": -1
      }
      ],



      imgList:[],
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
      // 优惠券模板表格数据
      appCouponTemplateList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        organizationId: null,
        brandId: null,
        couponName: null,
        couponType: null,
        couponImageUrl: null,
        couponPrice: null,
        useThreshold: null,
        discount: null,
        exchangeGiftsName: null,
        closeTime: null,
        beginTime:null,
        endTime:null,
        limitedCollectionNum: null,
        totalNum: null,
        useScope: null,
        isCharge: null,
        price: null,
        createId: null,
        createName: null,
        updateId: null,
        updateName: null,
        reviewStatus: null,
        reviewBy: null,
        reviewTime: null,
        reviewRemarks: null,
        del: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        couponType: [
          { required: true, message: "优惠券类型不能为空", trigger: "change" }
        ],

        discount: [
          { required: true, message: "最高减免不能为空", trigger: "blur" }
        ],

        useScope: [
          { required: true, message: "优惠券描述不能为空", trigger: "blur" }
        ],
        couponName: [
          { required: true, message: "优惠券名称不能为空", trigger: "blur" }
        ],
        couponPrice: [
          { required: true, message: "优惠券价格不能为空", trigger: "blur" }
        ],
        closeTime: [
          { required: true, message: "截止时间不能为空", trigger: "blur" }
        ],
        limitedCollectionNum: [
          { required: true, message: "每人限领张数不能为空", trigger: "blur" }
        ],
        totalNum: [
          { required: true, message: "优惠券总数不能为空", trigger: "blur" }
        ],
        isCharge: [
          { required: true, message: "是否开启收费不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {


    // 字典状态字典翻译
    isChargeFormat(row, column) {
      return this.selectDictLabel(this.isChargeList, row.isCharge);
    },



    couponTypeFormat(row, column) {
      return this.selectDictLabel(this.couponTypeList, row.couponType);
    },

    /** 查询优惠券模板列表 */
    getList() {
      this.loading = true;
      listAppCouponTemplate(this.queryParams).then(response => {
        this.appCouponTemplateList = response.rows;
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
      this.form = {
        id: null,
        organizationId: null,
        brandId: null,
        couponName: null,
        couponType: null,
        couponImageUrl: null,
        couponPrice: null,
        useThreshold: null,
        discount: null,
        exchangeGiftsName: null,
        closeTime: null,
        limitedCollectionNum: null,
        totalNum: null,
        useScope: null,
        isCharge: null,
        storeName:null,
        price: null,
        createId: null,
        createName: null,
        updateId: null,
        updateName: null,
        createTime: null,
        updateTime: null,
        reviewStatus: 0,
        reviewBy: null,
        reviewTime: null,
        reviewRemarks: null,
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
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加优惠券模板";
      this.$nextTick(() => {
        this.$refs.imageupload.syncElUpload();
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getAppCouponTemplate(id).then(response => {
        this.form = response.data;
        let data = {
            url: response.data.couponImageUrlFull,
            relative_url: response.data.couponImageUrl
          }
        this.imgList.push(data)
        this.open = true;
        this.title = "修改优惠券模板";
      });
    },
    /** 提交按钮 */
    submitForm() {

      if(this.imgList.length!=0){
       this.form.couponImageUrl= this.imgList[0].relative_url
      }
      else{
        this.msgError("图片不能为空")
        return
      }


      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateAppCouponTemplate(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAppCouponTemplate(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },


    handleExamine(row){
        if(row.reviewStatus==1){
         this.$confirm('是否重新审核?', "警告", {
             confirmButtonText: "确认",
             cancelButtonText: "取消",
             type: "warning"
           }).then(function() {
             let data={
               id:row.id,
               reviewStatus:0
             }
             return examineAppCouponTemplate(data);
           })
           .then(() => {
             this.msgSuccess("操作成功");
             this.getList();
           })
           .catch(function() {

           });
       }
       else{
         this.$confirm('是否确认审核?', "警告", {
             confirmButtonText: "同意",
             cancelButtonText: "取消",
             type: "warning"
           }).then(function() {
             let data={
               id:row.id,
               reviewStatus:1
             }
             return examineAppCouponTemplate(data);
           })
           .then(() => {
             this.msgSuccess("审核成功");
             this.getList();
           })
           .catch(function() {

           });
       }
    },




    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delAppCouponTemplate(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有优惠券模板数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportAppCouponTemplate(queryParams);
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
