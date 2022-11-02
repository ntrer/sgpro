<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
       <el-form-item label="留言内容" prop="content">
         <el-input
           style="width: 160px;"
           v-model="queryParams.content"
           placeholder="请输入"
           clearable
           size="small"
           @keyup.enter.native="handleQuery"
         />
       </el-form-item>

       <el-form-item label="开始时间" prop="startDate">
         <el-date-picker clearable size="small"
           style="width: 160px;"
           v-model="queryParams.startDate"
           type="date"
           value-format="yyyy-MM-dd"
           placeholder="选择开始时间">
         </el-date-picker>
       </el-form-item>
       <el-form-item label="结束时间" prop="endDate">
        <el-date-picker clearable size="small"
        style="width: 160px;"
          v-model="queryParams.endDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择结束时间">
        </el-date-picker>
       </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>


    <el-table border v-loading="loading" :data="vegetarianboardList" @selection-change="handleSelectionChange">
      <el-table-column label="昵称" align="center" prop="wxNickName" width="240"/>
      <el-table-column label="头像" align="center" width="140">
        <template slot-scope="scope">
          <el-image
              style="height: 60px"
               fit="contain"
              :src="scope.row.headPortraitImageUrl"
              >
            </el-image>
        </template>

      </el-table-column>
      <el-table-column label="内容" align="center" prop="content" width="500"/>
      <el-table-column label="留言时间" align="center" prop="createTime" width="300"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['vegetarian:vegetarianboard:remove']"
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

    <!-- 添加或修改素食节留言对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="授权ID" prop="authInfoId">
          <el-input v-model="form.authInfoId" placeholder="请输入授权ID" />
        </el-form-item>
        <el-form-item label="内容">
          <editor v-model="form.content" :min-height="192"/>
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
import { listVegetarianboard, getVegetarianboard, delVegetarianboard, addVegetarianboard, updateVegetarianboard, exportVegetarianboard } from "@/api/vegetarian/vegetarianboard";
import Editor from '@/components/Editor';

export default {
  name: "Vegetarianboard",
  components: {
    Editor,
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
      // 素食节留言表格数据
      vegetarianboardList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        startDate:null,
        endDate:null,
        authInfoId: null,
        content: null,
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
    /** 查询素食节留言列表 */
    getList() {
      this.loading = true;
      listVegetarianboard(this.queryParams).then(response => {
        this.vegetarianboardList = response.rows;
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
        authInfoId: null,
        content: null,
        startDate:null,
        endDate:null,
        createTime: null,
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
      this.title = "添加素食节留言";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getVegetarianboard(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改素食节留言";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateVegetarianboard(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addVegetarianboard(this.form).then(response => {
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
      this.$confirm('是否确认删除素食节留言编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delVegetarianboard(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有素食节留言数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportVegetarianboard(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
