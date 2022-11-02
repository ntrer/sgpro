<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="单位名称" prop="companyName">
        <el-input
          v-model="queryParams.companyName"
          placeholder="请输入单位名称"
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
          v-hasPermi="['vegetarian:vegetariancompany:add']"
        >新增</el-button>
      </el-col>
    </el-row>

    <el-table border v-loading="loading" :data="vegetariancompanyList" @selection-change="handleSelectionChange">
      <el-table-column label="单位名称" align="center" prop="companyName" />
      <el-table-column label="单位手机号" align="center" prop="companyMobile" />
      <el-table-column label="单位地址" align="center" prop="companyAddress" />
      <el-table-column label="省市区" align="center" prop="provinceName" >
        <template slot-scope="scope">
          <span>{{scope.row.provinceName+'/'+scope.row.cityName+'/'+scope.row.areaName}}</span>
        </template>
       </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['vegetarian:vegetariancompany:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['vegetarian:vegetariancompany:remove']"
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

    <!-- 添加或修改素食节单位对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="单位名称" prop="companyName">
          <el-input v-model="form.companyName" placeholder="请输入单位名称" />
        </el-form-item>
        <el-form-item label="单位手机号" prop="companyMobile">
          <el-input v-model="form.companyMobile" placeholder="请输入单位手机号" />
        </el-form-item>
        <el-form-item label="单位地址" prop="companyAddress">
          <el-input v-model="form.companyAddress"  placeholder="请输入单位地址" />
        </el-form-item>
        <el-form-item label="省市区" prop="areaId" >
         <el-cascader
         style="width: 100%;"
         class="my-input"
         filterable
           ref="cascaderAddr"
         	:props="props"
         	 @change="locationsChange2"
         	 placeholder="省/市/区"
         	 size="small"
         	 v-model="form.areaId"
         	 clearable
         ></el-cascader>
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
import {listArea, listVegetariancompany, getVegetariancompany, delVegetariancompany, addVegetariancompany, updateVegetariancompany, exportVegetariancompany } from "@/api/vegetarian/vegetariancompany";

export default {
  name: "Vegetariancompany",
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
      // 素食节单位表格数据
      vegetariancompanyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        companyName: null,
        companyMobile: null,
        companyAddress: null,
        provinceId: null,
        cityId: null,
        areaId: null,
        provinceName: null,
        cityName: null,
        areaName: null,
        del: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },

      props: {
      	        lazy: true,
      	        async lazyLoad(node, resolve) {
      	          const { level } = node;
      	          if (level == 0) {

                   let Provence=[]

                   let param={
                     areaLevel:1
                   }
                   listArea(param).then(response => {
                    console.log(response)
                    Provence=response.rows
                    var nodes = Provence.map(item => {
                      return {
                        value: item.id,
                        label: item.areaName,
                        leaf: false
                      };
                    });
                    resolve(nodes);
                   });


      	          } else if (level == 1) {

                    let cityData=[]
                     let param={
                       parentId:node.value,
                        areaLevel:2
                     }
                    listArea(param).then(response => {
                     console.log(response)
                     cityData=response.rows
                     var nodes = cityData.map(item => {
                       return {
                         value: item.id,
                         label: item.areaName,
                         leaf: false
                       };
                     });
                     resolve(nodes);
                    });

      	          }
                  else if(level == 2){
                     let areaData=[]
                     let param={
                       parentId:node.value,
                        areaLevel:3
                     }
                    listArea(param).then(response => {
                     console.log(response)
                     areaData=response.rows
                     var nodes = areaData.map(item => {
                       return {
                         value: item.id,
                         label: item.areaName,
                         leaf: true
                       };
                     });
                     resolve(nodes);
                    });
                  }
      	        }
      	      },
    };
  },
  created() {
    this.getList();
  },
  methods: {


    locationsChange2(value) {
       console.log(value)
       console.log(this.$refs['cascaderAddr'])
      this.form.provinceId=value[0];
      this.form.cityId=value[1];
       this.form.areaId=value[2]

     },


    /** 查询素食节单位列表 */
    getList() {
      this.loading = true;
      listVegetariancompany(this.queryParams).then(response => {
        this.vegetariancompanyList = response.rows;
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
        companyName: null,
        companyMobile: null,
        companyAddress: null,
        provinceId: null,
        cityId: null,
        areaId: null,
        provinceName: null,
        cityName: null,
        areaName: null,
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
      this.title = "添加素食节单位";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getVegetariancompany(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.$nextTick(()=>{
          this.$refs['cascaderAddr'].inputValue=response.data.provinceName+'/'+response.data.cityName+'/'+response.data.areaName

        })
        this.title = "修改素食节单位";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateVegetariancompany(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addVegetariancompany(this.form).then(response => {
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
          return delVegetariancompany(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有素食节单位数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportVegetariancompany(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
