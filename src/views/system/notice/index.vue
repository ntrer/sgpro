<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="公告标题" prop="newsName">
        <el-input
          v-model="queryParams.newsName"
          placeholder="请输入公告标题"
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
          v-hasPermi="['system:notice:add']"
        >新增</el-button>
      </el-col>

    </el-row>

    <el-table  border v-loading="loading" :data="noticeList">
      <el-table-column
        label="公告标题"
        align="center"
        prop="newsName"
        :show-overflow-tooltip="true"
      />
      
      <el-table-column
        label="置顶"
        align="center"
        prop="isTop"
        :formatter="topFormat"
        width="100"
      />

      <el-table-column
        label="状态"
        align="center"
        prop="status"
        :formatter="statusFormat"
        width="100"
      />
      <el-table-column label="创建时间" align="center" prop="createTime" width="160">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">


          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['sys:notice:edit']"
          >修改</el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleEnable(scope.row)"
            v-if="scope.row.enable==-1"
            v-hasPermi="['sys:notice:enable']"
          >启用</el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleDisEnable(scope.row)"
             v-if="scope.row.enable==1"
            v-hasPermi="['sys:notice:enable']"
          >停用</el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:notice:remove']"
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

    <!-- 添加或修改公告对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="公告标题" prop="newsName">
              <el-input v-model="form.newsName" placeholder="请输入公告标题" />
            </el-form-item>

            <el-form-item label="是否置顶" prop="isTop">
            <el-select v-model="form.isTop" placeholder="请选择" clearable style="width: 100%">
              <el-option v-for="(item, index) in isTopList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
            </el-select>
            </el-form-item>

          </el-col>

          <el-col :span="24">


            <el-form-item label="公告内容">
              <div v-loading="loading">
                <el-upload class="avatar-uploader" :action="serverUrl" name="file" accept=".jpg,.jpeg,.png" :show-file-list="false"
                  :on-success="uploadSuccess" :on-error="uploadError" :before-upload="beforeUpload">
                </el-upload>

              <!--  <el-upload class="video-uploader" :action="serverUrl" name="file" :auto-upload="false" accept="video/mp4" :show-file-list="false"
                 >
                </el-upload> -->
                  <quill-editor
                   class="my-editor"
                   v-model="form.newsDesc"
                   ref="myQuillEditor"
                   :options="editorOption"
                   @change="onEditorChange($event)"
                   >
                   </quill-editor>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {enableNotice, listNotice, getNotice, delNotice, addNotice, updateNotice } from "@/api/system/notice";
import Editor from '@/components/Editor';
import { quillEditor, Quill } from 'vue-quill-editor';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

const toolbarOptions = [
 ['bold', 'italic', 'underline', 'strike'],  // toggled buttons
 [{'header': 1}, {'header': 2}],    // custom button values
 [{'list': 'ordered'}, {'list': 'bullet'}],
 [{'indent': '-1'}, {'indent': '+1'}],   // outdent/indent
 [{'direction': 'rtl'}],       // text direction
 [{'size': ['small', false, 'large', 'huge']}], // custom dropdown
 [{'header': [1, 2, 3, 4, 5, 6, false]}],
 [{'color': []}, {'background': []}],   // dropdown with defaults from theme
 [{'font': []}],
 [{'align': []}],
 ['link', 'image'],
 ['clean']

 ]

export default {
  name: "Notice",
  components: {
    Editor,
    quillEditor
  },
  data() {
    return {


      enableList:[
        {
          "dictLabel": "启用",
          "dictValue": 1
        },
        {
          "dictLabel": "停用",
          "dictValue": -1
        }
      ],

      isTopList:[
        {
          "dictLabel": "置顶",
          "dictValue": 1
        },
        {
          "dictLabel": "不置顶",
          "dictValue": -1
        }
      ],


      // 遮罩层
      loading: true,
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
      // 公告表格数据
      noticeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 类型数据字典
      statusOptions: [],
      // 状态数据字典
      typeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        newsName: undefined,
        createBy: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        newsName: [
          { required: true, message: "公告标题不能为空", trigger: "blur" }
        ]
      },

      serverUrl: this.UPLOADURL.BaseUrl+"/common/upload",
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
        content: null,
        editorOption: {
         placeholder: '',
         theme: 'snow', // or 'bubble'
         modules: {
         toolbar: {
          container: toolbarOptions,
          handlers: {
          'image': function (value) {
           if (value) {
           // 触发input框选择图片文件
           document.querySelector('.avatar-uploader input').click()
           } else {
           this.quill.format('image', false);
           }
          },

          'video': function (value) {
           if (value) {
           // 触发input框选择图片文件
           document.querySelector('.video-uploader input').click()
           } else {
           this.quill.format('video', false);
           }
          },



          }
         }
         }
        },
    };
  },
  created() {
    this.getList();

  },
  methods: {
    /** 查询公告列表 */
    getList() {
      this.loading = true;
      listNotice(this.queryParams).then(response => {
        this.noticeList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },


    onEditorChange({editor, html, text}) {//内容改变事件
      console.log("---内容改变事件---")
      this.content = html
      console.log(html)
      },
      // 富文本图片上传前
      beforeUpload() {
       this.loading=true;
      },

      uploadSuccess(res, file) {
        // res为图片服务器返回的数据
        // 获取富文本组件实例
        console.log(res);
        let quill = this.$refs.myQuillEditor.quill
        // 如果上传成功
        if (res.url) {
           this.loading=false;
         // 获取光标所在位置
         let length = quill.getSelection().index;
         // 插入图片 res.url为服务器返回的图片地址
         quill.insertEmbed(length, 'image', res.url)
         // 调整光标到最后
         quill.setSelection(length + 1)
        } else {
           this.loading=false;
          console.log("插入失败");
         this.$message.error('图片插入失败')
        }

        },
        // 富文本图片上传失败
        uploadError() {
           this.loading=false;
           console.log("上传失败");
        this.$message.error('图片插入失败')
        },



     topFormat(row, column) {
      return this.selectDictLabel(this.isTopList, row.isTop);
    },
    
    // 公告状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.enableList, row.enable);
    },
    // 公告状态字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.noticeType);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        newsName: undefined,
        noticeType: undefined,
        newsDesc: undefined,
        status: "0"
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
      this.ids = selection.map(item => item.noticeId)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加公告";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const noticeId = row.id || this.ids
      getNotice(noticeId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改公告";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateNotice(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addNotice(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },


    handleEnable(row) {
      const noticeIds = row.id || this.ids
      this.$confirm('是否确认启用', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          let data={
            id:noticeIds,
            enable:1
          }
          return enableNotice(data);
        }).then(() => {
          this.getList();
          this.msgSuccess("启用成功");
        }).catch(() => {});
    },

    handleDisEnable(row) {
      const noticeIds = row.id || this.ids
      this.$confirm('是否确认停用', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          let data={
            id:noticeIds,
            enable:-1
          }
          return enableNotice(data);
        }).then(() => {
          this.getList();
          this.msgSuccess("停用成功");
        }).catch(() => {});
    },


    /** 删除按钮操作 */
    handleDelete(row) {
      const noticeIds = row.id || this.ids
      this.$confirm('是否确认删除公告编号为"' + noticeIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delNotice(noticeIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    }
  }
};
</script>

<style scoped>
  .my-editor/deep/.ql-editor { min-height: 260px; }

  .ql-editor.ql-blank, .ql-editor {
   height: 350px;
   }


   .my-editor/deep/video::-webkit-media-controls-fullscreen-button {
       display: none;
   }
</style>
