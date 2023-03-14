<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
     <el-form-item label="活动名称" prop="activityId">
       <el-select v-model="queryParams.activityId" placeholder="请选择" clearable style="width: 160px">
         <el-option v-for="(item, index) in activityList" :key="item.activityId" :label="item.activityName" :value="item.activityId"/>
       </el-select>
     </el-form-item>

      <el-form-item label="开始时间" prop="startDate" >
        <el-date-picker clearable size="small"
        style="width: 190px;"
          v-model="queryParams.startDate"
         type="datetime"
         format="yyyy-MM-dd HH:mm:ss"
         value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endDate" >
        <el-date-picker clearable size="small"
        style="width: 190px;"
          v-model="queryParams.endDate"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择结束时间">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>



    <el-table border v-loading="loading" :data="redEnvelopesRecordList" @selection-change="handleSelectionChange">
      <el-table-column label="活动名称" align="center" prop="activityName" width="180"/>
       <el-table-column label="提现流水号" align="center" prop="withdrawNo" /width="180">
      <el-table-column label="微信昵称" align="center" prop="wxNickName" width="180"/>
      <el-table-column label="人员类型" align="center" prop="type" :formatter="typeFormat"/>
      <el-table-column label="费用类型" align="center" prop="fromType" :formatter="fromTypeFormat"/>
      <el-table-column label="提现金额" align="center" prop="money" />
      <el-table-column label="充值金额" align="center" prop="amount" />
      <el-table-column label="时间" align="center" prop="createTime" :formatter="createTimeFormat" width="180"> </el-table-column>
      <el-table-column label="备注" align="center" prop="remarks" width="300"/>
      <el-table-column label="微信付款单号" align="center" prop="paymentNo" width="180"/>
      <el-table-column label="企业付款成功时间" align="center" prop="paymentTime" width="180"/>
      <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat" class="fixed-width"/>
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
import { listmemberBalanceWithdrawRecord} from "@/api/extensionManage/activityCard";
import {listActivity} from "@/api/activityManage/activity";
export default {
  name: "RedEnvelopesRecord",
  components: {
  },
  data() {
    return {
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
      // 红包领取记录表格数据
      redEnvelopesRecordList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        activityId: null,
        endDate:null,
        startDate:null,
        businessType:null,
      },


      typeList:[
        {
          "dictLabel": "导购",
          "dictValue": 1
        },
        {
          "dictLabel": "客户",
          "dictValue": 2
        }
      ],

      fromTypeList:[
        {
          "dictLabel": "奖励(红包提成)金额",
          "dictValue": 1
        },
        {
          "dictLabel": "奖励豆",
          "dictValue": 2
        }
      ],

      statusList:[
        {
          "dictLabel": "待审核",
          "dictValue": 1
        },
        {
          "dictLabel": "已同意",
          "dictValue": 2
        },
        {
          "dictLabel": "已拒绝",
          "dictValue": 3
        },
        {
          "dictLabel": "提现到账",
          "dictValue": 10
        },
        {
          "dictLabel": "提现失败",
          "dictValue": -10
        }
      ],


      activityList:[],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getActivity();
  },
  methods: {


    createTimeFormat(row, column){
      return row.createTime.substring(0,16)

    },

     typeFormat(row, column){
        return this.selectDictLabel(this.typeList, row.type);
     },

     fromTypeFormat(row, column){
        return this.selectDictLabel(this.fromTypeList, row.fromType);
     },

     statusFormat(row, column){
        return this.selectDictLabel(this.statusList, row.status);
     },

    getActivity(){
      this.loading = true;
      listActivity().then(response => {
        this.activityList = response.rows;
        this.queryParams.activityId=this.activityList[0].activityId
        this.getList()
      });
    },

    /** 查询红包领取记录列表 */
    getList() {
      this.loading = true;
      listmemberBalanceWithdrawRecord(this.queryParams).then(response => {
       this.redEnvelopesRecordList = response.rows;
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
        redEnvelopesId: null,
        activityId: null,
        customerId: null,
        price: null,
        redState: null,
        wxShopId: null,
        paymentNo: null,
        paymentTime: null,
        isReal: null,
        ip: null,
        redSign: null,
        createTime: null,
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
      this.title = "添加红包领取记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getRedEnvelopesRecord(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改红包领取记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateRedEnvelopesRecord(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRedEnvelopesRecord(this.form).then(response => {
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
      this.$confirm('是否确认删除红包领取记录编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delRedEnvelopesRecord(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有红包领取记录数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportRedEnvelopesRecord(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
