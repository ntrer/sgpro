<template>
  <div class="app-container">

    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
     <el-tab-pane label="单经销商共享客户" name="first">

    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="客户姓名" prop="customerName">
        <el-input
          v-model="queryParams.customerName"
          placeholder="请输入客户姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户电话" prop="mobileNumber">
        <el-input
          v-model="queryParams.mobileNumber"
          placeholder="请输入客户电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>


      <el-form-item label="来源" prop="source">
        <el-select v-model="queryParams.source" placeholder="请选择" clearable :style="{width: '80%'}">
          <el-option v-for="dict in sourceList" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>


    <el-table border v-loading="loading" :data="sharedPoolCustomerList" @selection-change="handleSelectionChange">
      <el-table-column label="客户姓名" align="center" prop="customerName" />
      <el-table-column label="客户电话" align="center" prop="mobileNumber" />
      <el-table-column label="意向产品" align="center" prop="intentionProduct" />
      <el-table-column label="地址" align="center" prop="address" />
      <el-table-column label="来源" align="center" prop="source" :formatter="sourceFormat"/>
      <el-table-column label="经销商共享状态" align="center" prop="singleAgentShareStatus" :formatter="shareStatusFormat"/>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />



    </el-tab-pane>

    <el-tab-pane label="多经销商共享客户" name="second">


    <el-form :model="queryParams2" ref="queryForm2" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="客户姓名" prop="customerName">
        <el-input
          v-model="queryParams2.customerName"
          placeholder="请输入客户姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户电话" prop="mobileNumber">
        <el-input
          v-model="queryParams2.mobileNumber"
          placeholder="请输入客户电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>


      <el-form-item label="来源" prop="source">
        <el-select v-model="queryParams2.source" placeholder="请选择" clearable :style="{width: '80%'}">
          <el-option v-for="dict in sourceList" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery2">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery2">重置</el-button>
      </el-form-item>
    </el-form>


    <el-table border v-loading="loading2" :data="sharedPoolCustomerList2" >
      <el-table-column label="客户姓名" align="center" prop="customerName" />
      <el-table-column label="客户电话" align="center" prop="mobileNumber" />
      <el-table-column label="意向产品" align="center" prop="intentionProduct" />
      <el-table-column label="地址" align="center" prop="address" />
      <el-table-column label="来源" align="center" prop="source" :formatter="sourceFormat"/>
      <el-table-column label="经销商共享状态" align="center" prop="multipleAgentShareStatus" :formatter="shareStatusFormat2"/>
    </el-table>

    <pagination
      v-show="total2>0"
      :total="total2"
      :page.sync="queryParams2.pageNum"
      :limit.sync="queryParams2.pageSize"
      @pagination="getList2"
    />



    </el-tab-pane>

    </el-tabs>


    <!-- 添加或修改共享池客户对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="客户姓名" prop="customerName">
          <el-input v-model="form.customerName" placeholder="请输入客户姓名" />
        </el-form-item>
        <el-form-item label="客户电话" prop="mobileNumber">
          <el-input v-model="form.mobileNumber" placeholder="请输入客户电话" />
        </el-form-item>
        <el-form-item label="意向产品" prop="intentionProduct">
          <el-input v-model="form.intentionProduct" placeholder="请输入意向产品" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="来源 1线上报名 2线下录入" prop="source">
          <el-input v-model="form.source" placeholder="请输入来源 1线上报名 2线下录入" />
        </el-form-item>
        <el-form-item label="外部ID (线上报名ID)" prop="bizId">
          <el-input v-model="form.bizId" placeholder="请输入外部ID (线上报名ID)" />
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="品牌ID" prop="brandId">
          <el-input v-model="form.brandId" placeholder="请输入品牌ID" />
        </el-form-item>
        <el-form-item label="组织ID" prop="organizationId">
          <el-input v-model="form.organizationId" placeholder="请输入组织ID" />
        </el-form-item>
        <el-form-item label="单经销商共享状态 0未加入公海池 1已加入公海池">
          <el-radio-group v-model="form.singleAgentShareStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="多经销商共享状态 0未加入公海池 1已加入公海池">
          <el-radio-group v-model="form.multipleAgentShareStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
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
import { listSharedPoolCustomer, getSharedPoolCustomer, delSharedPoolCustomer, addSharedPoolCustomer, updateSharedPoolCustomer, exportSharedPoolCustomer } from "@/api/sharedPool/sharedPoolCustomer";

