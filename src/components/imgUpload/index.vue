/**
 * 图片上传 公共组件
 */
<template>
  <div class="uploadWrapper">
   <vuedraggable
      class="vue-draggable"
      :class="{ single: isSingle, maxHidden: isMaxHidden }"
      v-model="imgList"
      tag="ul"
      draggable=".draggable-item"
      @start="onDragStart"
      @end="onDragEnd"
    >
      <!-- 拖拽元素 -->
      <li
        v-for="(item, index) in imgList"
        :key="item.url + index"
        class="draggable-item"
        :style="{ width: width + 'px', height: height + 'px' }"
      >
        <el-image :src="item.url" :preview-src-list="[item.url]"></el-image>
        <div class="shadow" @click="onRemoveHandler(index)">
          <i class="el-icon-delete"></i>
        </div>
      </li>
      <!-- 上传按钮 -->
      <el-upload
        slot="footer"
        ref="uploadRef"
        class="uploadBox"
        :style="{ width: width + 'px', height: height + 'px' }"
        accept=".jpg,.jpeg,.png"
        :action="uploadUrl"
        :show-file-list="false"
        :multiple="!isSingle"
        :limit="limit"

        :before-upload="beforeUpload"
        :on-success="onSuccessUpload"
        :on-change="changeUpload"
        :on-exceed="onExceed"
      >
        <i class="uploadIcon el-icon-plus" style=" width: 100%;height: 100%;position: relative;display: flex;align-items: center;justify-content: center;border: 1px dashed #c0ccda;background-color: #fbfdff;border-radius: 6px;font-size: 20px;color: #999;">
          <span class="uploading" v-show="isUploading">正在上传...</span>
          <span
            v-if="!isUploading && limit && limit!==99 && !isSingle"
            class="limitTxt"
          >上传图片</span>
        </i>
      </el-upload>
    </vuedraggable>
  </div>
</template>

<script>
import vuedraggable from 'vuedraggable'
import { validImgUpload } from '@/utils/validate'
import lrz from 'lrz' // 前端图片压缩插件
import tools from '@/utils/tools'

