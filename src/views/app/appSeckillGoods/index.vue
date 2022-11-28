<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="商品名称" prop="goodsName">
        <el-input
          v-model="queryParams.goodsName"
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

        >新增商品</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table border v-loading="loading" :data="appSeckillGoodsList" @selection-change="handleSelectionChange">
      <el-table-column label="商品名称" align="center" prop="goodsName" width="180"/>
      <el-table-column label="排序" align="center" prop="sort" width="240"/>
      <el-table-column label="规格" align="center" prop="goodsSpecifications" width="180"/>
      <el-table-column label="所属品牌" align="center" prop="brandName" width="180"/>
      <el-table-column label="商品图片" align="center" width="140">
        <template slot-scope="scope">
          <el-image
              style="height: 60px"
               fit="contain"
              :src="scope.row.goodsImageFull"
              >
            </el-image>
        </template>
         </el-table-column>

      <el-table-column label="商品原价" align="center" prop="goodsPrice" />
      <el-table-column label="规格" align="center" prop="specs" width="180">
        <template slot-scope="scope">
          <span style="color: #1890FF;cursor: pointer;" @click="viewSpecs(scope.row)">查看</span>
        </template>

      </el-table-column>
      <el-table-column label="单位" align="center" prop="goodsCounting" />
      <el-table-column label="是否推荐" align="center" prop="status" :formatter="isRecommandFormat"/>
      <el-table-column label="秒杀开始时间" align="center" prop="seckillStartTime" width="180"/>
      <el-table-column label="秒杀结束时间" align="center" prop="seckillEndTime" width="180"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['app:appSeckillGoods:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['app:appSeckillGoods:remove']"
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

    <!-- 添加或修改小程序推荐商品关联对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="580px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="商品名称" prop="goodsName">
          <el-input v-model="form.goodsName"  />
        </el-form-item>

        <el-form-item label="商品分类" prop="classificationId">
          <el-select v-model="form.classificationId" placeholder="请选择" clearable size="small" style="width: 100%;" >
             <el-option v-for="(item, index) in classificationList" :key="item.classificationId" :label="item.classificationName" :value="item.classificationId"/>
          </el-select>
        </el-form-item>

        <el-form-item label="商品图片" prop="goodsImg" class="require">
          <imgUpload ref="imageupload" v-model="imgList" :limit="1" :isSingle="false"></imgUpload>
        </el-form-item>

        <el-form-item label="商品价格" prop="goodsPrice">
          <el-input v-model="form.goodsPrice"  />
        </el-form-item>

        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort"/>
        </el-form-item>

        <el-form-item label="规格" prop="seckillSoldNum">
          <span v-for="(item,index) in specsList"  :class="item.isMainPush==1?'addBorder':'addBorder2'"   style="cursor: pointer;
          margin-right: 5px;padding: 5px;text-align: center;border-radius: 6px;" @click="EditSpecs(item,index)">
            {{item.appSeckillSpecsName}}
          </span>
        <el-button type="primary" @click="addSpecs()">新增</el-button>
        </el-form-item>

        <el-form-item label="秒杀开始时间" prop="seckillStartTime" >
          <el-date-picker clearable size="small"
          style="width: 100%;"
            v-model="form.seckillStartTime"
            type="datetime"
           format="yyyy-MM-dd HH:mm:ss"
           value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="秒杀结束时间" prop="seckillEndTime" >
          <el-date-picker clearable size="small"
          style="width: 100%;"
            v-model="form.seckillEndTime"
            type="datetime"
           format="yyyy-MM-dd HH:mm:ss"
           value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择">
          </el-date-picker>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


    <el-dialog title="新增规格" :visible.sync="openSpecs" width="580px" append-to-body>
      <el-form ref="Specsform"  label-width="100px">

        <el-form-item label="规格名称" prop="appSeckillSpecsName">
          <el-input v-model="Specsform.appSeckillSpecsName"  />
        </el-form-item>
        <el-form-item label="原价" prop="originalPrice">
          <el-input v-model="Specsform.originalPrice"  />
        </el-form-item>
        <el-form-item label="秒杀价(支付价格)" prop="seckillGoodsAmount">
          <el-input v-model="Specsform.seckillGoodsAmount"  />
        </el-form-item>

        <el-form-item label="价格(非支付价格)" prop="seckillGoodsPrice">
          <el-input v-model="Specsform.seckillGoodsPrice"/>
        </el-form-item>

        <el-form-item label="限购数量" prop="limitation">
          <el-input v-model="Specsform.limitation"/>
        </el-form-item>

        <el-form-item label="商品库存" prop="seckillStock">
          <el-input v-model="Specsform.seckillStock"/>
        </el-form-item>

        <el-form-item label="商品已售数量" prop="seckillSoldNum">
          <el-input v-model="Specsform.seckillSoldNum"/>
        </el-form-item>

        <el-form-item label="是否是主推" prop="isMainPush">
          <el-select v-model="Specsform.isMainPush" placeholder="请选择" clearable size="small" style="width: 100%;" >
             <el-option v-for="(item, index) in isMainPushList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
          </el-select>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitSpecsform">确 定</el-button>
        <el-button @click="cancelSpecsform">取 消</el-button>
      </div>
    </el-dialog>


    <el-dialog title="规格列表" :visible.sync="viewOpen" width="1100px" append-to-body>
      <el-table border v-loading="loading" :data="appSeckillSpecsList" >
        <el-table-column label="规格名称" align="center" prop="appSeckillSpecsName" width="180"/>
        <el-table-column label="原价" align="center" prop="originalPrice" width="140"/>
        <el-table-column label="秒杀价" align="center" prop="seckillGoodsAmount" width="140"/>
        <el-table-column label="订金" align="center" prop="seckillGoodsPrice" width="140"/>
        <el-table-column label="限购数量" align="center" prop="limitation" width="140"/>
        <el-table-column label="商品库存" align="center" prop="seckillStock" width="140"/>
        <el-table-column label="是否是主推" align="center" prop="isMainPush" :formatter="isMainPushFormat" class="fixed-width"/>
      </el-table>
    </el-dialog>


    <el-dialog title="修改规格" :visible.sync="editSpecs" width="580px" append-to-body>
      <el-form ref="Specsform"  label-width="100px">

        <el-form-item label="规格名称" prop="appSeckillSpecsName">
          <el-input v-model="Specsform.appSeckillSpecsName"  />
        </el-form-item>
        <el-form-item label="原价" prop="originalPrice">
          <el-input v-model="Specsform.originalPrice"  />
        </el-form-item>
        <el-form-item label="秒杀价" prop="seckillGoodsAmount">
          <el-input v-model="Specsform.seckillGoodsAmount"  />
        </el-form-item>

        <el-form-item label="订金" prop="seckillGoodsPrice">
          <el-input v-model="Specsform.seckillGoodsPrice"/>
        </el-form-item>

        <el-form-item label="限购数量" prop="limitation">
          <el-input v-model="Specsform.limitation"/>
        </el-form-item>

        <el-form-item label="商品库存" prop="seckillStock">
          <el-input v-model="Specsform.seckillStock"/>
        </el-form-item>

        <el-form-item label="是否是主推" prop="isMainPush">
          <el-select v-model="Specsform.isMainPush" placeholder="请选择" clearable size="small" style="width: 100%;" >
             <el-option v-for="(item, index) in isMainPushList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
          </el-select>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitEditSpecsform">修 改</el-button>
        <el-button @click="cancelEditSpecsform">删 除</el-button>
      </div>
    </el-dialog>




  </div>
</template>

<script>
import {listclassification,examineAppSeckillGoods,listBrand,listGoods,listAppSeckillGoods, getAppSeckillGoods, delAppSeckillGoods, addAppSeckillGoods, updateAppSeckillGoods, exportAppSeckillGoods } from "@/api/app/appSeckillGoods";
import imgUpload from '@/components/imgUpload'
export default {
  name: "AppSeckillGoods",
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
      // 小程序推荐商品关联表格数据
      appSeckillGoodsList: [],
      appSeckillSpecsList:[],
      brandList:[],
      goodsList:[],
      specsList:[],
      classificationList:[],
      openSpecs:false,
      editSpecs:false,
      Specsform:{},
      statusList:[
        {
          "dictLabel": "待审核",
          "dictValue": 0
        },
        {
          "dictLabel": "已审核",
          "dictValue": 1
        }
      ],

      isRecommandList:[
        {
          "dictLabel": "是",
          "dictValue": 1
        },
        {
          "dictLabel": "否",
          "dictValue": -1
        }
      ],

      isMainPushList:[
        {
          "dictLabel": "是",
          "dictValue": 1
        },
        {
          "dictLabel": "否",
          "dictValue": -1
        }
      ],

      isEdit:false,
      // 弹出层标题
      title: "",
      isMainNum:0,
      // 是否显示弹出层
      open: false,
      viewOpen:false,
      goodsDetails:null,
      goodsSpecifications:null,
      brandName:null,
      goodsPrice:null,
      selectIndex:null,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        goodsId: null,
        goodsName:null,
        status:null,
        sort: null,
        seckillStock: null,
        seckillSoldNum: null,
        seckillGoodsPrice: null,
        del: null
      },
       imgList: [],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        goodsId: [
          { required: true, message: "商品ID不能为空", trigger: "blur" }
        ],
        seckillStock: [
          { required: true, message: "库存不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getlistclassification();
  },
  methods: {



    isRecommandFormat(row, column) {
      return this.selectDictLabel(this.isRecommandList, row.isRecommand);
    },

    isMainPushFormat(row, column) {
      return this.selectDictLabel(this.isMainPushList, row.isMainPush);
    },



    addSpecs(){
     this.openSpecs=true
     this.Specsform={
       appSeckillSpecsName:null,
       originalPrice:null,
       seckillGoodsAmount:null,
       seckillGoodsPrice:null,
       limitation:null,
       isMainPush:-1,
       seckillStock:null,
       seckillSoldNum:null
     }
    },


    submitSpecsform(){
      this.isMainNum=0
        console.log(this.isMainNum)
      let data={
        appSeckillSpecsName:this.Specsform.appSeckillSpecsName,
        originalPrice:this.Specsform.originalPrice,
        seckillGoodsAmount:this.Specsform.seckillGoodsAmount,
        seckillGoodsPrice:this.Specsform.seckillGoodsPrice,
        limitation:this.Specsform.limitation,
        isMainPush:this.Specsform.isMainPush,
        seckillStock:this.Specsform.seckillStock,
        seckillSoldNum:this.Specsform.seckillSoldNum
      }

        this.specsList.push(data)
        if(this.specsList.length>0){
          console.log(this.isMainNum)
          console.log(this.specsList)
          for (var i = 0; i < this.specsList.length; i++) {
            if(this.specsList[i].isMainPush==1){
               this.isMainNum++
            }

          }
        }


        if(this.isMainNum>1){
          console.log(this.isMainNum)
          this.msgError("只能设置一个主推")
          this.specsList.pop()
          this.isMainNum=0
          return
        }


      this.openSpecs=false
    },


    cancelSpecsform(){
     this.openSpecs=false
    },



    EditSpecs(item,index){
      this.selectIndex=index
      this.Specsform={
        appSeckillSpecsName:item.appSeckillSpecsName,
        originalPrice:item.originalPrice,
        seckillGoodsAmount:item.seckillGoodsAmount,
        seckillGoodsPrice:item.seckillGoodsPrice,
        limitation:item.limitation,
        isMainPush:item.isMainPush,
        seckillStock:item.seckillStock,
        seckillSoldNum:item.seckillSoldNum
      }
      this.editSpecs=true
    },

    submitEditSpecsform(){
      this.specsList[this.selectIndex].appSeckillSpecsName=this.Specsform.appSeckillSpecsName
      this.specsList[this.selectIndex].originalPrice=this.Specsform.originalPrice
      this.specsList[this.selectIndex].seckillGoodsAmount=this.Specsform.seckillGoodsAmount
      this.specsList[this.selectIndex].seckillGoodsPrice=this.Specsform.seckillGoodsPrice
      this.specsList[this.selectIndex].limitation=this.Specsform.limitation
      this.specsList[this.selectIndex].isMainPush=this.Specsform.isMainPush
      this.specsList[this.selectIndex].seckillStock=this.Specsform.seckillStock
      this.specsList[this.selectIndex].seckillSoldNum=this.Specsform.seckillSoldNum
      this.editSpecs=false
    },

    cancelEditSpecsform(){
      this.$confirm('是否确认删除?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {

         this.specsList.splice(this.selectIndex,1)
         this.editSpecs=false

        }).catch((e) => {
          console.log(e)
        });
    },



    viewSpecs(data){
      this.appSeckillSpecsList=data.appSeckillSpecsList
      this.viewOpen=true
    },




    isStatusFormat(row, column) {
      return this.selectDictLabel(this.statusList, row.status);
    },


    /** 查询小程序推荐商品关联列表 */
    getList() {
      this.loading = true;
      listAppSeckillGoods(this.queryParams).then(response => {
        this.appSeckillGoodsList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },


     getlistclassification() {
       this.loading = true;
       listclassification().then(response => {
         this.classificationList = response.rows;
       });
     },




    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
     this.goodsSpecifications=null;
      this.form = {
        id: null,
        goodsId: null,
        sort: null,
        goodsName:null,
        goodsPrice:null,
        classificationId:null,
        sort:null,
        seckillStock: null,
        seckillSoldNum: null,
        seckillGoodsPrice: null,
        seckillEndTime:null,
        seckillStartTime:null,
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
      this.isEdit=false;
      this.open = true;
      this.title = "新增秒杀商品";
      this.specsList=[]
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
       this.isEdit=true;
      const id = row.id || this.ids
      getAppSeckillGoods(id).then(response => {
        this.form = response.data;
        let data = {
            url: response.data.goodsImgFull,
            relative_url: response.data.goodsImg
          }
        this.imgList.push(data)
        this.goodsDetails=response.data.goodsDetails
        this.goodsPrice=response.data.goodsPrice
        this.goodsSpecifications=response.data.goodsSpecifications
        this.brandName=response.data.brandName
        this.specsList=response.data.appSeckillSpecsList
        this.open = true;
        this.title = "修改秒杀商品";
      });
    },
    /** 提交按钮 */
    submitForm() {
      
      if(this.imgList.length!=0){
       this.form.goodsImg= this.imgList[0].relative_url
      }
      else{
        this.msgError("图片不能为空")
        return
      }

      this.form.appSeckillSpecsList=this.specsList

      console.log(this.form)



      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.isEdit) {
            updateAppSeckillGoods(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAppSeckillGoods(this.form).then(response => {
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
      this.$confirm('是否确认删除小程序推荐商品关联编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delAppSeckillGoods(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有小程序推荐商品关联数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportAppSeckillGoods(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    },


    handleShenHe(row){
      this.$confirm('是否确认审核?', "警告", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          let data={
            id:row.id,
            status:1
          }
          return examineAppSeckillGoods(data);
        })
        .then(() => {
          this.msgSuccess("审核成功");
          this.getList();
        })
        .catch(function() {

        });
    },


    handleFanShenHe(row){
      this.$confirm('是否确认反审核?', "警告", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          let data={
            id:row.id,
            status:0
          }
          return examineAppSeckillGoods(data);
        })
        .then(() => {
          this.msgSuccess("反审核成功");
          this.getList();
        })
        .catch(function() {

        });
    },


  }
};
</script>

<style scoped>

  .addBorder{
    border: 1px solid #1890ff;
  }

  .addBorder2{
    border: 1px solid #DCDFE6;
  }

</style>