export default {
  name: "SharedPoolCustomer",
  components: {
  },
  data() {
    return {


      activeName: 'first',
      sourceList: [{
          "dictLabel": "线上报名",
          "dictValue": 1
        }, {
          "dictLabel": "线下录入",
          "dictValue": 2
        }
      ],

      shareStatusList: [{
          "dictLabel": "未加入公海池",
          "dictValue": 0
        }, {
          "dictLabel": "已加入公海池",
          "dictValue": 1
        }
      ],


      // 遮罩层
      loading: true,
      loading2: true,
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
       tab: 0,
      // 总条数
      total: 0,
      total2: 0,
      // 共享池客户表格数据
      sharedPoolCustomerList: [],
      sharedPoolCustomerList2: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        customerName: null,
        mobileNumber: null,
        intentionProduct: null,
        sharedType:1,
        address: null,
        source: null,
        bizId: null,
        userId: null,
        brandId: null,
        organizationId: null,
        singleAgentShareStatus: null,
        multipleAgentShareStatus: null
      },
      queryParams2: {
        pageNum: 1,
        pageSize: 10,
        sharedType:2,
        customerName: null,
        mobileNumber: null,
        intentionProduct: null,
        address: null,
        source: null,
        bizId: null,
        userId: null,
        brandId: null,
        organizationId: null,
        singleAgentShareStatus: null,
        multipleAgentShareStatus: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        singleAgentShareStatus: [
          { required: true, message: "单经销商共享状态 0未加入公海池 1已加入公海池不能为空", trigger: "blur" }
        ],
        multipleAgentShareStatus: [
          { required: true, message: "多经销商共享状态 0未加入公海池 1已加入公海池不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.getList2();
  },
  methods: {

    // 切换标签页面
    handleClick(tab, event) {
      console.log(tab.index);
      this.tab = tab.index
    },

    shareStatusFormat(row, column) {
      return this.selectDictLabel(this.shareStatusList, row.singleAgentShareStatus);
    },

    shareStatusFormat2(row, column) {
      return this.selectDictLabel(this.shareStatusList, row.multipleAgentShareStatus);
    },

    sourceFormat(row, column) {
      return this.selectDictLabel(this.sourceList, row.source);
    },


    /** 查询共享池客户列表 */
    getList() {
      this.loading = true;
      listSharedPoolCustomer(this.queryParams).then(response => {
        this.sharedPoolCustomerList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    getList2() {
      this.loading2 = true;
      listSharedPoolCustomer(this.queryParams2).then(response => {
        this.sharedPoolCustomerList2 = response.rows;
        this.total2 = response.total;
        this.loading2 = false;
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
        customerName: null,
        mobileNumber: null,
        intentionProduct: null,
        address: null,
        source: null,
        bizId: null,
        userId: null,
        brandId: null,
        organizationId: null,
        createTime: null,
        updateTime: null,
        singleAgentShareStatus: 0,
        multipleAgentShareStatus: 0
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },

    handleQuery2() {
      this.queryParams2.pageNum = 1;
      this.getList2();
    },



    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },


    resetQuery2() {
      this.resetForm("queryForm2");
      this.handleQuery2();
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
      this.title = "添加共享池客户";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getSharedPoolCustomer(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改共享池客户";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSharedPoolCustomer(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSharedPoolCustomer(this.form).then(response => {
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
      this.$confirm('是否确认删除共享池客户编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delSharedPoolCustomer(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有共享池客户数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportSharedPoolCustomer(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
