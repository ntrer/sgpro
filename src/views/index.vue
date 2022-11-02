<template>
  <div class="app-container home">
    <el-row :gutter="20" v-if="userType==0||userType==6">

      <img src="../assets/images/bg.png" style="width: 100%;height: 100%;">

    </el-row>


    <el-row :gutter="20" style="padding-top: 30px;display: flex;justify-content: center;" v-if="userType==5||userType==11">
          <el-col :span="6">
            <el-card class="update-log bg1" style="height: 120px;border-radius: 10px;">
              <div style="width: 100%;flex-direction: column; display: flex;align-items: center;">

                <span style="color: white;font-size: 13px;font-weight: bold;">
                  今日订单笔数
                </span>

                <div style="height: 1px;background-color: white;width: 100%;opacity: 0.5;margin-top: 10px;"/>
              </div>

              <div style="display: flex;justify-content: center;align-items: center;height: 80px;color: white;">
                 <span style="font-size: 32px;">{{orderNum}}</span>
              </div>


            </el-card>
          </el-col>
          <el-col :span="6">
       <el-card class="update-log bg2" style="height: 120px;background-color: #13CE66;border-radius: 10px;">
         <div style="width: 100%;flex-direction: column; display: flex;align-items: center;">

           <span style="color: white;font-size: 13px;font-weight: bold;">
             今日交易金额
           </span>

           <div style="height: 1px;background-color: white;width: 100%;opacity: 0.5;margin-top: 10px;"/>
         </div>

         <div style="display: flex;justify-content: center;align-items: center;height: 80px;color: white;">
            <span style="font-size: 32px;">{{orderCount}}</span>
         </div>


       </el-card>
          </el-col>

         <el-col :span="6">
           <el-card class="update-log bg3" style="height: 120px;background-color: #13CE66;border-radius: 10px;">
             <div style="width: 100%;flex-direction: column; display: flex;align-items: center;">

               <span style="color: white;font-size: 13px;font-weight: bold;">
                 今日抖音浏览量
               </span>

               <div style="height: 1px;background-color: white;width: 100%;opacity: 0.5;margin-top: 10px;"/>
             </div>

             <div style="display: flex;justify-content: center;align-items: center;height: 80px;color: white;">
                <span style="font-size: 32px;">{{douyinVideoBrowseNum}}</span>
             </div>


           </el-card>
          </el-col>

         <el-col :span="6">
            <el-card class="update-log bg4" style="height: 120px;background-color: #13CE66;border-radius: 10px;">
              <div style="width: 100%;flex-direction: column; display: flex;align-items: center;">

                <span style="color: white;font-size: 13px;font-weight: bold;">
                  今日抖音转发量
                </span>

                <div style="height: 1px;background-color: white;width: 100%;opacity: 0.5;margin-top: 10px;"/>
              </div>

              <div style="display: flex;justify-content: center;align-items: center;height: 80px;color: white;">
                 <span style="font-size: 32px;">{{douyinVideoShareNum}}</span>
              </div>


            </el-card>
          </el-col>

        </el-row>


     <el-row :gutter="20" style="padding-top: 30px;display: flex;" v-if="userType!=0&&userType!=6&&userType!=5&&userType!=11">
           <el-col :span="4">
             <el-card class="update-log bg1" style="height: 120px;background-color: #13CE66; border-radius: 10px;">
               <div style="width: 100%;flex-direction: column; display: flex;align-items: center;">

                 <span style="color: white;font-size: 13px;font-weight: bold;">
                   今日订单笔数
                 </span>

                 <div style="height: 1px;background-color: white;width: 100%;opacity: 0.5;margin-top: 10px;"/>
               </div>

               <div style="display: flex;justify-content: center;align-items: center;height: 80px;color: white;">
                  <span style="font-size: 32px;">{{orderNum}}</span>
               </div>


             </el-card>
           </el-col>
           <el-col :span="4">
        <el-card class="update-log bg2" style="height: 120px;background-color: #13CE66;border-radius: 10px;">
          <div style="width: 100%;flex-direction: column; display: flex;align-items: center;">

            <span style="color: white;font-size: 13px;font-weight: bold;">
              今日交易金额
            </span>

            <div style="height: 1px;background-color: white;width: 100%;opacity: 0.5;margin-top: 10px;"/>
          </div>

          <div style="display: flex;justify-content: center;align-items: center;height: 80px;color: white;">
             <span style="font-size: 32px;">{{orderCount}}</span>
          </div>


        </el-card>
           </el-col>

          <el-col :span="4">
            <el-card class="update-log bg6" style="height: 120px;background-color: #13CE66;border-radius: 10px;">
              <div style="width: 100%;flex-direction: column; display: flex;align-items: center;">

                <span style="color: white;font-size: 13px;font-weight: bold;">
                  今日活动浏览量
                </span>

                <div style="height: 1px;background-color: white;width: 100%;opacity: 0.5;margin-top: 10px;"/>
              </div>

              <div style="display: flex;justify-content: center;align-items: center;height: 80px;color: white;">
                 <span style="font-size: 32px;">{{activityBrowseNum}}</span>
              </div>


            </el-card>
           </el-col>

          <el-col :span="4">
             <el-card class="update-log bg7" style="height: 120px;background-color: #13CE66;border-radius: 10px;">
               <div style="width: 100%;flex-direction: column; display: flex;align-items: center;">

                 <span style="color: white;font-size: 13px;font-weight: bold;">
                   今日活动转发量
                 </span>

                 <div style="height: 1px;background-color: white;width: 100%;opacity: 0.5;margin-top: 10px;"/>
               </div>

               <div style="display: flex;justify-content: center;align-items: center;height: 80px;color: white;">
                  <span style="font-size: 32px;">{{activityShareNum}}</span>
               </div>


             </el-card>
           </el-col>

           <el-col :span="4">
              <el-card class="update-log bg3" style="height: 120px;background-color: #13CE66;border-radius: 10px;">
                <div style="width: 100%;flex-direction: column; display: flex;align-items: center;">

                  <span style="color: white;font-size: 13px;font-weight: bold;">
                    今日抖音浏览量
                  </span>

                  <div style="height: 1px;background-color: white;width: 100%;opacity: 0.5;margin-top: 10px;"/>
                </div>

                <div style="display: flex;justify-content: center;align-items: center;height: 80px;color: white;">
                   <span style="font-size: 32px;">{{douyinVideoBrowseNum}}</span>
                </div>


              </el-card>
            </el-col>

            <el-col :span="4">
               <el-card class="update-log bg4" style="height: 120px;background-color: #13CE66;border-radius: 10px;">
                 <div style="width: 100%;flex-direction: column; display: flex;align-items: center;">

                   <span style="color: white;font-size: 13px;font-weight: bold;">
                     今日抖音转发量
                   </span>

                   <div style="height: 1px;background-color: white;width: 100%;opacity: 0.5;margin-top: 10px;"/>
                 </div>

                 <div style="display: flex;justify-content: center;align-items: center;height: 80px;color: white;">
                    <span style="font-size: 32px;">{{douyinVideoShareNum}}</span>
                 </div>


               </el-card>
             </el-col>

             <el-col :span="4">
                <el-card class="update-log bg5" style="height: 120px;background-color: #13CE66;border-radius: 10px;">
                  <div style="width: 100%;flex-direction: column; display: flex;align-items: center;">

                    <span style="color: white;font-size: 13px;font-weight: bold;">
                      今日抖音客户量
                    </span>

                    <div style="height: 1px;background-color: white;width: 100%;opacity: 0.5;margin-top: 10px;"/>
                  </div>

                  <div style="display: flex;justify-content: center;align-items: center;height: 80px;color: white;">
                     <span style="font-size: 32px;">{{douyinCustomerNum}}</span>
                  </div>


                </el-card>
              </el-col>

         </el-row>



     <el-row :gutter="20" style="padding-top: 30px;display: flex;" v-if="userType!=0&&userType!=6">

       <el-col :span="9">
       <el-card class="update-log" style="height: 320px;">
          <div style="display: flex;">
             <span style="font-size: 14px;">订单统计</span>
            <el-tooltip content="包含活动订单、小程序订单、直播订单" placement="top" style="margin-left: 10px;">
              <img src="../assets/images/lablepng.png" style="width: 18px;height: 18px;" />
            </el-tooltip>
          </div>

           <div id="map" style="width: 100%;height:280px;"></div>
       </el-card>

       </el-col>


       <el-col :span="9">
       <el-card class="update-log" style="height: 320px;">
         <div style="display: flex;">
            <span style="font-size: 14px;">交易金额统计</span>
           <el-tooltip content="包含活动订单、小程序订单、直播订单" placement="top" style="margin-left: 10px;">
             <img src="../assets/images/lablepng.png" style="width: 18px;height: 18px;" />
           </el-tooltip>
         </div>
        <div id="map2" style="width: 100%;height:280px;"></div>
       </el-card>

       </el-col>



       <el-col :span="6">
       <el-card class="update-log" style="height: 320px;">
         <div >
           <span style="width: 100%;font-size: 16px;color: #000000;">新闻公告</span>
           <div style="height: 1px;background-color: #eee;width: 100%;margin-top: 10px; "/>
         </div>

        <div v-for="(item,index) in noticeList" :key="index">
          <div style=" display: flex; justify-content: space-between;align-items: center; height: 40px;">
            <div style="display: flex;align-items: center;">
              <img src="../assets/images/zhiding.png" style="width: 18px;height: 18px;margin-right: 5px;" v-if="item.isTop==1">
              <span style="font-size: 13px;color: black;width: 100px;cursor: pointer;" class="my-title" @click="viewDetail(item)">{{item.newsName}}</span>
            </div>
            <span style="font-size: 11px;color: #999999;">{{getTime(item.createTime)}}</span>
          </div>
         <div style="height: 1px;background-color: #eee;width: 100%;"/>

        </div>


       </el-card>

       </el-col>



     </el-row>

      <el-row :gutter="20" style="padding-top: 30px;display: flex;" v-if="userType!=0&&userType!=6&&userType!=5&&userType!=11">

       <el-col :span="9">
       <el-card class="update-log" style="height: 320px;">
         <span>活动浏览量</span>
        <div id="map3" style="width: 100%;height:280px;"></div>
       </el-card>

       </el-col>


     <el-col :span="15">
     <el-card class="update-log" style="height: 320px;">
       <span>抖音营销商户转发量占比</span>
      <div id="map4" style="width: 100%;height:280px;"></div>
     </el-card>

     </el-col>


     </el-row>





      <el-dialog class="my-diaolog"  :visible.sync="open" width="500px" append-to-body :show-close="false" style="border-radius: 10px;">

       <div style="width:100%;height: 100px;display: flex;justify-content: space-between;" class="my-header">

         <span></span>
         <img src="../assets/images/close.png" style="width: 30px;height: 30px;margin-top: 15px;margin-right: 10px;" @click="closeDialog">

        </div>

        <div style="display: flex;flex-direction: column;">
           <h2 style="margin-left: 20px;margin-top: 20px;">{{messageTitle}}</h2>
           <span style="font-size: 12px;color: #999999;margin-left: 20px;margin-top: -10px;">{{messageTime}}</span>
        </div>

         <div class="messageContent my-html" style="width: 100%;height: 100%;padding: 20px;overflow-y: scroll;margin-top: -20px;" v-html="messageContent">

         </div>

      </el-dialog>


    <!-- <div style="display: flex;align-items: center;justify-content: center;">
      <div style="flex: 1;">

      </div>
       <span>版本号：0.0.1</span>
    </div> -->


  </div>
