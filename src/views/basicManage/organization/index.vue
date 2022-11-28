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

      <el-form-item label="电话" prop="phone">
        <el-input
        style="width: 160px;"
          v-model="queryParams.phone"
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
          v-hasPermi="['basicManage:organization:add']"
        >新增</el-button>
      </el-col>
    </el-row>


    <el-table border v-loading="loading" :data="redEnvelopesRecordList" @selection-change="handleSelectionChange">
      <el-table-column label="组织名称" align="center" prop="organizationName" width="180"/>
      <el-table-column label="简介" align="center" prop="introduce" width="300"/>
      <el-table-column label="电话" align="center" prop="phone" width="180"/>
      <el-table-column label="组织信息" align="center" prop="organizationInfo" width="180"/>
      <el-table-column label="组织类型" align="center" prop="organizationType" :formatter="organizationTypeFormat"/>
      <el-table-column label="省市区" align="center" prop="areaName" width="180" :formatter="areaNameFormat"/>
      <el-table-column label="组织LOGO" align="center" width="120">
        <template slot-scope="scope">
          <el-image
              style="height: 40px"
               fit="contain"
              :src="scope.row.organizationImageUrl"
              >
            </el-image>
        </template>
      </el-table-column>
      <el-table-column label="组织小程序封面图片" align="center" width="120">
        <template slot-scope="scope">
          <el-image
              style="height: 40px"
               fit="contain"
              :src="scope.row.appCoverImage"
              >
            </el-image>
        </template>
      </el-table-column>
      <el-table-column label="微信公众号" align="center" prop="shopPayInfoName" width="180"/>
      <el-table-column label="小程序信息" align="center" prop="appPayInfoName" width="180"/>
      <el-table-column label="活动场次" align="center" prop="activityNum" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180" :formatter="createTimeFormat"> </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basicManage:organization:edit']"
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basicManage:organization:remove']"
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

    <!-- 添加或修改红包领取记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="组织名称" prop="organizationName">
          <el-input v-model="form.organizationName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="活动场次" prop="activityNum">
          <el-input v-model="form.activityNum" placeholder="请输入" />
        </el-form-item>

        <el-form-item label="组织信息" prop="organizationInfo">
          <el-input v-model="form.organizationInfo" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="微信公众号" prop="shopPayInfoId">
          <el-select v-model="form.shopPayInfoId"  placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in ShopPayInfoList"
              :key="item.id"
              :label="item.shopName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="小程序商户" prop="appPayInfoId">
          <el-select v-model="form.appPayInfoId"  placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in appPayInfoList"
              :key="item.id"
              :label="item.appId"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="小程序封面图" prop="appCoverImage" class="require">
           <imgUpload ref="imageupload2" v-model="imgList2" :limit="1" :isSingle="false"></imgUpload>
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

        <el-form-item label="组织类型" prop="organizationType">
          <el-select v-model="form.organizationType"  placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in organizationTypeList"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="组织LOGO" prop="sysOrgLogo">
           <imgUpload ref="imageupload3" v-model="imgList3" :limit="1" :isSingle="false"></imgUpload>
        </el-form-item>


        <el-form-item label="简介" prop="introduce" style="width: 90%;">
          <el-input  :rows="4" v-model="form.introduce" type="textarea" placeholder="请输入简介" />
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
import {enableOrganization, listOrganization, getOrganization, delOrganization, addOrganization, updateOrganization, exportOrganization,listArea,listShopPayInfo,listappPayInfo} from "@/api/basicManage/organization";
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
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      imgList: [],
      imgList2:[],
      imgList3:[],
      organizationList: [],
      ShopPayInfoList:[],
      appPayInfoList:[],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        organizationName: null,
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
    this.getlistShopPayInfo()
    this.getlistappPayInfo()
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

     getlistShopPayInfo(){
       listShopPayInfo().then(response => {
         this.ShopPayInfoList = response.rows;
       });
     },

     getlistappPayInfo(){
       listappPayInfo().then(response => {
         this.appPayInfoList = response.rows;
       });
     },



    /** 查询红包领取记录列表 */
    getList() {
      this.loading = true;
      listOrganization(this.queryParams).then(response => {
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
      this.title = "新增组织";
      this.$nextTick(() => {
        this.$refs.imageupload2.syncElUpload();
      })
      this.$nextTick(() => {
        this.$refs.imageupload3.syncElUpload();
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.orgId || this.ids
      getOrganization(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改组织";
        let data2 = {
            url: response.data.appCoverImageFull,
            relative_url: response.data.appCoverImage
          }
        this.imgList2.push(data2)


        let data3 = {
            url: response.data.organizationImageUrlFull,
            relative_url: response.data.organizationImageUrl
          }
        this.imgList3.push(data3)

        this.$nextTick(()=>{
          this.$refs['cascaderAddr'].inputValue=response.data.provinceName+'/'+response.data.cityName

        })
      });
    },
    /** 提交按钮 */
    submitForm() {
      
      if(this.imgList2.length!=0){
       this.form.appCoverImage= this.imgList2[0].relative_url
      }
      else{
        this.form.appCoverImage= ''
      }
      
      if(this.imgList3.length!=0){
       this.form.organizationImageUrl= this.imgList3[0].relative_url
      }
      else{
        this.form.organizationImageUrl= ''
      }
      
      
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateOrganization(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addOrganization(this.form).then(response => {
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
      const ids = row.orgId || this.ids;
      this.$confirm('是否确认删除?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delOrganization(ids);
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
