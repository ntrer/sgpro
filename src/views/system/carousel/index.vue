<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="轮播图名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入轮播图名称"
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
          v-hasPermi="['system:carousel:add']"
        >新增</el-button>
      </el-col>
    </el-row>

    <el-table border v-loading="loading" :data="carouselList" @selection-change="handleSelectionChange">
      <el-table-column label="轮播图名称" align="center" prop="name" />
      <el-table-column label="图片" align="center" width="140">
        <template slot-scope="scope">
          <el-image

              style="height: 60px"
               fit="contain"
              :src="scope.row.imgUrlFull"
              >
            </el-image>
        </template>

      </el-table-column>
      <el-table-column label="状态" align="center" prop="del" :formatter="delFormat"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:carousel:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:carousel:remove']"
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

    <!-- 添加或修改B端轮播图管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="轮播图名称" prop="name" class="require">
          <el-input v-model="form.name" placeholder="请输入轮播图名称" />
        </el-form-item>
        <el-form-item label="图片" prop="imgUrl">
         <imgUpload ref="imageupload" v-model="imgList" :limit="1" :isSingle="false"></imgUpload>
        </el-form-item>
        <el-form-item label="跳转链接" prop="url">
          <el-input v-model="form.url"  placeholder="请输入跳转链接" />
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
import { listCarousel, getCarousel, delCarousel, addCarousel, updateCarousel, exportCarousel } from "@/api/system/carousel";
import imgUpload from '@/components/imgUpload'
export default {
  name: "Carousel",
  components: {
    imgUpload
  },
  data() {
    return {

      delStatus: [{
        "dictLabel": "正常",
        "dictValue": 1
      },
      {
        "dictLabel": "删除",
        "dictValue": -1
      }
      ],

       imgList: [],
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
      // B端轮播图管理表格数据
      carouselList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        imgUrl: null,
        url: null,
        sort: null,
        createId: null,
        updateId: null,
        enable: null,
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
    delFormat(row, column) {
      return this.selectDictLabel(this.delStatus, row.del);
    },


    handleSuccess(file, fileList){
      console.log(fileList)
      this.form.imgUrl=fileList.response.fileName
    },


    /** 查询B端轮播图管理列表 */
    getList() {
      this.loading = true;
      listCarousel(this.queryParams).then(response => {
        this.carouselList = response.rows;
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
        name: null,
        imgUrl: null,
        url: null,
        sort: null,
        createId: null,
        updateId: null,
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
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加B端轮播图管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCarousel(id).then(response => {
        this.form = response.data;

        let data = {
            url: response.data.imgUrlFull,
            relative_url: response.data.imgUrl
          }
        this.imgList.push(data)

        this.open = true;
        this.title = "修改B端轮播图管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.form.imgUrl= this.imgList[0].relative_url
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCarousel(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCarousel(this.form).then(response => {
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
          return delCarousel(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有B端轮播图管理数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportCarousel(queryParams);
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