export default {
  name: 'ImgUpload',

  props: {
    // 图片数据(图片url组成的数组) 通过v-model传递
    value: {
      type: Array,
      default () {
        return []
      }
    },

    imgtype:{
      type: Number,
      default: 0
    },

    // 限制上传的图片数量
    limit: {
      type: Number,
      default: 99
    },
    // 限制上传图片的文件大小(kb)
    size: {
      type: Number,
      default: 5000
    },
    // 是否是单图上传(单图上传就是已传图片和上传按钮重叠)
    isSingle: {
      type: Boolean,
      default: false
    },
    // 是否使用图片压缩
    useCompress: {
      type: Boolean,
      default: false
    },
    // 图片显示的宽度(px)
    width: {
      type: Number,
      default: 100
    },
    // 图片显示的高度(px)
    height: {
      type: Number,
      default: 100
    },
    isSizeLimit:{
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      isUploading: false, // 正在上传状态
      isFirstMount: true ,// 控制防止重复回显
      uploadUrl:this.UPLOADURL.BaseUrl+"/common/upload"
    }
  },

  computed: {


    // 图片数组数据
    imgList: {
      get () {
        return this.value
      },
      set (val) {
        if (val.length < this.imgList.length) {
          // 判断是删除图片时同步el-upload数据
          this.syncElUpload(val)
        }
        // 同步v-model
        this.$emit('input', val)
      }
    },
    // 控制达到最大限制时隐藏上传按钮
    isMaxHidden () {
      return this.imgList.length >= this.limit
    },
    
    
    
  },

  watch: {
    value: {
      handler (val) {
        if (this.isFirstMount && this.value.length > 0) {
          this.syncElUpload()
        }
      },
      deep: true
    },

  },

  mounted () {
    console.log(this.value)
    if (this.value.length > 0) {
      this.syncElUpload()
    }

    if(this.imgtype==1){
      this.uploadUrl= this.UPLOADURL.BaseUrl+"/common/upload?type=1"
    }
    else if(this.imgtype==2)
    {
      this.uploadUrl=this.UPLOADURL.BaseUrl+"/common/upload?type=2"
    }
    else if(this.imgtype==3)
    {
      this.uploadUrl=this.UPLOADURL.BaseUrl+"/common/upload?type=100"
    }
    else if(this.imgtype==11){
      this.uploadUrl=this.UPLOADURL.BaseUrl+"/common/upload?type=10"
    }
    else{
      this.uploadUrl=this.UPLOADURL.BaseUrl+"/common/upload"
    }

  },

  methods: {
    // 同步el-upload数据
    syncElUpload (val) {
      const imgList = val || this.imgList
      this.$refs.uploadRef.uploadFiles = imgList.map((v, i) => {
        return {
          name: "file",
          url: v,
          status: 'success',
          uid: tools.createUniqueString()
        }
      })
      this.isFirstMount = false
    },
    // 上传图片之前
    beforeUpload (file) {
      console.log(file)
          if(this.isSizeLimit){
            const isSize = new Promise(function(resolve, reject) {
                let width = 750;
                let height = 1334;
                let _URL = window.URL || window.webkitURL;
                let image = new Image();
                image.onload = function() {
                  let valid = image.width == width && image.height == height;
                  valid ? resolve() : reject();
                };
                image.src = _URL.createObjectURL(file);
            }).then(
                () => {
                  return file;
                },
                () => {
                  this.$message.error("上传头像图片尺寸不符合,只能是750*1334!");
                  return Promise.reject();
                }
              );
            return isSize;
          }



      this.isFirstMount = false

      if(file.size>3000000){
        console.log("压缩")
        // 图片压缩
        return new Promise((resolve, reject) => {
          lrz(file, { quality: 0.7 }).then((rst) => {
             console.log(rst)
            file = this.dataURLtoFile(rst.base64, rst.origin.name);
            // file = rst.file
          }).always(() => {
            if (validImgUpload(file, this.size)) {
              this.isUploading = true
              resolve(file)
            } else {
              reject(new Error())
            }
          })
        })
      }
      else{
        console.log("222222222")
        if (validImgUpload(file, this.size)) {
          this.isUploading = true
          return true
        } else {
          return false
        }
      }

      // if (this.useCompress) {
      //   console.log("压缩")
      //   // 图片压缩
      //   return new Promise((resolve, reject) => {
      //     lrz(file, { quality: 0.6 }).then((rst) => {
      //        console.log(rst)
      //       file = this.dataURLtoFile(rst.base64, rst.origin.name);
      //       // file = rst.file
      //     }).always(() => {
      //       if (validImgUpload(file, this.size)) {
      //         this.isUploading = true
      //         resolve(file)
      //       } else {
      //         reject(new Error())
      //       }
      //     })
      //   })
      // } else {
      //   console.log("222222222")
      //   if (validImgUpload(file, this.size)) {
      //     this.isUploading = true
      //     return true
      //   } else {
      //     return false
      //   }
      // }
    },


        //转换base64
        dataURLtoFile(dataurl, filename) {
          // 将base64转换为file文件
          // 参数dataurl base64字符串
          // 参数filename	图片名称
          let arr = dataurl.split(",");
          let mime = arr[0].match(/:(.*?);/)[1];
          let bstr = atob(arr[1]);
          let n = bstr.length;
          let u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new File([u8arr], filename, {
            type: mime,
          });
        },

    changeUpload(file, fileList){
       // this.imgList.push(file)

    },

    // 上传完单张图片
    onSuccessUpload (res, file, fileList) {
       console.log("sfasfs")
       console.log(res)
      // 这里需要根据你自己的接口返回数据格式和层级来自行修改
      if (res.url) {
      	// 判断接口上传成功
        if (this.imgList.length < this.limit) {
          // 未超限时，把接口返回的图片url地址添加到imgList
          let data={
            relative_url:res.fileName,
            url:res.url
          }
          this.imgList.push(data)

        }
      } else {
      	// 判断接口上传失败
        this.syncElUpload()
        this.$message({ type: 'error', message: res.msg })
      }
      this.isUploading = false
    },
    // 移除单张图片
    onRemoveHandler (index) {
      this.$confirm('确定删除该图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.imgList = this.imgList.filter((v, i) => {
            return i !== index
          })
        })
        .catch(() => {})
    },
    // 超限
    onExceed () {
      this.$refs.uploadRef.abort() // 取消剩余接口请求
      this.syncElUpload()
      this.$message({
        type: 'warning',
        message: `图片超限，最多可上传${this.limit}张图片`
      })
    },
    onDragStart (e) {
      e.target.classList.add('hideShadow')
    },
    onDragEnd (e) {
      e.target.classList.remove('hideShadow')
    }

  },

  components: { vuedraggable }
}
</script>

<style scoped>

  .uploadIcon {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #c0ccda;
    background-color: #fbfdff;
    border-radius: 6px;
    font-size: 20px;
    color: #999;
  }
  .uploadIcon .limitTxt,
  .uploadIcon .uploading {
    position: absolute;
    bottom: 10%;
    left: 0;
    width: 100%;
    font-size: 14px;
    text-align: center;
  }

  .uploadBox/deep/.el-upload {
    width: 100%;
    height: 100%;
  }


  .vue-draggable {
    display: flex;
    flex-wrap: wrap;
    margin-left: -40px;
  }
  .vue-draggable .draggable-item {
    margin-right: 5px;
    margin-bottom: 5px;
    border: 1px solid #ddd;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
  }
  .vue-draggable .draggable-item .el-image {
    width: 100%;
    height: 100%;
  }
  .vue-draggable .draggable-item .shadow {
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity .3s;
    color: #fff;
    font-size: 20px;
    line-height: 20px;
    padding: 2px;
    cursor: pointer;
  }
  .vue-draggable .draggable-item:hover .shadow {
    opacity: 1;
  }
  .vue-draggable.hideShadow .shadow {
    display: none;
  }
  .vue-draggable.single {
    overflow: hidden;
    position: relative;
  }
  .vue-draggable.single .draggable-item {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
  .vue-draggable.maxHidden .uploadBox {
    display: none;
  }
  .el-image-viewer__wrapper .el-image-viewer__mask {
    opacity: .8;
  }
  .el-image-viewer__wrapper .el-icon-circle-close {
    color: #fff;
  }
</style>
