<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
     <el-form-item label="活动名称" prop="activityId">
       <el-select v-model="queryParams.activityId" placeholder="请选择" clearable style="width: 160px">
         <el-option v-for="(item, index) in activityList" :key="item.activityId" :label="item.activityName" :value="item.activityId"/>
       </el-select>
     </el-form-item>
     <el-form-item label="类型" prop="type">
       <el-select v-model="queryParams.type" placeholder="请选择" clearable style="width: 160px">
         <el-option v-for="(item, index) in typeList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
       </el-select>
     </el-form-item>
     <el-form-item label="来源" prop="formId">
       <el-select v-model="queryParams.formId" placeholder="请选择" clearable style="width: 160px">
         <el-option v-for="(item, index) in formIdList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
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
      <el-table-column label="微信昵称" align="center" prop="wxNickName" width="180"/>
      <el-table-column label="头像" align="center" width="120">
        <template slot-scope="scope">
          <el-image
              style="height: 40px"
               fit="contain"
              :src="scope.row.headPortraitUrl"
              >
            </el-image>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center" prop="type" :formatter="typeFormat"/>
      <el-table-column label="来源" align="center" prop="formId" :formatter="formIdFormat"/>
      <el-table-column label="到账类型" align="center" prop="directAccount" :formatter="directAccountFormat"/>
      <el-table-column label="金额(或积分)" align="center" prop="number" />
      <el-table-column label="时间" align="center" prop="createTime" class="fixed-width" :formatter="createTimeFormat"> </el-table-column>
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
import { listactivityRechargeRecord} from "@/api/extensionManage/activityCard";
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
        type:null,
        formId:null
      },

      typeList:[
        {
          "dictLabel": "现金",
          "dictValue": 1
        },
        {
          "dictLabel": "积分",
          "dictValue": 2
        }
      ],

      formIdList:[
        {
          "dictLabel": "一次裂变",
          "dictValue": 1
        },
        {
          "dictLabel": "二次裂变",
          "dictValue": 2
        },
        {
          "dictLabel": "浏览",
          "dictValue": 3
        }
      ],

      directAccountList:[
        {
          "dictLabel": "直接到账",
          "dictValue": 1
        },
        {
          "dictLabel": "自行提现",
          "dictValue": 2
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

     formIdFormat(row, column){
        return this.selectDictLabel(this.formIdList, row.formId);
     },

     directAccountFormat(row, column){
        return this.selectDictLabel(this.directAccountList, row.directAccount);
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
      listactivityRechargeRecord(this.queryParams).then(response => {
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
