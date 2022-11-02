<template>
  <div class="app-container">

      <!--部门数据-->
     <!-- <el-col :span="4" :xs="24">
        <div class="head-container">
          <el-input
            v-model="deptName"
            placeholder="请输入部门名称"
            clearable
            size="small"
            prefix-icon="el-icon-search"
            style="margin-bottom: 20px"
          />
        </div>
        <div class="head-container">
          <el-tree
            :data="deptOptions"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            ref="tree"
            default-expand-all
            @node-click="handleNodeClick"
          />
        </div>
      </el-col> -->
      <!--用户数据-->

        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
          <el-form-item label="用户账号" prop="userName">
            <el-input
              v-model="queryParams.userName"
              placeholder="请输入"
              clearable
              size="small"
              style="width: 160px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>


          <el-form-item label="微信昵称" prop="wxNickName">
            <el-input
              v-model="queryParams.wxNickName"
              placeholder="请输入"
              clearable
              size="small"
              style="width: 160px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>


          <el-form-item label="品牌名称" prop="brandId"  v-if="userType!=5&&userType!=11">
            <el-select v-model="queryParams.brandId"  placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in brandList"
                :key="item.id"
                :label="item.brandName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>


          <!-- <el-form-item label="手机号码" prop="phonenumber">
            <el-input
              v-model="queryParams.phonenumber"
              placeholder="请输入手机号码"
              clearable
              size="small"
              style="width: 160px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item> -->

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
              v-hasPermi="['system:user:add']"
            >新增</el-button>

            <el-button
              type="primary"
              plain
              icon="el-icon-plus"
              size="mini"
              @click="handleQrcode"
              v-if="userType==1||userType==7||userType==3||userType==9"
            >注册导购</el-button>


          </el-col>
          <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
        </el-row>

        <el-table border v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
          <el-table-column label="用户账号" align="center" key="userName" prop="userName" width="160"/>
          <el-table-column label="用户昵称" align="center" key="nickName" prop="nickName"  width="160"/>
          <el-table-column label="微信昵称" align="center" key="wxNickName" prop="wxNickName"  width="160"/>
          <!-- <el-table-column label="微信头像" align="center" width="140">
            <template slot-scope="scope">
              <el-image
                  style="height: 60px"
                   fit="contain"
                  :src="scope.row.headPortraitImageUrl"
                  >
                </el-image>
            </template>

          </el-table-column> -->
          <el-table-column label="所属品牌" align="center" key="brandName" prop="brandName" width="160"/>
          <!-- <el-table-column label="手机号码" align="center" key="phonenumber" prop="phonenumber" width="160"/> -->
          <el-table-column label="头像" align="center" width="140">
            <template slot-scope="scope">
              <el-image
                  style="height: 60px"
                   fit="contain"
                  :src="scope.row.avatarFull"
                  >
                </el-image>
            </template>

          </el-table-column>

          <el-table-column label="微信二维码" align="center" width="140">
            <template slot-scope="scope">
              <el-image
                  style="height: 60px"
                   fit="contain"
                  :src="scope.row.wxQrCodeFull"
                  >
                </el-image>
            </template>

          </el-table-column>

          <!-- <el-table-column label="职位" align="center" key="phonenumber" prop="phonenumber"/> -->

          <el-table-column label="创建时间" align="center" prop="createTime" v-if="columns[6].visible" width="160">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime,'{y}-{m}-{d} {hh}:{mm}:{ss}') }}</span>
            </template>
          </el-table-column>

          <el-table-column label="是否开启签到" align="center" key="phonenumber" prop="phonenumber" :formatter="isOpenformatFormat"/>
          <el-table-column label="授权状态" align="center" key="isBindWx" prop="isBindWx" :formatter="isBindWxFormat"/>

          <el-table-column label="状态" align="center" key="status" :formatter="statusTypeformat"/>


          <el-table-column
            label="操作"
            align="center"
            width="160"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope" v-if="scope.row.userId !== 1">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['system:user:edit']"
              >修改</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                v-hasPermi="['system:user:remove']"
              >删除</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-key"
                @click="handleResetPwd2(scope.row)"
                v-hasPermi="['system:user:resetPwd']"
              >重置密码</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                v-if="scope.row.isBindWx==0"
                @click="handleShouQuan(scope.row)"
              >微信授权</el-button>

              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                v-if="scope.row.isBindWx==1"
                @click="handleJieBang(scope.row)"
              >解除绑定</el-button>

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


    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
         <el-form-item label="用户账号" prop="userName">
           <el-input v-model="form.userName" placeholder="请输入手机号" :disabled="isEdit"/>
         </el-form-item>
         <el-form-item label="用户昵称" prop="nickName">
           <el-input v-model="form.nickName" placeholder="请输入" />
         </el-form-item>
        <!-- <el-form-item label="手机号" prop="phonenumber">
           <el-input v-model="form.phonenumber" placeholder="请输入" />
         </el-form-item> -->
         <!-- <el-form-item label="用户邮箱" prop="email">
           <el-input v-model="form.email" placeholder="请输入" />
         </el-form-item> -->
 <!--        <el-form-item label="所属品牌" prop="payType">
           <el-select v-model="form.payType" placeholder="请选择" clearable size="small"  style="width: 160px;">
             <el-option v-for="(item, index) in payTypeList" :key="index" :label="item.dictLabel" :value="item.dictValue"/>
           </el-select>
         </el-form-item>

         <el-form-item label="职位" prop="payType">
           <el-select v-model="form.payType" placeholder="请选择" clearable size="small"  style="width: 160px;">
             <el-option v-for="(item, index) in payTypeList" :key="index" :label="item.dictLabel" :value="item.dictValue"/>
           </el-select>
         </el-form-item> -->

         <el-form-item label="是否开启签到" prop="isOpenSign">
           <el-select v-model="form.isOpenSign" placeholder="请选择" clearable size="small" style="width: 100%;">
             <el-option v-for="(item, index) in isOpenSignList" :key="index" :label="item.dictLabel" :value="item.dictValue"/>
           </el-select>
         </el-form-item>

         <el-form-item label="头像" prop="headPortraitImageUrlFull" class="require">
           <imgUpload ref="imageupload" v-model="imgList" :limit="1" :isSingle="false"></imgUpload>
         </el-form-item>

         <el-form-item label="微信二维码" prop="headPortraitImageUrlFull" class="require">
           <imgUpload ref="imageupload2" v-model="imgList2" :limit="1" :isSingle="false"></imgUpload>
         </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 用户导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          <el-checkbox v-model="upload.updateSupport" />是否更新已经存在的用户数据
          <el-link type="info" style="font-size:12px" @click="importTemplate">下载模板</el-link>
        </div>
        <div class="el-upload__tip" style="color:red" slot="tip">提示：仅允许导入“xls”或“xlsx”格式文件！</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>



    <el-dialog :visible.sync="dialogVisible" width="400px">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <el-dialog title="重置密码" :visible.sync="openPwd" width="500px" append-to-body>
       <el-form ref="pwdform" :model="pwdform" label-width="80px">
      <el-form-item label="新密码" prop="resetPwd">
        <el-input v-model="resetPwd" placeholder="请输入" type="password" show-password auto-complete="new-password"/>
      </el-form-item>
       </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitPwd">确 定</el-button>
        <el-button @click="cancelPwd">取 消</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import {unBoundRole,getauthSignuserQrCode,getAuthUserQrCode, listUser, getUser, delUser, addUser, updateUser, exportUser, resetUserPwd, changeUserStatus, importTemplate } from "@/api/system/user";
