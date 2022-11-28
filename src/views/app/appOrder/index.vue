<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
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

      <el-form-item label="品牌名称" prop="brandName">
        <el-input
        style="width: 160px;"
          v-model="queryParams.brandName"
          placeholder="请输入"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="订单类型" prop="orderType">
        <el-select v-model="queryParams.orderType" placeholder="请选择" clearable size="small" style="width: 160px;">
          <el-option v-for="(item, index) in orderTypeList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
        </el-select>
      </el-form-item>


      <el-form-item label="订单号" prop="orderNum">
        <el-input
        style="width: 160px;"
          v-model="queryParams.orderNum"
          placeholder="请输入"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>



      <el-form-item label="订单状态" prop="orderStatus">
        <el-select v-model="queryParams.orderStatus" placeholder="请选择" clearable size="small" style="width: 160px;">
          <el-option v-for="(item, index) in orderStatusList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
        </el-select>
      </el-form-item>


      <el-form-item label="核销状态" prop="verificationOrderStatus">
        <el-select v-model="queryParams.verificationOrderStatus" placeholder="请选择" clearable size="small" style="width: 160px;">
          <el-option v-for="(item, index) in verificationOrderStatusList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
        </el-select>
      </el-form-item>


      <el-form-item label="提货状态" prop="takeGoodsOrderStatus">
        <el-select v-model="queryParams.takeGoodsOrderStatus" placeholder="请选择" clearable size="small" style="width: 160px;">
          <el-option v-for="(item, index) in takeGoodsOrderStatusList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
        </el-select>
      </el-form-item>




      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>



    <el-table border v-loading="loading" :data="appOrderList" @selection-change="handleSelectionChange">
      <el-table-column label="组织名称" align="center" prop="organizationName" width="180"/>
      <el-table-column label="品牌名称" align="center" prop="brandName" width="180"/>
      <el-table-column label="商品名称" align="center" prop="goodsName" width="180"/>
      <el-table-column label="规格名称" align="center" prop="seckillSpecsName" width="180"/>
      <el-table-column label="商品数量" align="center" prop="goodsNum" />
      <el-table-column label="商品单价" align="center" prop="goodsPrice" />
      <el-table-column label="客户姓名" align="center" prop="customerName" width="180"/>
      <el-table-column label="客户手机号" align="center" prop="customerPhone" width="180"/>
      <el-table-column label="客户地址" align="center" prop="address" width="180"/>
      <el-table-column label="订单类型" align="center" prop="orderType" :formatter="orderTypeformat" width="180"/>
      <el-table-column label="订单号" align="center" prop="orderNum" width="180"/>
      <el-table-column label="支付金额" align="center" prop="payPrice" />
      <el-table-column label="下单时间" align="center" prop="orderTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.orderTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center" prop="orderStatus" :formatter="orderStatusformat"/>
      <el-table-column label="提货状态" align="center" prop="takeGoodsOrderStatus" :formatter="takeGoodsOrderStatusformat"/>
      <el-table-column label="核销状态" align="center" prop="verificationOrderStatus" :formatter="verificationOrderStatusformat"/>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            v-if="scope.row.verificationOrderStatus==1&&scope.row.orderStatus==10&&scope.row.takeGoodsOrderStatus==0"
            @click="handleverification(scope.row)"
          >核销</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            v-if="scope.row.verificationOrderStatus==1&&scope.row.orderStatus==10&&scope.row.takeGoodsOrderStatus==0"
            @click="handletakeGoods(scope.row)"
          >提货</el-button>
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

    <!-- 添加或修改活动订单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属组织ID" prop="organizationId">
          <el-input v-model="form.organizationId" placeholder="请输入所属组织ID" />
        </el-form-item>
        <el-form-item label="组织类型:1:商场 2:联盟 3:第三方 4:经销商 5:品牌" prop="organizationType">
          <el-select v-model="form.organizationType" placeholder="请选择组织类型:1:商场 2:联盟 3:第三方 4:经销商 5:品牌">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属品牌ID" prop="brandId">
          <el-input v-model="form.brandId" placeholder="请输入所属品牌ID" />
        </el-form-item>
        <el-form-item label="商品ID" prop="goodsId">
          <el-input v-model="form.goodsId" placeholder="请输入商品ID" />
        </el-form-item>
        <el-form-item label="商品数量" prop="goodsNum">
          <el-input v-model="form.goodsNum" placeholder="请输入商品数量" />
        </el-form-item>
        <el-form-item label="商品单价" prop="goodsPrice">
          <el-input v-model="form.goodsPrice" placeholder="请输入商品单价" />
        </el-form-item>
        <el-form-item label="小程序客户微信openId" prop="appCustomerOpenId">
          <el-input v-model="form.appCustomerOpenId" placeholder="请输入小程序客户微信openId" />
        </el-form-item>
        <el-form-item label="小程序客户ID" prop="appCustomerId">
          <el-input v-model="form.appCustomerId" placeholder="请输入小程序客户ID" />
        </el-form-item>
        <el-form-item label="客户姓名" prop="customerName">
          <el-input v-model="form.customerName" placeholder="请输入客户姓名" />
        </el-form-item>
        <el-form-item label="客户手机号" prop="customerPhone">
          <el-input v-model="form.customerPhone" placeholder="请输入客户手机号" />
        </el-form-item>
        <el-form-item label="客户地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入客户地址" />
        </el-form-item>
        <el-form-item label="订单类型: 1:推荐商品订单 2:秒杀商品订单" prop="orderType">
          <el-select v-model="form.orderType" placeholder="请选择订单类型: 1:推荐商品订单 2:秒杀商品订单">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="订单号" prop="orderNum">
          <el-input v-model="form.orderNum" placeholder="请输入订单号" />
        </el-form-item>
        <el-form-item label="微信预订单号" prop="resOrderNum">
          <el-input v-model="form.resOrderNum" placeholder="请输入微信预订单号" />
        </el-form-item>
        <el-form-item label="实际支付金额" prop="payPrice">
          <el-input v-model="form.payPrice" placeholder="请输入实际支付金额" />
        </el-form-item>
        <el-form-item label="下单时间" prop="orderTime">
          <el-date-picker clearable size="small"
            v-model="form.orderTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择下单时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="支付回调时间" prop="respPayTime">
          <el-date-picker clearable size="small"
            v-model="form.respPayTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择支付回调时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="支付流水" prop="paymentTransaction">
          <el-input v-model="form.paymentTransaction" placeholder="请输入支付流水" />
        </el-form-item>
        <el-form-item label="订单状态: 0:待付款 10:已付款">
          <el-radio-group v-model="form.orderStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="1:未删除 -1:已删除" prop="del">
          <el-input v-model="form.del" placeholder="请输入1:未删除 -1:已删除" />
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
import {takegoods,listAppOrder,verificationAppCoupon} from "@/api/app/appOrder";

