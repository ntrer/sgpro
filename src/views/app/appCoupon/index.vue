<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">

      <el-form-item label="券名称" prop="couponName">
        <el-input
         style="width: 160px;"
          v-model="queryParams.couponName"
          placeholder="请输入"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="组织名称" prop="organizationName">
        <el-input
         style="width: 160px;"
          v-model="queryParams.organizationName"
          placeholder="请输入"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>


      <el-form-item label="领取人" prop="customerName">
        <el-input
         style="width: 160px;"
          v-model="queryParams.customerName"
          placeholder="请输入"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>


      <el-form-item label="手机号" prop="customerPhone">
        <el-input
         style="width: 160px;"
          v-model="queryParams.customerPhone"
          placeholder="请输入"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

     <el-form-item label="开始时间" prop="beginTime" >
       <el-date-picker clearable size="small"
       style="width: 190px;"
         v-model="queryParams.beginTime"
         type="datetime"
         format="yyyy-MM-dd HH:mm:ss"
         value-format="yyyy-MM-dd HH:mm:ss"
         placeholder="请选择">
       </el-date-picker>
     </el-form-item>
     <el-form-item label="结束时间" prop="endTime" >
       <el-date-picker clearable size="small"
       style="width: 190px;"
         v-model="queryParams.endTime"
         type="datetime"
         format="yyyy-MM-dd HH:mm:ss"
         value-format="yyyy-MM-dd HH:mm:ss"
         placeholder="请选择">
       </el-date-picker>
     </el-form-item>

     <el-form-item label="核销状态" prop="isVerification">
       <el-select v-model="queryParams.isVerification" placeholder="请选择" clearable style="width: 160px">
         <el-option v-for="(item, index) in verificationList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
       </el-select>
     </el-form-item>


      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <!-- <el-button icon="el-icon-download" size="mini" @click="handleExport">导出</el-button> -->
      </el-form-item>
    </el-form>



    <el-table border v-loading="loading" :data="appCouponList" @selection-change="handleSelectionChange">
      <el-table-column label="优惠券编号" align="center" prop="couponNum" width="180"/>
      <el-table-column label="优惠券名称" align="center" prop="couponName" width="180"/>
      <el-table-column label="优惠券描述" align="center" prop="couponName" width="180"/>
      <el-table-column label="所属组织" align="center" prop="organizationName" width="180"/>
      <el-table-column label="所属商户" align="center" prop="brandName" width="180"/>
      <el-table-column label="领取人" align="center" prop="customerName" width="180"/>
      <el-table-column label="手机号" align="center" prop="customerPhone" width="180"/>
      <el-table-column label="领取时间" align="center" prop="receiveTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.receiveTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="核销状态" align="center" prop="isVerification" :formatter="isVerificationFormat"/>
      <el-table-column label="核销人" align="center" prop="verificationUserName" />


      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            v-if="scope.row.isVerification==1"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['app:appCoupon:edit']"
          >核销</el-button>
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


  </div>
</template>

<script>
import { listAppCoupon} from "@/api/app/appCoupon";

export default {
  name: "AppCoupon",
  components: {
  },
  data() {
    return {


      verificationList:[
        {
          "dictLabel": "未核销",
          "dictValue": 1
        },
        {
          "dictLabel": "已核销",
          "dictValue": -1
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
      // 客户领取优惠券表格数据
      appCouponList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        organizationId: null,
        organizationName:null,
        brandId: null,
        brandName: null,
        brandUserPhone: null,
        appCustomerId: null,
        appOpenId: null,
        couponNum: null,
        couponTemplateId: null,
        couponName: null,
        customerName:null,
        couponType: null,
        couponPrice: null,
        useThreshold: null,
        discount: null,
        exchangeGiftsName: null,
        closeTime: null,
        isVerification: null,
        verificationTime: null,
        usageType: null,
        useScope: null,
        isCharge: null,
        price: null,
        receiveTime: null,
        orderNum: null,
        resOrderNum: null,
        payPrice: null,
        beginTime:null,
        endTime:null,
        orderTime: null,
        respPayTime: null,
        paymentTransaction: null,
        shareAppCustomerId: null,
        shareAppCustomerName: null,
        parentCouponId: null,
        orderStatus: null,
        del: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        couponType: [
          { required: true, message: "优惠券类型: 1:代金券 2:折扣券 3:兑换券不能为空", trigger: "change" }
        ],
        isVerification: [
          { required: true, message: "是否核销: 1:未核销 -1:已核销不能为空", trigger: "blur" }
        ],
        isCharge: [
          { required: true, message: "是否开启收费: 1:开启 -1:未开启不能为空", trigger: "blur" }
        ],
        orderStatus: [
          { required: true, message: "订单状态 0：待付款；10：已付款不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {


    // 字典状态字典翻译
    isVerificationFormat(row, column) {
      return this.selectDictLabel(this.verificationList, row.isVerification);
    },

    /** 查询客户领取优惠券列表 */
    getList() {
      this.loading = true;
      listAppCoupon(this.queryParams).then(response => {
        this.appCouponList = response.rows;
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
      this.form = {
        id: null,
        organizationId: null,
        brandId: null,
        brandName: null,
        brandUserPhone: null,
        appCustomerId: null,
        appOpenId: null,
        couponNum: null,
        couponTemplateId: null,
        couponName: null,
        couponType: null,
        couponPrice: null,
        useThreshold: null,
        discount: null,
        exchangeGiftsName: null,
        closeTime: null,
        isVerification: null,
        verificationTime: null,
        usageType: null,
        useScope: null,
        isCharge: null,
        price: null,
        receiveTime: null,
        orderNum: null,
        resOrderNum: null,
        payPrice: null,
        orderTime: null,
        respPayTime: null,
        paymentTransaction: null,
        shareAppCustomerId: null,
        shareAppCustomerName: null,
        parentCouponId: null,
        orderStatus: 0,
        updateTime: null,
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
      this.title = "添加客户领取优惠券";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids

      this.$confirm('是否确认核销?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          let data={
            id:id
          }
          return verificationAppCoupon(data);
        }).then(() => {
          this.getList();
          this.msgSuccess("核销成功");
        }).catch(() => {});


      getAppCoupon(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改客户领取优惠券";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateAppCoupon(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAppCoupon(this.form).then(response => {
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
      this.$confirm('是否确认删除客户领取优惠券编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delAppCoupon(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有客户领取优惠券数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportAppCoupon(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