</template>

<script>

  import {getForwardchart,getBrowsechart,getOrderchart,getPricechart,getnotice, getorder,getactivity,getdouyin} from "@/api/login";

export default {
  name: "index",
  data() {
    return {
      // 版本号
      version: "3.5.0",
      messageTitle:'公告详情',
      orderNum:0,
      orderCount:0,
      activityBrowseNum:0,
      activityShareNum:0,
      douyinVideoBrowseNum:0,
      douyinVideoShareNum:0,
      douyinCustomerNum:0,
      userType:null,
      noticeList:[],
      open:false,
      messageContent:'',
      messageTime:''
    };
  },

  created() {
    this.userType=localStorage.getItem("userType")
    if(this.userType!=0&&this.userType!=6){
      this.getOrder()

      this.getDouYin()
      this.getNotice()
      this.getpricechart()
      this.getorderchart()

      if(this.userType!=5&&this.userType!=11){
        this.getforwardchart()
        this.getActivity()
        this.getbrowsechart()
      }


    }




  },

  computed:{
    getTime(){
       return (time) => {
        return time.substring(0,10)
      }
     }
  },
  


  methods: {

    closeDialog(){
      this.open=false
    },

    viewDetail(data){
      this.messageContent=data.newsDesc
      this.messageTitle=data.newsName
      this.messageTime=data.createTime
      this.open=true
    },

    getpricechart(){
      getPricechart().then(response => {
         this.getMap2(response.data)
      });
    },

    getorderchart(){
      getOrderchart().then(response => {
         this.getMap(response.data)
      });
    },


    getbrowsechart(){
      getBrowsechart().then(response => {
         this.getMap3(response.data)
      });
    },

    getforwardchart(){
      getForwardchart().then(response => {
         this.getMap4(response.data)
      });
    },




    getNotice(){
      getnotice().then(response => {
        this.noticeList=response.rows
      });
    },

    getOrder(){
      getorder().then(response => {
        this.orderNum=response.data.orderNum
        this.orderCount=response.data.orderCount
      });
    },

    getActivity(){
      getactivity().then(response => {
       this.activityBrowseNum=response.data.activityBrowseNum
       this.activityShareNum=response.data.activityShareNum
      });
    },

    getDouYin(){
      getdouyin().then(response => {
        this.douyinVideoBrowseNum=response.data.douyinVideoBrowseNum
        this.douyinVideoShareNum=response.data.douyinVideoShareNum
        this.douyinCustomerNum=response.data.douyinCustomerNum
      });
    },




    getMap(data){
       var myChart = this.$echarts.init(document.getElementById('map'))

       var xData=[]
       var yData=[]
       for (var i = 0; i < data.length; i++) {
         xData.push(data[i].dayDate)
         yData.push(data[i].num)
       }
       let option = {

          tooltip : {
                     trigger: 'axis',
                     axisPointer: {
                         type: 'cross',
                         label: {

                             backgroundColor: '#6a7985'
                         }
                     }
                 },

         xAxis: {
           type: 'category',
           // data: this.dataX,
           data: xData,
           boundaryGap: false, //控制日期是否在中间显示
           axisLabel: {
             show: true, //是否显示日期
             interval: 0, //强制显示全部 // rotate: 40,//倾斜的角度
             rotate: 45,
             textStyle: {
               color: '#000', //日期的颜色
               fontSize: 10 //字体的大小
             }
           },
           axisLine: {
             lineStyle: {
               color: '#ccc' // x轴的颜色
             }
           }
         },
         yAxis: {
           type: 'value',
           axisLabel: {
             formatter: '{value}',
             textStyle: {
               color: '#000' //数字的颜色
             },
             inside: false //控制数据是否在内侧还是外侧显示
           },
           axisLine: {
             lineStyle: {
               color: '#ccc' // 折线的颜色
             }
           }
         },
         grid: {
           left: '6%',
           right: '6%',
           bottom: '3%',
           top: '10%',
           containLabel: true
         },
         series: [{
           // data: this.dataY,
           data: yData,
           type: 'line',
           // symbol: 'circle', //是否显示实心的折线圆点
           smooth: true, //让折线有弧度
           symbolSize: 5, //折线圆点的大小
           itemStyle: {
             normal: {
               areaStyle: {
                 type: 'default',
                 //渐变色实现===
                 color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,
                   //三种由深及浅的颜色
                   [{
                     offset: 0,
                     color: '#889CD5'
                   }, {
                     offset: 1,
                     color: '#889CD5'
                   }]),
               },
               color: '#6982CA', //折线点的颜色
               lineStyle: {
                 color: '#6982CA' //折线的颜色
               },
               label: {
                 show: true
               } //是否在折线点上显示数字
             }
           }
         }]
       }
       myChart.setOption(option)

    },




    getMap2(data){
       var myChart = this.$echarts.init(document.getElementById('map2'))

       var xData=[]
       var yData=[]
       for (var i = 0; i < data.length; i++) {
         xData.push(data[i].dayDate)
         yData.push(data[i].num)
       }
       let option = {

          tooltip : {
                     trigger: 'axis',
                     axisPointer: {
                         type: 'cross',
                         label: {

                             backgroundColor: '#6a7985'
                         }
                     }
                 },

         xAxis: {
           type: 'category',
           // data: this.dataX,
           data: xData,
           boundaryGap: false, //控制日期是否在中间显示
           axisLabel: {
             show: true, //是否显示日期
             interval: 0, //强制显示全部 // rotate: 40,//倾斜的角度
             rotate: 45,
             textStyle: {
               color: '#000', //日期的颜色
               fontSize: 10 //字体的大小
             }
           },
           axisLine: {
             lineStyle: {
               color: '#ccc' // x轴的颜色
             }
           }
         },
         yAxis: {
           type: 'value',
           axisLabel: {
             formatter: '{value}',
             textStyle: {
               color: '#000' //数字的颜色
             },
             inside: false //控制数据是否在内侧还是外侧显示
           },
           axisLine: {
             lineStyle: {
               color: '#ccc' // 折线的颜色
             }
           }
         },
         grid: {
           left: '6%',
           right: '6%',
           bottom: '3%',
           top: '10%',
           containLabel: true
         },
         series: [{
           // data: this.dataY,
           data: yData,
           type: 'line',
           // symbol: 'circle', //是否显示实心的折线圆点
           smooth: true, //让折线有弧度
           symbolSize: 5, //折线圆点的大小
           itemStyle: {
             normal: {
               areaStyle: {
                 type: 'default',
                 //渐变色实现===
                 color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,
                   //三种由深及浅的颜色
                   [{
                     offset: 0,
                     color: '#889CD5'
                   }, {
                     offset: 1,
                     color: '#889CD5'
                   }]),
               },
               color: '#6982CA', //折线点的颜色
               lineStyle: {
                 color: '#6982CA' //折线的颜色
               },
               label: {
                 show: true
               } //是否在折线点上显示数字
             }
           }
         }]
       }
       myChart.setOption(option)

    },


    getMap3(data){
       var myChart = this.$echarts.init(document.getElementById('map3'))

       var xData=[]
       var yData=[]
       for (var i = 0; i < data.length; i++) {
         xData.push(data[i].dayDate)
         yData.push(data[i].num)
       }
       let option = {

          tooltip : {
                     trigger: 'axis',
                     axisPointer: {
                         type: 'cross',
                         label: {

                             backgroundColor: '#6a7985'
                         }
                     }
                 },

         xAxis: {
           type: 'category',
           // data: this.dataX,
           data: xData,
           boundaryGap: false, //控制日期是否在中间显示
           axisLabel: {
             show: true, //是否显示日期
             interval: 0, //强制显示全部 // rotate: 40,//倾斜的角度
             rotate: 45,
             textStyle: {
               color: '#000', //日期的颜色
               fontSize: 10 //字体的大小
             }
           },
           axisLine: {
             lineStyle: {
               color: '#ccc' // x轴的颜色
             }
           }
         },
         yAxis: {
           type: 'value',
           axisLabel: {
             formatter: '{value}',
             textStyle: {
               color: '#000' //数字的颜色
             },
             inside: false //控制数据是否在内侧还是外侧显示
           },
           axisLine: {
             lineStyle: {
               color: '#ccc' // 折线的颜色
             }
           }
         },
         grid: {
           left: '6%',
           right: '6%',
           bottom: '3%',
           top: '10%',
           containLabel: true
         },
         series: [{
           // data: this.dataY,
           data: yData,
           type: 'bar',
           // symbol: 'circle', //是否显示实心的折线圆点
           smooth: true, //让折线有弧度
           symbolSize: 5, //折线圆点的大小
           itemStyle: {
             normal: {
               areaStyle: {
                 type: 'default',
                 //渐变色实现===
                 color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,
                   //三种由深及浅的颜色
                   [{
                     offset: 0,
                     color: '#889CD5'
                   }, {
                     offset: 1,
                     color: '#889CD5'
                   }]),
               },
               color: '#6982CA', //折线点的颜色
               lineStyle: {
                 color: '#6982CA' //折线的颜色
               },
               label: {
                 show: true
               } //是否在折线点上显示数字
             }
           }
         }]
       }
       myChart.setOption(option)

    },


    getMap4(data){
       var myChart = this.$echarts.init(document.getElementById('map4'))

       var xData=[]
       var yData=[]
       var pieData=[]
       for (var i = 0; i < data.length; i++) {
         xData.push(data[i].dayDate)
         yData.push(data[i].num)
         let item={
           value:data[i].num,
           name:data[i].dayDate
         }
         pieData.push(item)
       }

       console.log(pieData)

       let option = {
           tooltip: {
                 // trigger 设置触发类型，默认数据触发，可选值：'item' ¦ 'axis'
                trigger: 'item',
                 showDelay: 20,   // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                 hideDelay: 20,   // 隐藏延迟，单位ms
                 backgroundColor: '#6982CA',  // 提示框背景颜色
                 textStyle: {
                   fontSize: '16px',
                   color: '#fff'  // 设置文本颜色 默认#FFF
                 },
                 // formatter设置提示框显示内容
                 // {a}指series.name  {b}指series.data的name
                 // {c}指series.data的value  {d}%指这一部分占总数的百分比
                 formatter: '{a} <br/>{b} : {c}个 ({d}%)'
               },
            legend: {
                // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
                orient: 'vertical',
                // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
                x: 'left',
                // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
                y: 'center',
                itemWidth: 24,   // 设置图例图形的宽
                itemHeight: 18,  // 设置图例图形的高
                textStyle: {
                  color: '#666'  // 图例文字颜色
                },
                // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
                itemGap: 30,
                backgroundColor: '#fff',  // 设置整个图例区域背景颜色
                data: xData
              },
            series: [
              {
                name: '抖音营销商户转发量占比',
                type: 'pie',
                radius: '50%',  // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
                // center: ['50%', '50%'],
                data: pieData,
                itemStyle: {
                    // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
                   // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(30, 144, 255，0.5)'
                    }
                  },
                  labelLine: {
                            normal: {
                            show: false   // show设置线是否显示，默认为true，可选值：true ¦ false
                       }
                    },

              }
            ]
       }
       myChart.setOption(option)

    },



    goTarget(href) {
      window.open(href, "_blank");
    },
  },
};
</script>

<style scoped>


  .my-diaolog/deep/.el-dialog__header{
    padding: 0;
  }

  .my-diaolog/deep/.el-dialog__body{
    padding: 0;
  }

  .my-header{
    background: url(../assets/images/bg7.png) no-repeat;
    background-size: 100% 100%;

  }

  .bg1{
    background: url(../assets/images/bg1.png) no-repeat;
    background-size: 100% 100%;
  }

  .bg2{
    background: url(../assets/images/bg2.png) no-repeat;
    background-size: 100% 100%;
  }

  .bg3{
    background: url(../assets/images/bg3.png) no-repeat;
    background-size: 100% 100%;
  }
  .bg4{
    background: url(../assets/images/bg4.png) no-repeat;
    background-size: 100% 100%;
  }
  .bg5{
    background: url(../assets/images/bg5.png) no-repeat;
    background-size: 100% 100%;
  }
  .bg6{
    background: url(../assets/images/bg1.png) no-repeat;
    background-size: 100% 100%;
  }

  .bg7{
    background: url(../assets/images/bg2.png) no-repeat;
    background-size: 100% 100%;
  }


  .messageContent/deep/img{
    width: 100%;
    height: 100%;
  }

  ::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
  }

  .my-title{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>
