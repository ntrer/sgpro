<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="门店名称" prop="storeName">
        <el-input
        style="width: 160px;"
          v-model="queryParams.storeName"
          placeholder="请输入"
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
          v-hasPermi="['basicManage:store:add']"
        >新增</el-button>
      </el-col>
    </el-row>


    <el-table border v-loading="loading" :data="redEnvelopesRecordList" @selection-change="handleSelectionChange">
      <el-table-column label="排序" align="center" prop="sort"/>
      <el-table-column label="门店名称" align="center" prop="storeName" width="180"/>
      <el-table-column label="门店地址" align="center" prop="storeAddress" width="180"/>
      <el-table-column label="门店电话" align="center" prop="storeTel" width="180"/>
      <el-table-column label="门店详情" align="center" prop="storeContent" width="300"/>
      <el-table-column label="所属组织" align="center" prop="organizationName" width="180"/>
      <el-table-column label="所属战区" align="center" prop="regionName" width="180"/>
      <el-table-column label="所属战队" align="center" prop="teamName" width="180"/>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180" :formatter="createTimeFormat"> </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改红包领取记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
       <el-form-item label="门店名称" prop="storeName">
          <el-input v-model="form.storeName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="门店地址" prop="storeAddress">
          <el-input v-model="form.storeAddress" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="门店电话" prop="storeTel">
          <el-input v-model="form.storeTel" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="排序" prop="sort;">
          <el-input v-model="form.sort" placeholder="请输入" />
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

        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入电话"/>
        </el-form-item>

        <el-form-item label="门店详情" prop="storeContent" style="width: 90%;">
          <el-input  :rows="4" v-model="form.storeContent" type="textarea" placeholder="请输入简介" />
        </el-form-item>

        <el-form-item label="门店图" prop="storeImg" class="require">
           <imgUpload ref="imageupload" v-model="imgList" :limit="10" :isSingle="false"></imgUpload>
        </el-form-item>



        <el-form-item label="所属组织" prop="orgId">
          <el-select v-model="form.orgId"  placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in OrganizationList"
              :key="item.orgId"
              :label="item.organizationName"
              :value="item.orgId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属战区" prop="regionId">
          <el-select v-model="form.regionId"  placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in RegionList"
              :key="item.regionId"
              :label="item.regionName"
              :value="item.regionId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属战队" prop="teamId">
          <el-select v-model="form.teamId"  placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in teamList"
              :key="item.teamId"
              :label="item.teamName"
              :value="item.teamId"
            ></el-option>
          </el-select>
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
import {liststore} from "@/api/basicManage/store";
import {listteam} from "@/api/basicManage/team";
import {listregion} from "@/api/basicManage/region";
import {listOrganization,listArea} from "@/api/basicManage/organization";
import imgUpload from '@/components/imgUpload'
export default {
  name: "RedEnvelopesRecord",
  components: {
    imgUpload
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
      teamList:[],
      RegionList:[],
      OrganizationList:[],
      imgList:[],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        storeName: null,
        phone: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },

      organizationTypeList:[{
         "dictLabel": "工厂",
         "dictValue": 1
       }
      ],

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

      	          }   else if(level == 2){
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
    this.getOrganizationList();
    this.getRegionList();
    this.getTeamList();

  },
  methods: {


    createTimeFormat(row, column){
      return row.createTime.substring(0,16)

    },

    organizationTypeFormat(row, column) {
      return this.selectDictLabel(this.organizationTypeList, row.organizationType);
    },

    areaNameFormat(row, column) {
      return row.provinceName+"/"+row.cityName
    },

    locationsChange2(value) {
       console.log(value)
       console.log(this.$refs['cascaderAddr'])
      this.form.provinceId=value[0];
      this.form.cityId=value[1];

     },


    getOrganizationList() {
      listOrganization(this.queryParams).then(response => {
        this.OrganizationList = response.rows;
      });
    },

    getRegionList() {
      listregion(this.queryParams).then(response => {
        this.RegionList = response.rows;
      });
    },

    getTeamList() {
      listteam(this.queryParams).then(response => {
        this.teamList = response.rows;
      });
    },


    /** 查询红包领取记录列表 */
    getList() {
      this.loading = true;
      liststore(this.queryParams).then(response => {
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
        storeId: null,
        storeName: null,
        storeAddress: null,
        storeTel: null,
        orgId: null,
        regionId: null,
        teamId: null,
        storeImg: null,
        sort: null,
        organizationName: null,
        regionName: null,
        teamName: null
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
      this.title = "新增门店";
      this.$nextTick(() => {
        this.$refs.imageupload.syncElUpload();
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getstore(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改门店";
        let  relativeUrl=response.data.storeImg.split(',');


         if(response.data.storeImgList!=null){
           for (var i = 0; i < response.data.storeImgList.length; i++) {
             let data = {
                 url: response.data.storeImgList[i],
                 relative_url: relativeUrl[i]
               }
               this.imgList.push(data)
           }
         }
      });
    },
    /** 提交按钮 */
    submitForm() {

      let imageStr=[]

      for (var i = 0; i < this.imgList.length; i++) {
          imageStr.push(this.imgList[i].relative_url)
      }

      this.form.storeImg=imageStr.toString()

      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatestore(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addstore(this.form).then(response => {
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
          return delstore(ids);
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