export default {
  name: "AppOrder",
  components: {
  },
  data() {
    return {

      orderTypeList:[{
         "dictLabel": "推荐商品订单",
         "dictValue": 1
       }, {
         "dictLabel": "秒杀商品订单",
         "dictValue": 2
       },
       {
         "dictLabel": "普通商品订单",
         "dictValue": 3
       }
      ],

      orderStatusList:[{
         "dictLabel": "待付款",
         "dictValue": 0
       }, {
         "dictLabel": "已付款",
         "dictValue": 10
       }
      ],

      verificationOrderStatusList:[
        {
           "dictLabel": "待核销",
           "dictValue": 0
         }, {
           "dictLabel": "已核销",
           "dictValue": 1
         }
      ],

      takeGoodsOrderStatusList:[
        {
           "dictLabel": "待提货",
           "dictValue": 0
         }, {
           "dictLabel": "已提货",
           "dictValue": 1
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
      // 活动订单表格数据
      appOrderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        organizationId: null,
        organizationType: null,
        brandName:null,
        organizationName:null,
        brandId: null,
        goodsId: null,
        goodsName:null,
        goodsNum: null,
        goodsPrice: null,
        appCustomerOpenId: null,
        appCustomerId: null,
        customerName: null,
        customerPhone: null,
        address: null,
        orderType: null,
        orderNum: null,
        resOrderNum: null,
        payPrice: null,
        orderTime: null,
        respPayTime: null,
        paymentTransaction: null,
        orderStatus: null,
        takeGoodsOrderStatus:null,
        verificationOrderStatus:null,
        del: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {



    // 字典状态字典翻译
    orderTypeformat(row, column) {
      return this.selectDictLabel(this.orderTypeList, row.orderType);
    },

    orderStatusformat(row, column) {
      return this.selectDictLabel(this.orderStatusList, row.orderStatus);
    },


    verificationOrderStatusformat(row, column) {
      return this.selectDictLabel(this.verificationOrderStatusList, row.verificationOrderStatus);
    },


    takeGoodsOrderStatusformat(row, column) {
      return this.selectDictLabel(this.takeGoodsOrderStatusList, row.takeGoodsOrderStatus);
    },


    /** 查询活动订单列表 */
    getList() {
      this.loading = true;
      listAppOrder(this.queryParams).then(response => {
        this.appOrderList = response.rows;
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
        organizationType: null,
        brandId: null,
        goodsId: null,
        goodsNum: null,
        goodsPrice: null,
        appCustomerOpenId: null,
        appCustomerId: null,
        customerName: null,
        customerPhone: null,
        address: null,
        orderType: null,
        orderNum: null,
        resOrderNum: null,
        payPrice: null,
        orderTime: null,
        respPayTime: null,
        paymentTransaction: null,
        orderStatus: 0,
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
      this.title = "添加活动订单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getAppOrder(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改活动订单";
      });
    },
    
    
    handleverification(row) {
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
    
    },
    
    
    
    
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateAppOrder(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAppOrder(this.form).then(response => {
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
      this.$confirm('是否确认删除活动订单编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delAppOrder(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有活动订单数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportAppOrder(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    },


    handletakeGoods(row){
      const ids = row.id || this.ids;
      this.$confirm('是否确认提货?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          let data={
            id:ids
          }
          return takegoods(data);
        }).then(() => {
          this.getList();
          this.msgSuccess("提货成功");
        }).catch(() => {});
    },

  }
};
</script>