import {listBrand} from "@/api/dataManage/goods";
import { getToken } from "@/utils/auth";
import { treeselect } from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import imgUpload from '@/components/imgUpload'

export default {
  name: "User",
  components: { Treeselect,imgUpload},
  data() {
    return {


      statusTypeList:[
        {
          "dictLabel": "正常",
          "dictValue": 0
        },
        {
          "dictLabel": "未启用",
          "dictValue": 1
        }
      ],


      isOpenSignList:[
        {
          "dictLabel": "开启",
          "dictValue": 1
        },
        {
          "dictLabel": "关闭",
          "dictValue": -1
        }
      ],

      isBindWxList:[
        {
          "dictLabel": "已授权",
          "dictValue": 1
        },
        {
          "dictLabel": "未授权",
          "dictValue": 0
        }
      ],

      isEdit:false,
      pwdform:{},
      resetId:null,
      resetPwd:null,
      openPwd:false,
      userType:null,
      userId:null,
      organizationId:null,
      dialogVisible:false,
      dialogImageUrl:'',
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
      // 用户表格数据
      userList: null,
      // 弹出层标题
      title: "",
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      open: false,
      // 部门名称
      deptName: undefined,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [],
      // 性别状态字典
      sexOptions: [],
      // 岗位选项
      postOptions: [],
      // 角色选项
      roleOptions: [],
      // 表单参数
      form: {},
      imgList:[],
      imgList2:[],
      brandList:[],
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/system/user/importData"
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        brandId:undefined,
        userName: undefined,
        wxNickName:null,
        phonenumber: undefined,
        status: undefined,
        deptId: undefined
      },
      // 列信息
      columns: [
        { key: 0, label: `用户编号`, visible: true },
        { key: 1, label: `用户名称`, visible: true },
        { key: 2, label: `用户昵称`, visible: true },
        { key: 3, label: `部门`, visible: true },
        { key: 4, label: `手机号码`, visible: true },
        { key: 5, label: `状态`, visible: true },
        { key: 6, label: `创建时间`, visible: true }
      ],
      // 表单校验
      rules: {
        userName: [
          { required: true, message: "用户名称不能为空", trigger: "blur" }
        ],
        nickName: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "用户密码不能为空", trigger: "blur" },
          { min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur' }
        ],
        email: [
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phonenumber: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {

    this.userId=localStorage.getItem("userId")
    this.organizationId=localStorage.getItem("organizationId")
    this.userType=localStorage.getItem("userType")
    if(this.userType!=5&&this.userType!=11){
      this.getlistBrand();
    }

    this.getList();
    this.getTreeselect();
    this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data;
    });
    this.getDicts("sys_user_sex").then(response => {
      this.sexOptions = response.data;
    });
    this.getConfigKey("sys.user.initPassword").then(response => {
      this.initPassword = response.msg;
    });
  },
  methods: {


    handleResetPwd2(row){
     this.resetId=row.userId
     this.resetPwd=null
     this.openPwd=true
    },

    submitPwd(){
      let data={
        userId:this.resetId,
        password:this.resetPwd
      }
      resetUserPwd(data).then(response => {
        this.msgSuccess("重置成功");
        this.openPwd=false
        this.resetPwd=null
      });
    },

    cancelPwd(){
       this.openPwd=false
       this.resetPwd=null
    },


    // 字典状态字典翻译
    statusTypeformat(row, column) {
      return this.selectDictLabel(this.statusTypeList, row.status);
    },

    isOpenformatFormat(row, column) {
      return this.selectDictLabel(this.isOpenSignList, row.isOpenSign);
    },

    isBindWxFormat(row, column) {
      return this.selectDictLabel(this.isBindWxList, row.isBindWx);
    },

    getlistBrand(){
      listBrand(this.queryParams).then(response => {
        this.brandList = response.data;
      });
    },



    /** 查询用户列表 */
    getList() {
      this.loading = true;
      listUser(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
          this.userList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then(response => {
        this.deptOptions = response.data;
      });
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.deptId = data.id;
      this.getList();
    },
    // 用户状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$confirm('确认要"' + text + '""' + row.userName + '"用户吗?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return changeUserStatus(row.userId, row.status);
        }).then(() => {
          this.msgSuccess(text + "成功");
        }).catch(function() {
          row.status = row.status === "0" ? "1" : "0";
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
      this.imgList2=[];
      this.form = {
        userId: undefined,
        deptId: undefined,
        userName: undefined,
        brandId:undefined,
        nickName: undefined,
        password: undefined,
        phonenumber: undefined,
        email: undefined,
        sex: undefined,
        status: "0",
        remark: undefined,
        postIds: [],
        roleIds: [],
        isOpenSign:undefined
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
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.userId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    // 更多操作触发
    handleCommand(command, row) {
      switch (command) {
        case "handleResetPwd":
          this.handleResetPwd(row);
          break;
        case "handleAuthRole":
          this.handleAuthRole(row);
          break;
        default:
          break;
      }
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.isEdit=false
       this.open = true;
      this.title="新增用户"
      this.$nextTick(() => {
        this.$refs.imageupload.syncElUpload();
      })
      this.$nextTick(() => {
        this.$refs.imageupload2.syncElUpload();
      })
    },



    handleQrcode(){
     let data={
       userId:this.userId,
       organizationId:this.organizationId
     }

      getauthSignuserQrCode(data).then(response => {
        console.log(response)
        const blob = new Blob([response]);
        const url = window.URL.createObjectURL(blob);
        console.log(url)
        this.dialogVisible=true
        this.dialogImageUrl=url
      });
    },



    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.isEdit=true
      const userId = row.userId || this.ids;
      getUser(userId).then(response => {
        this.form = response.data;
        let data = {
            url: response.data.avatarFull,
            relative_url: response.data.avatar
          }
        this.imgList.push(data)

        let data2 = {
            url: response.data.wxQrCodeFull,
            relative_url: response.data.wxQrCode
          }
        this.imgList2.push(data2)


        this.open = true;
        this.title = "修改用户";
        this.form.password = "";
      });
    },
    /** 重置密码按钮操作 */
    handleResetPwd(row) {
      this.$prompt('请输入"' + row.userName + '"的新密码', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        inputPattern: /^.{5,20}$/,
        inputErrorMessage: "用户密码长度必须介于 5 和 20 之间",
      }).then(({ value }) => {
          resetUserPwd(row.userId, value).then(response => {
            this.msgSuccess("修改成功，新密码是：" + value);
          });
        }).catch(() => {});
    },
    /** 分配角色操作 */
    handleAuthRole: function(row) {
      const userId = row.userId;
      this.$router.push("/auth/role/" + userId);
    },
    /** 提交按钮 */
    submitForm: function() {



      if(this.imgList.length!=0){
       this.form.avatar= this.imgList[0].relative_url
      }
      else{
        this.form.avatar= ''
      }


      if(this.imgList2.length!=0){
       this.form.wxQrCode= this.imgList2[0].relative_url
      }
      else{
        this.form.wxQrCode= ''
      }


      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.userId != undefined) {
            updateUser(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addUser(this.form).then(response => {
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
      const userIds = row.userId || this.ids;
      this.$confirm('是否确认删除该用户?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          return delUser(userIds);
        }).then(response => {
         this.getList()
        }).catch(() => {});
    },



    handleShouQuan(row){
      const userIds = row.userId || this.ids;
      let data={
        userId:userIds
      }
      getAuthUserQrCode(data).then(response => {

        const blob = new Blob([response]);
        const url = window.URL.createObjectURL(blob);
        console.log(url)
        this.dialogVisible=true
        this.dialogImageUrl=url
      });
    },

    handleJieBang(row){
      const userIds = row.userId || this.ids;
      this.$confirm('是否确认解除绑定?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let data={
             userId:userIds
          }
          return unBoundRole(data);
        }).then(response => {
         this.getList()
        }).catch(() => {});
    },




    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有用户数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportUser(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      importTemplate().then(response => {
        this.download(response.msg);
      });
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
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
