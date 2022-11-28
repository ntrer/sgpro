<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="活动名称" prop="activityName">
        <el-input
         style="width: 160px;"
          v-model="queryParams.activityName"
          placeholder="请输入活动名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>


      <el-form-item label="开始时间" prop="beginDate" >
        <el-date-picker clearable size="small"
        style="width: 160px;"
          v-model="queryParams.beginDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endDate" >
        <el-date-picker clearable size="small"
        style="width: 160px;"
          v-model="queryParams.endDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择结束时间">
        </el-date-picker>
      </el-form-item>






     <!-- <el-form-item label="活动状态" prop="activityStatus">
        <el-select v-model="queryParams.activityStatus" placeholder="请选择" clearable style="width: 160px">
          <el-option v-for="(item, index) in stateList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
        </el-select>
      </el-form-item> -->
   <!--   <el-form-item label="活动类型: 1:线上活动 2:线下活动 3:直播活动 4:带看活动" prop="activityType">
        <el-select v-model="queryParams.activityType" placeholder="请选择活动类型: 1:线上活动 2:线下活动 3:直播活动 4:带看活动" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item> -->

      <el-form-item label="审核状态" prop="activityStatus">
        <el-select v-model="queryParams.activityStatus" placeholder="请选择" clearable style="width: 160px">
          <el-option v-for="(item, index) in activityStatus" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button  type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button  icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
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
          v-hasPermi="['activityManage:activity:add']"
        >新增活动</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table border v-loading="loading" :data="activityList" @selection-change="handleSelectionChange">
      <el-table-column label="活动名称" align="center" prop="activityName" width="180"/>
      <el-table-column label="审核状态" align="center" prop="activityStatus" :formatter="activityStatusFormat"/>
      <el-table-column label="创建人" align="center" prop="nickName" width="180"/>
      <el-table-column label="操作" align="left" class-name="small-padding fixed-width" width="320">
        <template slot-scope="scope">

          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleBase(scope.row)"
            v-hasPermi="['activityManage:activity:basicsConfig']"
          >发布商品</el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleSecKillConfig(scope.row)"
            v-hasPermi="['activityManage:activity:onlineGoodConfig']"
          >奖励豆阶段设置</el-button>


          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleSecKillSort(scope.row)"
            v-hasPermi="['activityManage:activity:onlineGoodSort']"
          >售卡设置</el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleSellCard(scope.row)"
            v-hasPermi="['activityManage:activity:sellCardsConfig']"
          >裂变配置</el-button>


          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleSort(scope.row)"
            v-hasPermi="['activityManage:activity:onlineBrandSort']"
          >数据配置</el-button>



          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleDataConfig(scope.row)"
            v-hasPermi="['activityManage:activity:dataConfig']"
          >基础配置</el-button>


          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleRedSubmit(scope.row)"
            v-hasPermi="['orderManage:activityRedEnvelopesRecharge:add']"
          >奖励豆配置</el-button>


          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleResetLink(scope.row)"
            v-hasPermi="['activityManage:activity:resetLink']"
          >裂变充值</el-button>




          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleLiveConfig(scope.row)"
            v-hasPermi="['activityManage:activity:liveRedConfig']"
          >奖励豆充值</el-button>


          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleLiveCharge(scope.row)"
            v-hasPermi="['activityManage:activity:liveRedRecharge']"
          >短信充值</el-button>



          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleDaiKan(scope.row)"
            v-hasPermi="['activityManage:activity:takeWatchConfig']"
          >活动二维码</el-button>


          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleDaikeCharge(scope.row)"
            v-hasPermi="['orderManage:activityTakeWatchRecharge:add']"
          >奖品管理</el-button>


          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleFenak(scope.row)"
            v-hasPermi="['activityManage:activity:dcorecardConfig']"
          >排版管理</el-button>


          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleOpenQrcode(scope.row)"
            v-hasPermi="['activityManage:activity:query']"
          >专场管理</el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleOpenLiveQrcode(scope.row)"
            v-hasPermi="['activityManage:activity:query']"
          >种草视频</el-button>



          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['activityManage:activity:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
             v-if="userType==0||userType==1"
            @click="handleDelete(scope.row)"
            v-hasPermi="['activityManage:activity:remove']"
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



    <!--数据配置弹窗 -->
       <el-dialog :title="title" :visible.sync="openDataConfig" width="600px" append-to-body fixed-width>

         <el-form :model="baseForm"  label-width="120px">
           <el-form-item label="起始浏览量" prop="ficBrowseCount" style="width: 84%;">
             <el-input v-model="baseForm.ficBrowseCount"  placeholder="请输入"/>
           </el-form-item>
           <el-form-item label="起始报名量" prop="ficEnrollCount" style="width: 84%;">
             <el-input v-model="baseForm.ficEnrollCount"  placeholder="请输入"/>
           </el-form-item>
           <el-form-item label="起始分享量" prop="ficShareCount" style="width: 84%;">
             <el-input v-model="baseForm.ficShareCount"  placeholder="请输入"/>
           </el-form-item>
           <el-form-item label="每日虚拟浏览量" prop="daysFicBrowseCount" style="width: 84%;">
             <el-input v-model="baseForm.daysFicBrowseCount" placeholder="请输入" />
           </el-form-item>
           <el-form-item label="每日虚拟报名量" prop="daysFicEnrollCount" style="width: 84%;">
             <el-input v-model="baseForm.daysFicEnrollCount" placeholder="请输入" />
           </el-form-item>
           <el-form-item label="每日虚拟分享量" prop="daysFicShareCount" style="width: 84%;">
             <el-input v-model="baseForm.daysFicShareCount" placeholder="请输入" />
           </el-form-item>


         </el-form>


          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="DataConfigSubmit">确 定</el-button>
            <el-button @click="cancelDataConfig">取 消</el-button>
          </div>

       </el-dialog>








     <!--红包充值弹窗 -->
     <el-dialog :title="title" :visible.sync="openRedSubmit" width="600px" append-to-body fixed-width>

       <el-form :model="redSubmitData"  label-width="100px">
         <el-form-item label="已充值金额" prop="redEnvelopesTotalAmount" style="width: 84%;">
           <el-input v-model="redSubmitData.redEnvelopesTotalAmount" disabled />
         </el-form-item>
         <el-form-item label="余额" prop="redEnvelopesSurplusAmount" style="width: 84%;">
           <el-input v-model="redSubmitData.redEnvelopesSurplusAmount"  disabled/>
         </el-form-item>
         <el-form-item label="待审核金额" prop="redEnvelopesReviewedAmount" style="width: 84%;">
           <el-input v-model="redSubmitData.redEnvelopesReviewedAmount"  disabled/>
         </el-form-item>
         <el-form-item label="充值金额" prop="amount" style="width: 84%;">
           <el-input v-model="redSubmitData.amount" placeholder="请输入" />
         </el-form-item>
         <el-form-item label="充值备注" prop="rechargeRemarks" style="width: 84%;">
           <el-input v-model="redSubmitData.rechargeRemarks" placeholder="请输入" type="textarea"
  :rows="4"/>
         </el-form-item>

       </el-form>


        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="RedSubmit">确 定</el-button>
          <el-button @click="cancelRedSubmit">取 消</el-button>
        </div>

     </el-dialog>









    <!-- 带看配置 -->
    <el-dialog :title="title" :visible.sync="openDaiKanSubmit" width="600px" append-to-body fixed-width>

      <el-form :model="activityTakeWatch"  label-width="100px">
        <el-form-item label="是否开启带看" prop="isOpenTakeWatch" style="width: 100%;">
          <el-select v-model="activityTakeWatch.isOpenTakeWatch" placeholder="请选择" clearable style="width: 80%;">
            <el-option v-for="(item, index) in isOpenTakeWatch" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
          </el-select>
        </el-form-item>
        <el-form-item label="单次带看奖励" prop="takeWatchAmount" style="width: 84%;">
          <el-input v-model="activityTakeWatch.takeWatchAmount" placeholder="请输入" />
        </el-form-item>

      </el-form>


       <div slot="footer" class="dialog-footer">
         <el-button type="primary" @click="DaiKanSubmit">确 定</el-button>
         <el-button @click="cancelDaiKanSubmit">取 消</el-button>
       </div>

    </el-dialog>


     <!-- 带客充值 -->
     <el-dialog :title="title" :visible.sync="openDaiKeRecharge" width="600px" append-to-body fixed-width>


      <el-table border  :data="takeWatchRecharge" >
        <el-table-column label="商户名称" align="center" prop="brandName" />
        <el-table-column label="商户总金额" align="center" prop="totalAccount" />
        <el-table-column label="商户余额" align="center" prop="availableBalance" />
        <el-table-column label="待审核金额" align="center" prop="waitExamineAmount" />
        <el-table-column label="充值金额" align="center" prop="activityOnlineSort" >
          <template slot-scope="scope">
             <el-input class="my-input" v-model="scope.row.amount" placeholder="请输入" style="text-align: center;"/>
          </template>
        </el-table-column>
       </el-table>

       <el-form :model="takeWatchRechargeRemark"  label-width="100px" style="margin-top: 50px;">
         <el-form-item label="充值备注" prop="takeWatchRechargeRemark" style="width: 84%;">
           <el-input v-model="takeWatchRechargeRemark" placeholder="请输入" type="textarea":rows="2"/>
         </el-form-item>

       </el-form>



        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="DaiKeRechargeSubmit">确 定</el-button>
          <el-button @click="cancelDaiKeRecharge">取 消</el-button>
        </div>

     </el-dialog>



     <!--直播充值弹窗 -->
        <el-dialog :title="title" :visible.sync="openLiveSubmit" width="600px" append-to-body fixed-width>

          <el-form :model="liveRechargeData"  label-width="100px">
            <el-form-item label="已充值金额" prop="bonusAmount" style="width: 84%;">
              <el-input v-model="liveRechargeData.bonusAmount" disabled />
            </el-form-item>
            <el-form-item label="余额" prop="surplusAmount" style="width: 84%;">
              <el-input v-model="liveRechargeData.surplusAmount"  disabled/>
            </el-form-item>
            <el-form-item label="待审核金额" prop="waitExamineAmount" style="width: 84%;">
              <el-input v-model="liveRechargeData.waitExamineAmount"  disabled/>
            </el-form-item>
            <el-form-item label="充值金额" prop="amount" style="width: 84%;">
              <el-input v-model="liveRechargeData.amount" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="充值备注" prop="rechargeRemarks" style="width: 84%;">
              <el-input v-model="liveRechargeData.rechargeRemarks" placeholder="请输入" type="textarea"
     :rows="4"/>
            </el-form-item>

          </el-form>


           <div slot="footer" class="dialog-footer">
             <el-button type="primary" @click="LiveSubmit">确 定</el-button>
             <el-button @click="cancelLiveSubmit">取 消</el-button>
           </div>

        </el-dialog>



    <!-- 添加或修改活动对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form"  label-width="100px">

        <el-form-item label="活动名称" prop="activityName" style="width: 84%;">
          <el-input v-model="form.activityName" placeholder="请输入活动名称" />
        </el-form-item>
        <el-form-item label="活动开始时间" prop="startTime" >
          <el-date-picker clearable size="small"
          :disabled="isEditAble==true?true:false"
          style="width: 82%;"
            v-model="form.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择活动开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动结束时间" prop="endTime" >
          <el-date-picker clearable size="small"
          style="width: 82%;"
            :disabled="isEditAble==true?true:false"
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            :picker-options="endDatePicker"
            placeholder="选择活动结束时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="选择品牌" prop="brandIds">
          <!-- <el-input v-model="form.brandId" placeholder="请输入品牌ID" /> -->
          <el-transfer ref="myTransferData" class="my-transfer"  filterable filter-placeholder="请输入关键字搜索" :button-texts="['移出', '加入']"
             v-model="brands" :titles="titles" :props="{
                      key: 'brandId',
                      label: 'brandName'
                    }"
            :data="brandList">
          </el-transfer>
        </el-form-item>

        <el-form-item label="选择地域" prop="cityIds">
          <!-- <el-input v-model="form.brandId" placeholder="请输入品牌ID" /> -->
          <el-transfer ref="myTransferData" class="my-transfer"  filterable filter-placeholder="请输入关键字搜索" :button-texts="['移出', '加入']"
             v-model="citys" :titles="titles" :props="{
                      key: 'cityId',
                      label: 'cityName'
                    }"
            :data="cityList">
          </el-transfer>
        </el-form-item>

        <el-form-item label="活动类型" prop="activityType" >
          <el-select v-model="select" placeholder="请选择" style="width: 82%;" multiple :disabled="isEditAble==true?true:false">
             <el-option v-for="(item, index) in activityTypeList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictLabel"></el-option>
          </el-select>
        </el-form-item>
       <!-- <el-form-item label="城市信息" prop="cityText">
          <el-input v-model="form.cityText" type="textarea" placeholder="请输入" />
        </el-form-item> -->

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


    <el-dialog :visible.sync="dialogVisible" width="400px">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>




    <el-dialog title="设置群管理员" :visible.sync="opengroupleader" width="400px" append-to-body>
        <el-form ref="groupLeaderform" :model="groupLeaderform"  label-width="100px">
        <el-form-item label="选择管理员" prop="userId">
          <el-select v-model="groupLeaderform.userId" placeholder="请选择" style="width: 82%;">
             <el-option v-for="(item, index) in groupleaderList" :key="item.userId" :label="item.nickName" :value="item.userId"></el-option>
          </el-select>
        </el-form-item>
       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button type="primary" @click="submitSecgroupleader">确 定</el-button>
         <el-button @click="cancelSecgroupleader">取 消</el-button>
       </div>

    </el-dialog>


    <el-dialog title="设置微信群" :visible.sync="opengroupList" width="400px" append-to-body>
        <el-form ref="groupListform" :model="groupListform"  label-width="100px">
        <el-form-item label="选择微信群" prop="id">
          <el-select v-model="groupListform.id" placeholder="请选择" style="width: 82%;">
             <el-option v-for="(item, index) in groupListList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button type="primary" @click="submitSecgroupList">确 定</el-button>
         <el-button @click="cancelSecgroupList">取 消</el-button>
       </div>

    </el-dialog>


    <el-dialog title="设置群导购" :visible.sync="openguideConfig" width="800px" append-to-body>
        <el-form ref="guideConfigform" :model="guideConfigform"  label-width="100px">
          <el-form-item label="选择群导购" prop="id" >
            <!-- <el-select v-model="selectGuide" placeholder="请选择" style="width: 82%;" multiple>
               <el-option v-for="(item, index) in guideConfigList" :key="item.userId" :label="item.nickName" :value="item.userId"></el-option>
            </el-select> -->


            <el-transfer ref="myTransferData" class="my-transfer"  filterable filter-placeholder="请输入关键字搜索" :button-texts="['移出', '加入']"
               v-model="selectGuideList" :titles="titles" :props="{
                        key: 'userId',
                        label: 'nickName'
                      }"
              :data="guideConfigList">
            </el-transfer>



          </el-form-item>
       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button type="primary" @click="submitSecguideConfig">确 定</el-button>
         <el-button @click="cancelSecguideConfig">取 消</el-button>
       </div>

    </el-dialog>



  </div>
</template>

<script>
import {listActivity,addActivity} from "@/api/activityManage/activity";
import imgUpload from '@/components/imgUpload'
import { mapState} from "vuex";
export default {
  name: "Activity",
  components: {
    imgUpload
  },
  data() {
    return {
      endDatePicker: this.processDate(),
      uploadUrl:this.UPLOADURL.BaseUrl+"/common/upload?type=10",
      stateList: [{
        "dictLabel": "审核通过",
        "dictValue": 1
      }, {
        "dictLabel": "待审核",
        "dictValue": 0
      },
      {
        "dictLabel": "审核未通过",
        "dictValue": -1
      }
      ],


      enableList: [{
        "dictLabel": "开启",
        "dictValue": 1
      },
      {
        "dictLabel": "关闭",
        "dictValue": -1
      }
      ],


      isOpenInvitationStatisticsList: [{
        "dictLabel": "开启",
        "dictValue": 1
      },
      {
        "dictLabel": "关闭",
        "dictValue": -1
      }
      ],



      isOpengSellCardList: [{
        "dictLabel": "开启",
        "dictValue": 1
      },
      {
        "dictLabel": "关闭",
        "dictValue": -1
      }
      ],


      sellCardCostTypeList: [{
        "dictLabel": "收费",
        "dictValue": 1
      },
      {
        "dictLabel": "免费",
        "dictValue": 2
      }
      ],



      isOpenSellCardCodeList: [{
        "dictLabel": "开启",
        "dictValue": 1
      },
      {
        "dictLabel": "关闭",
        "dictValue": -1
      }
      ],

      enrollAddressTypeList: [{
        "dictLabel": "显示",
        "dictValue": 1
      },
      {
        "dictLabel": "不显示",
        "dictValue": -1
      }
      ],

      choiceCodeList: [{
        "dictLabel": "使用导购二维码",
        "dictValue": 1
      },
      {
        "dictLabel": "使用群二维码",
        "dictValue": 2
      }
      ],



      watchTime: [{
        "dictLabel": "一分钟",
        "dictValue": 60
      },
      {
        "dictLabel": "30分钟",
        "dictValue": 1800
      },
      {
        "dictLabel": "一小时",
        "dictValue": 3600
      },
      {
        "dictLabel": "一个半小时",
        "dictValue": 5400
      },
      {
        "dictLabel": "2小时",
        "dictValue": 7200
      }
      ],



      activityTypeList: [{
        "dictLabel": "线上活动",
        "dictValue": 1
      }, {
        "dictLabel": "线下活动",
        "dictValue": 2
      },
      {
        "dictLabel": "直播活动",
        "dictValue": 3
      },
      {
        "dictLabel": "带看活动",
        "dictValue": 4
      },

      ],


      streamingModeList: [{
        "dictLabel": "电脑",
        "dictValue": 1
      },
      {
        "dictLabel": "手机",
        "dictValue": 2
      }

      ],



      stateList2: [{
        "dictLabel": "可用",
        "dictValue": 1
      },
      {
        "dictLabel": "不可用",
        "dictValue": -1
      }
      ],


      redEnvelopesStatusList: [{
        "dictLabel": "开启",
        "dictValue": 1
      },
      {
        "dictLabel": "关闭",
        "dictValue": -1
      }
      ],



      isOpengSellCard: [{
        "dictLabel": "开启",
        "dictValue": 1
      },
      {
        "dictLabel": "关闭",
        "dictValue": -1
      }
      ],


      // isOpengDaiKan: [{
      //   "dictLabel": "开启",
      //   "dictValue": 1
      // },
      // {
      //   "dictLabel": "关闭",
      //   "dictValue": -1
      // }
      // ],



      isOpenTakeWatch: [{
        "dictLabel": "开启",
        "dictValue": 1
      },
      {
        "dictLabel": "关闭",
        "dictValue": -1
      }
      ],



      redEnvelopesStatus: [{
        "dictLabel": "开启",
        "dictValue": 1
      },
      {
        "dictLabel": "关闭",
        "dictValue": -1
      }
      ],



      subjectColorList: [{
        "dictLabel": "红",
        "dictValue": 1
      },
      {
        "dictLabel": "蓝",
        "dictValue": 2
      },
      {
        "dictLabel": "绿",
        "dictValue": 3
      },
      {
        "dictLabel": "黑",
        "dictValue": 4
      },
      {
        "dictLabel": "紫",
        "dictValue": 5
      },
      ],



      receiveModeList: [{
        "dictLabel": "只领取一次",
        "dictValue": 1
      },
      {
        "dictLabel": "每天领取一次",
        "dictValue": 2
      },
      {
        "dictLabel": "按人数领取",
        "dictValue": 3
      }
      ],


      sharingFriendList: [{
        "dictLabel": "启用",
        "dictValue": 1
      },
      {
        "dictLabel": "关闭",
        "dictValue": -1
      }
      ],


      extensionStatusList: [{
        "dictLabel": "启用",
        "dictValue": 1
      },
      {
        "dictLabel": "关闭",
        "dictValue": -1
      }
      ],


      isOpenDelayedList: [{
        "dictLabel": "启用",
        "dictValue": 1
      },
      {
        "dictLabel": "关闭",
        "dictValue": -1
      }
      ],


      organizationTypeList:[{
         "dictLabel": "商场",
         "dictValue": 1
       }, {
         "dictLabel": "联盟",
         "dictValue": 2
       },
       {
         "dictLabel": "第三方",
         "dictValue": 3
       },
       {
         "dictLabel": "经销商",
         "dictValue": 4
       },
       {
         "dictLabel": "品牌",
         "dictValue": 5
       }
      ],

      activityStatus:[{
         "dictLabel": "待审核",
         "dictValue": 0
       }, {
         "dictLabel": "审核通过",
         "dictValue": 1
       },
       {
         "dictLabel": "审核不通过",
         "dictValue": -1
       }
      ],


      uploadData:{},
      groupLeaderform:{},
      opengroupleader:false,
      groupleaderList:[],
      groupleaderactivityId:null,

      groupListList:[],
      groupListform:{},
      opengroupList:false,
      groupListactivityId:null,


      openguideConfig:false,
      guideConfigList:[],
      guideConfigform:{},
      guideConfigactivityId:null,
      selectGuide:[],
      selectGuideList:[],


      imgListAd1:[],
      imgListAd2:[],
      imgListAd3:[],
      imgListAd4:[],
      imgList66:[],
      makeAppSendTime:"",
      liveStreamingStartTime:"",
      liveStreamingEndTime:"",
      shoppingStartTime:"",
      shoppingEndTime:"",
      skipLiveStartTime:"",
      skipLiveEndTime:"",

      userType:null,
      dialogVisible:false,
      dialogImageUrl:'',
      userName:null,
      selectActivityId:null,
      baseForm:{},
      select:[],
      brands: [],
      citys:[],
      goods:[],
      secKillData:[],
      brandSortList:[],
      secKillSortList:[],
      secKillDataList:[],
      secKillDataNextList:[],
      secKillConfigList:[],
      titles: ['待选', '已选'],
      imgList:[],
      imgList2:[],
      imgList3:[],
      imgList4:[],
      imgList5:[],
      imgList6:[],
      imgList7:[],
      imgListcour:[],
	  imgList8:[],
      activityBrandList:[],
      goodsList:[],
      tempgoodsList:[],
      // 上传文件列表
      musciList: [],
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
      takeWatchId:null,
      activityLive:{},
      // 活动表格数据
      activityList: [],
      tempbrandList: [],
      brandList:[],
      tempcityList: [],
      cityList:[],
      shopPayInfoList:[],
      takeWatchRecharge:[],
      cardNumListRespList:[],
      takeWatchRechargeRemark:null,
      takeWatchRechargeId:null,
      baseActivityId:null,
      cardNumListId:null,
      activityTakeWatch:{},
      liveRechargeData:{},
      isEditAble:false,
      organizationId:null,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      openSort:false,
      openSecKillSort:false,
      openRedSubmit:false,
      openDaiKanSubmit:false,
      openDaiKeRecharge:false,
      openLiveSubmit:false,
      openFenka:false,
      openBase:false,
      openLiveConfig:false,
      openDataConfig:false,
      opensecConfig:false,
      openSellCardConfig:false,
      opensecConfig2:false,
      redSubmitData:{},
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        organizationId: null,
        organizationType: null,
        brandId: null,
        activityName: null,
        beginDate: null,
        endDate: null,
        wxShopId: null,
        activityStatus: null,
        activityType: null,
        cityText: null,
        createId: null,
        updateId: null,
        examineId: null,
        examineTime: null,
        enable: null,
        del: null
      },
      currentUploudIndex:0,
      // 表单参数
      form: {},

      // 表单校验
      rules2: {
        customerServicePhone: [
          { required: true,message: "请输入正确的手机号码",trigger: "blur" }
        ],
        subjectColor: [
          { required: true, message: "主题颜色不能为空", trigger: "blur" }
        ],
        sharingFriend: [
          { required: true, message: "是否允许分享不能为空", trigger: "blur" }
        ],
        sharingTitle: [
          { required: true, message: "分享标题不能为空", trigger: "blur" }
        ],
        sharingDescribe: [
          { required: true, message: "分享描述不能为空", trigger: "blur" }
        ],
        redEnvelopesStatus: [
          { required: true, message: "是否发放红包不能为空", trigger: "blur" }
        ],
        endAmount: [
          { required: true, message: "红包金额上限不能为空", trigger: "blur" }
        ],
        startAmount: [
          { required: true, message: "红包金额下限不能为空", trigger: "blur" }
        ],
        receiveMode: [
          { required: true, message: "红包领取方式不能为空", trigger: "blur" }
        ],
        extensionStatus: [
          { required: true, message: "二次分享红包不能为空", trigger: "blur" }
        ],
        extensionPrice: [
          { required: true, message: "二次分享金额不能为空", trigger: "blur" }
        ],
        isOpenDelayed: [
          { required: true, message: "延时不能为空", trigger: "blur" }
        ],

      }
    };
  },
  created() {
    this.getList();
    this.getBrandList();
    this.getCityList();
    console.log(this.user)
    this.userName=this.user.name
    this.userType=localStorage.getItem("userType")
    this.organizationId=localStorage.getItem("organizationId")
  },


  computed: {
    ...mapState({
       user:state=>state.user
    })
   },




  methods: {



    processDate() {
      const  self = this
      return {
        disabledDate(time) {
          if (self.form.startTime) {  //如果开始时间不为空，则结束时间大于开始时间,且大于当前时间
            return time.getTime() < new Date(self.form.startTime).getTime() || time.getTime() > Date.now() + 30 * 8.64e7;
            // return new Date(self.form.startTime).getTime() > time.getTime() || time.getTime() < Date.now() - 1000*3600*24
          }
        }
      }
    },



    handleSucess(response, file, fileList){
      console.log(response)
       this.msgSuccess("上传成功");
      this.secKillConfigList[this.currentUploudIndex].limitationPolicy=response.fileName
       console.log(this.currentUploudIndex)
      console.log(this.secKillConfigList[this.currentUploudIndex])
      console.log(this.secKillConfigList)
    },

    handleError(err, file, fileList){

    },

    getIndex(scope){
      console.log(scope)
      this.currentUploudIndex=scope
       console.log( this.currentUploudIndex)
    },



    // 字典状态字典翻译
    organizationTypeFormat(row, column) {
      return this.selectDictLabel(this.organizationTypeList, row.organizationType);
    },

   redEnvelopesStatusFormat(row, column) {
     return this.selectDictLabel(this.redEnvelopesStatus, row.redEnvelopesStatus);
   },

   isOpengSellCardFormat(row, column) {
     return this.selectDictLabel(this.isOpengSellCard, row.isOpengSellCard);
   },

   isOpenTakeWatchFormat(row, column) {
     return this.selectDictLabel(this.isOpenTakeWatch, row.isOpenTakeWatch);
   },


    activityStatusFormat(row, column) {
     return this.selectDictLabel(this.activityStatus, row.activityStatus);
   },





    // 设置群管理员
    handleSetgroupleader(row){
      let data={
        activityId:row.id
      }
       this.groupleaderactivityId=row.id
      opengroupleader(data).then(response => {
        console.log(response)

        this.groupleaderList=response.sysUserList
        this.opengroupleader=true
      });
    },


    submitSecgroupleader(item){


      this.$confirm('请确认已选择的群管理员,提交之后无法修改', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let data={
            activityId:this.groupleaderactivityId,
            userId:this.groupLeaderform.userId
          }
          return setgroupleader(data);
        }).then(response => {
         this.opengroupleader=false
         this.msgSuccess("设置成功");
         this.getList()
        }).catch(() => {});

    },


    cancelSecgroupleader(){
      this.opengroupleader=false
    },




    // 设置微信群
    handleSetgrouplist(row){
      let data={
        activityId:row.id
      }
       this.groupListactivityId=row.id
      opengrouplist(data).then(response => {
        console.log(response)
        this.groupListList=response.data
        this.opengroupList=true
      });
    },


    submitSecgroupList(){



      for (var i = 0; i < this.groupListList.length; i++) {
        if(this.groupListform.id==this.groupListList[i].id){
          this.groupListform.name=this.groupListList[i].name
        }
      }


      this.$confirm('请确认已选择的企业微信群,提交之后无法修改', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let data={
            activityId:this.groupListactivityId,
            id:this.groupListform.id,
            name:this.groupListform.name
          }
          return setgrouplist(data);
        }).then(response => {
         this.opengroupList=false
         this.msgSuccess("设置成功");
         this.getList()
        }).catch(() => {});

    },


    cancelSecgroupList(){
      this.opengroupList=false
    },


    handleSetguideConfig(row ){
      this.guideConfigList=[]
      this.selectGuideList=[]
      let data={
        activityId:row.id
      }
       this.guideConfigactivityId=row.id
      openguideConfig(data).then(response => {
        console.log(response)

        for (var i = 0; i < response.sysUserList.length; i++) {
          let data = {
            "nickName": response.sysUserList[i].nickName,
            "userId": response.sysUserList[i].userId
          }
          this.guideConfigList.push(data)
        }

        if(response.selectedSysUserList.length!=0){
          for (var i = 0; i < response.selectedSysUserList.length; i++) {
            this.selectGuideList.push(response.selectedSysUserList[i].userId)
          }
        }

        console.log(this.selectGuideList)
        this.openguideConfig=true
      });
    },


    submitSecguideConfig(){

      console.log(this.selectGuideList)

      let data={
        activityId:this.guideConfigactivityId,
        userIds:this.selectGuideList,
      }

      setguideConfig(data).then(response => {
        this.openguideConfig=false
        this.msgSuccess("设置成功");
        this.getList()
      });

    },


    cancelSecguideConfig(){
      this.openguideConfig=false
    },







    // 报名配置
    handleSellCard(row){
      this.imgList8=[]
      this.baseForm = {
        activityImageUrl: null,
        activityDetailsImageUrl: null,
        posterBackgroundImageUrl: null,
        musicUrl: null,
        sharingFriend: null,
        sharingImageUrl: null,
        sharingTitle: null,
        sharingDescribe: null,
        customerServicePhone: null,
        subjectColor: null,
        redEnvelopesStatus: null,
        startAmount: null,
        endAmount: null,
        receiveMode: null,
        extensionStatus: null,
        extensionPrice: null,
        isOpenDelayed: null,
        ficBrowseCount:null,
        ficEnrollCount:null,
        ficShareCount:null,
        daysFicBrowseCount:null,
        daysFicEnrollCount:null,
        daysFicShareCount:null,
        isOpengSellCard:null,
        sellCardCostType:null,
        isOpenSellCardCode:null,
        enrollAddressType:null,
        cardAmount:null,
        userRoyalty:null,
        userSubRoyalty:null,
        extensionRoyalty:null,
        choiceCode:null,

      };


      let data={
        activityId:row.id
      }
      openActivityOnlineConfig(data).then(response => {

	     let data = {
	         url: response.activityOnline.groupImgUrlFull,
	         relative_url: response.activityOnline.groupImgUrl
	       }
	     this.imgList8.push(data)

        // 编辑
       this.baseForm=response.activityOnline

       this.openSellCardConfig=true
       this.title = "售卡配置";



      });


    },

    SellCardConfigSubmit(){

	    if(this.imgList8.length!=0){
	     this.baseForm.groupImgUrl= this.imgList8[0].relative_url
	    }
	    else{
	      this.baseForm.groupImgUrl= ''
	    }

      if(this.baseForm.userRoyalty>100){
        this.msgError("一级提成最大输入100")
        return
      }

      if(this.baseForm.userSubRoyalty>100){
        this.msgError("二级提成最大输入100")
        return
      }



      activityOnlineConfig(this.baseForm).then(response => {
      this.openSellCardConfig=false
       this.msgSuccess("配置成功");
        this.getList()
      });
    },

    cancelSellCardConfig(){
      this.openSellCardConfig=false
    },



    // 数据配置
    handleDataConfig(row){

      this.baseForm = {
        activityImageUrl: null,
        activityDetailsImageUrl: null,
        posterBackgroundImageUrl: null,
        musicUrl: null,
        sharingFriend: null,
        sharingImageUrl: null,
        sharingTitle: null,
        sharingDescribe: null,
        customerServicePhone: null,
        subjectColor: null,
        redEnvelopesStatus: null,
        startAmount: null,
        endAmount: null,
        receiveMode: null,
        extensionStatus: null,
        extensionPrice: null,
        isOpenDelayed: null,
        browseCount:null,
        enrollCount:null,
        shareCount:null,
        daysFicBrowseCount:null,
        daysFicEnrollCount:null,
        daysFicShareCount:null,
      };

      let data={
        activityId:row.id
      }
      openActivityOnlineConfig(data).then(response => {
        // 编辑
       this.baseForm=response.activityOnline
       this.openDataConfig=true
       this.title = "数据配置";
      });
    },

    DataConfigSubmit(){
      activityOnlineConfig(this.baseForm).then(response => {
      this.openDataConfig=false
       this.msgSuccess("配置成功");
        this.getList()
      });
    },

    cancelDataConfig(){
     this.openDataConfig=false
    },


    // 秒杀配置
    handleSecKillConfig(row){
      this.secKillDataList=[];
      this.secKillData=[];
      this.selectActivityId=row.id
      let data={
        activityId:row.id
      }
      openSeckillGoods(data).then(response => {

          for (var i = 0; i < response.goodsList.length; i++) {
            let data = {
              "goodsName": response.goodsList[i].goodsName,
              "id": response.goodsList[i].id
            }
            this.secKillDataList.push(data)
          }

          for (var i = 0; i < response.selectGoodsList.length; i++) {
            this.secKillData.push(response.selectGoodsList[i].id)
          }



          this.opensecConfig=true;
          this.title="秒杀配置"
      });
    },

    submitSecConfig(){
       console.log(this.secKillData)
       if(this.secKillData.length==0){
        this.$message.warning("请选择商品")
         return
       }
      let data={
        activityId:this.selectActivityId,
        goodsIds:this.secKillData
      }


      openOnlineGoodConfigDetail(data).then(response => {
          this.secKillConfigList=response.data
          this.opensecConfig=false
          this.opensecConfig2=true
      });

    },

    cancelSecConfig(){
      this.opensecConfig=false;
    },


    submitSecConfig2(){

      for (var i = 0; i < this.secKillConfigList.length; i++) {
        if(this.secKillConfigList[i].helpRule>100){
           this.msgError("助力次数最大只能输入100")
           return
        }
      }



      let data={
        activityId:this.selectActivityId,
        goodsRelationList:this.secKillConfigList
      }
      submitSecConfig(data).then(response => {
         this.opensecConfig2=false
         this.getList()
         this.msgSuccess("配置成功");
      });
    },

    cancelSecConfig2(){
      this.opensecConfig2=false;
    },






    /** 查询活动列表 */
    getList() {
      this.loading = true;
      listActivity(this.queryParams).then(response => {
        this.activityList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },



    getBrandList(){
      listBrand().then(response => {
        this.tempbrandList = response.rows;
        for (var i = 0; i < this.tempbrandList.length; i++) {
          let data = {
            "brandName": this.tempbrandList[i].brandName,
            "brandId": this.tempbrandList[i].id
          }
          this.brandList.push(data)
        }
      });
    },


    getCityList(){

      let param={
         areaLevel:2
      }

      listArea(param).then(response => {
        this.tempcityList = response.rows;
        for (var i = 0; i < this.tempcityList.length; i++) {
          let data = {
            "cityName": this.tempcityList[i].areaName,
            "cityId": this.tempcityList[i].id
          }
          this.cityList.push(data)
        }
      });
    },






    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.brands=[];
      this.citys=[];
      this.form = {
        id: null,
        organizationId: null,
        organizationType: null,
        brandId: null,
        activityName: null,
        startTime: null,
        endTime: null,
        wxShopId: null,
        activityStatus: 0,
        activityType: null,
        cityText: null,
        createId: null,
        createTime: null,
        updateId: null,
        updateTime: null,
        examineId: null,
        examineTime: null,
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
      this.isEditAble=false
      this.open = true;
      this.title = "添加活动";
    },


    // 直播配置
    handleLiveConfig(row){

      this.imgList5=[];
      this.imgList6=[];
      this.imgList7=[];
      this.goods=[];
      this.goodsList=[];
      this.activityLive = {
        liveTitle: null,
        liveDetail: null,
        skipLiveStartTime:'',
        skipLiveEndTime:'',
        liveStreamingStartTime: '',
        liveStreamingEndTime: '',
        shoppingStartTime: '',
        shoppingEndTime: '',
        sharingImageUrl: null,
        sharingDescribe: null,
        sharingTitle: null,
        sharingSubTitle: null,
        carouselDesc: null,
        isOpenInvitationStatistics: null,
        makeAppSendTime:null,
        hostHeadPortraitUrl: null,
        hostUserName: null,
        pushStreamBillingBrandId: null,
        shopPayInfoId: null,
        enable: null,
      };


      // 回显
      let data={
        activityId:row.id
      }

     getLiveConfig(data).then(response => {
       this.activityLive=response.activityLive
       this.shopPayInfoList=response.shopPayInfoList
       this.activityBrandList=response.activityBrandList
       this.openLiveConfig=true
       this.title="直播配置"

       this.makeAppSendTime=this.activityLive.makeAppSendTime
       this.liveStreamingStartTime=this.activityLive.liveStreamingStartTime
       this.liveStreamingEndTime=this.activityLive.liveStreamingEndTime
       this.shoppingStartTime=this.activityLive.shoppingStartTime
       this.shoppingEndTime=this.activityLive.shoppingEndTime
       this.skipLiveStartTime=this.activityLive.skipLiveStartTime
       this.skipLiveEndTime=this.activityLive.skipLiveEndTime


       for (var i = 0; i < response.activityLiveGoodsRelationList.length; i++) {
        this.goods.push(response.activityLiveGoodsRelationList[i].goodsId)
       }


        if(response.activityLive!=null){
          if(response.activityLive.liveImageUrlFull!=''){
            let data = {
                url: response.activityLive.liveImageUrlFull,
                relative_url: response.activityLive.liveImageUrl
              }
            this.imgList5.push(data)
          }

          if(response.activityLive.sharingImageUrlFull!=''){
            let data2 = {
                url: response.activityLive.sharingImageUrlFull,
                relative_url: response.activityLive.sharingImageUrl
              }
            this.imgList6.push(data2)
          }


          if(response.activityLive.hostHeadPortraitUrlFull!=''){
            let data3 = {
                url: response.activityLive.hostHeadPortraitUrlFull,
                relative_url: response.activityLive.hostHeadPortraitUrl
              }
            this.imgList7.push(data3)
          }



        }



     });


     openOnlineGoodConfig(data).then(response => {
        this.tempgoodsList=response.goodsList
        for (var i = 0; i < this.tempgoodsList.length; i++) {
          let data = {
            "goodsName": this.tempgoodsList[i].goodsName,
            "id": this.tempgoodsList[i].id
          }
          this.goodsList.push(data)
        }
     });

    },

    LiveConfigSubmit(){

     if(this.imgList5.length!=0){
      this.activityLive.liveImageUrl= this.imgList5[0].relative_url
     }
     else{
       this.activityLive.liveImageUrl= ''
     }

     if(this.imgList6.length!=0){
      this.activityLive.sharingImageUrl= this.imgList6[0].relative_url
     }
     else{
       this.activityLive.sharingImageUrl= ''
     }

     if(this.imgList7.length!=0){
      this.activityLive.hostHeadPortraitUrl= this.imgList7[0].relative_url
     }
     else{
       this.activityLive.hostHeadPortraitUrl= ''
     }

     this.activityLive.goodsIds=this.goods

     this.activityLive.makeAppSendTime=this.makeAppSendTime
     this.activityLive.liveStreamingStartTime=this.liveStreamingStartTime
     this.activityLive.liveStreamingEndTime=this.liveStreamingEndTime
     this.activityLive.shoppingStartTime=this.shoppingStartTime
     this.activityLive.shoppingEndTime=this.shoppingEndTime
     this.activityLive.skipLiveStartTime=this.skipLiveStartTime
     this.activityLive.skipLiveEndTime=this.skipLiveEndTime



      activityLiveConfigSubmit( this.activityLive).then(response => {
         this.openLiveConfig=false
        this.msgSuccess("配置成功");
         this.getList()
      });

    },

    cancelLiveConfigSubmit(){
       this.openLiveConfig=false
    },




    // 基础配置
    handleBase(row){

      this.$nextTick(() => {
        this.$refs.imageuploadCour.syncElUpload();
      })

      this.imgList=[];
      this.imgList2=[];
      this.imgList3=[];
      this.imgList4=[];
      this.imgListAd1=[];
      this.imgListAd2=[];
      this.imgListAd3=[];
      this.imgListAd4=[];
      this.imgListcour=[];

      this.musciList=[];
      this.baseForm = {
        activityImageUrl: null,
        activityDetailsImageUrl: null,
        posterBackgroundImageUrl: null,
        musicUrl: null,
        musicUrlFull:null,
        sharingFriend: null,
        sharingImageUrl: null,
        sharingTitle: null,
        sharingDescribe: null,
        customerServicePhone: null,
        subjectColor: null,
        redEnvelopesStatus: null,
        startAmount: null,
        endAmount: null,
        receiveMode: null,
        extensionStatus: null,
        extensionPrice: null,
        isOpenDelayed: null
      };


      // 回显接口
      let data={
        activityId:row.id
      }
      openActivityOnlineConfig(data).then(response => {
        // 编辑
       this.baseForm=response.activityOnline
       if(response.activityOnline.subjectColor!=null){
          this.baseForm.subjectColor=parseInt(response.activityOnline.subjectColor)
       }
       console.log(this.baseForm)

       if(response.activityOnline!=null){

         if(response.activityOnline.activityImageUrl!=null){
           let data = {
               url: response.activityOnline.activityImageUrlFull,
               relative_url: response.activityOnline.activityImageUrl
             }
           this.imgList.push(data)
         }

         if(response.activityOnline.activityDetailsImageUrl!=null){
           let data2 = {
               url: response.activityOnline.activityDetailsImageUrlFull,
               relative_url: response.activityOnline.activityDetailsImageUrl
             }
           this.imgList2.push(data2)
         }


         if(response.activityOnline.posterBackgroundImageUrl!=null){
           let data3 = {
               url: response.activityOnline.posterBackgroundImageUrlFull,
               relative_url: response.activityOnline.posterBackgroundImageUrl
             }
           this.imgList3.push(data3)
         }

         if(response.activityOnline.sharingImageUrl!=null){
           let data4 = {
               url: response.activityOnline.sharingImageUrlFull,
               relative_url: response.activityOnline.sharingImageUrl
             }
           this.imgList4.push(data4)
         }

         if(response.activityOnline.advertisingsImageOneUrl!=null){
           let data5 = {
               url: response.activityOnline.advertisingsImageOneUrlFull,
               relative_url: response.activityOnline.advertisingsImageOneUrl
             }
           this.imgListAd1.push(data5)
         }

         if(response.activityOnline.advertisingsImageTwoUrl!=null){
           let data6 = {
               url: response.activityOnline.advertisingsImageTwoUrlFull,
               relative_url: response.activityOnline.advertisingsImageTwoUrl
             }
           this.imgListAd2.push(data6)
         }

         if(response.activityOnline.advertisingsImageThreeUrl!=null){
           let data7 = {
               url: response.activityOnline.advertisingsImageThreeUrlFull,
               relative_url: response.activityOnline.advertisingsImageThreeUrl
             }
           this.imgListAd3.push(data7)
         }

         if(response.activityOnline.advertisingsImageFourUrl!=null){
           let data8 = {
               url: response.activityOnline.advertisingsImageFourUrlFull,
               relative_url: response.activityOnline.advertisingsImageFourUrl
             }
           this.imgListAd4.push(data8)
         }

         if(response.activityOnline.rotationMapList!=null){
            for (var i = 0; i < response.activityOnline.rotationMapList.length; i++) {
             let data9 = {
                 url: response.activityOnline.rotationMapList[i],
                 relative_url: response.activityOnline.rotationMapList[i].split(".com")[1]
               }
             this.imgListcour.push(data9)
            }
         }



         if(response.activityOnline.musicUrl!=null){
           let music={
             name:response.activityOnline.musicUrl,
             url:response.activityOnline.musicUrlFull,
           }
           this.musciList.push(music)
         }

       }



        this.openBase=true
        this.title = "基础配置";
      });


    },


     baseSubmit(){

        console.log(this.musciList)
       if(this.imgList.length!=0){
        this.baseForm.activityImageUrl= this.imgList[0].relative_url
       }
       else{
         this.msgError("活动头图不能为空")
         return

       }


       if(this.musciList.length==0){
         console.log("asdasdasdasdadasdads")
         this.baseForm.musicUrl=null
         this.baseForm.musicUrlFull=null
       }




       if(this.imgListcour.length!=0){
         console.log("fffffffff")
         console.log(this.imgListcour)
         let imageStr=[]

         for (var i = 0; i < this.imgListcour.length; i++) {
             imageStr.push(this.imgListcour[i].relative_url)
         }

           this.baseForm.rotationMap=imageStr.toString()
       }
       else{
           this.baseForm.rotationMap=''
       }





       if(this.imgList2.length!=0){
        this.baseForm.activityDetailsImageUrl= this.imgList2[0].relative_url
       }
       else{
		 this.baseForm.activityDetailsImageUrl=''
       }

       if(this.imgList3.length!=0){
        this.baseForm.posterBackgroundImageUrl= this.imgList3[0].relative_url
       }
       else{
         this.baseForm.posterBackgroundImageUrl= ''
       }

       if(this.imgList4.length!=0){
        this.baseForm.sharingImageUrl= this.imgList4[0].relative_url
       }
       else{
         this.msgError("分享小图标不能为空")
         return

       }



       if(this.imgListAd1.length!=0){
        this.baseForm.advertisingsImageOneUrl= this.imgListAd1[0].relative_url
       }
       else{
         this.baseForm.advertisingsImageOneUrl= ''
       }

       if(this.imgListAd2.length!=0){
        this.baseForm.advertisingsImageTwoUrl= this.imgListAd2[0].relative_url
       }
       else{
         this.baseForm.advertisingsImageTwoUrl= ''
       }

       if(this.imgListAd3.length!=0){
        this.baseForm.advertisingsImageThreeUrl= this.imgListAd3[0].relative_url
       }
       else{
         this.baseForm.advertisingsImageThreeUrl= ''
       }

       if(this.imgListAd4.length!=0){
        this.baseForm.advertisingsImageFourUrl= this.imgListAd4[0].relative_url
       }
       else{
         this.baseForm.advertisingsImageFourUrl= ''
       }


       console.log(this.baseForm)
        let data={
         activityOnline:this.baseForm
        }

        this.$refs["baseForm"].validate(valid => {
          if (valid) {
         activityOnlineConfig(this.baseForm).then(response => {
          this.openBase=false
          this.msgSuccess("配置成功");
           this.getList()
         });
          }
        });


     },

     cancelbaseSubmit(){
        this.openBase=false;
     },




    handleRemoveFile(file, fileList){
       console.log(file, fileList);
       this.musciList.length=0
       this.baseForm.musicUrl=null
       this.baseForm.musicUrlFull=null
    },

    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },

    //拿到文件地址
    handleSuccess(res, file, fileList) {
      console.log(fileList)
      let music={
        name:fileList[0].response.fileName,
        url:fileList[0].response.url
      }
      this.musciList.push(music)
      this.baseForm.musicUrl=fileList[0].response.fileName
      this.baseForm.musicUrlFull=fileList[0].response.url



    },





    /** 商户排序 */
    handleSort(row) {
      this.getbrandSort(row.id)

    },

    getbrandSort(id) {
      let data={
       activityId:id
      }
      brandSort(data).then(response => {
        this.brandSortList = response.activityBrandList;
        this.openSort = true;
        this.title = "商户排序";
      });
    },


    submitSort(){

      console.log(this.brandSortList)
      updateBrandSort(this.brandSortList).then(response => {
        this.openSort=false
        this.msgSuccess("排序成功");
         this.getList()
      });
    },

    cancelSort(){
      this.openSort=false;
    },



   handleOpenQrcode(row){
     const activityId=row.id
     let data={
       activityId:activityId
     }
     getActivityQrCode(data).then(response => {
       const blob = new Blob([response]);
       const url = window.URL.createObjectURL(blob);
       console.log(url)
       this.dialogVisible=true
       this.dialogImageUrl=url
     });
   },

   handleOpenLiveQrcode(row){
     const activityId=row.id
     let data={
       activityId:activityId
     }
     getActivityLiveQrCode(data).then(response => {
       const blob = new Blob([response]);
       const url = window.URL.createObjectURL(blob);
       console.log(url)
       this.dialogVisible=true
       this.dialogImageUrl=url
     });
   },


   handleactivityLinkQrcode(row){
     const activityId=row.id
     let data={
       activityId:activityId
     }
     getactivityLinkQrCode(data).then(response => {
       const blob = new Blob([response]);
       const url = window.URL.createObjectURL(blob);
       console.log(url)
       this.dialogVisible=true
       this.dialogImageUrl=url
     });
   },


    // 秒杀排序
    handleSecKillSort(row) {
      this.getbrandSecKillSort(row.id)

    },

    getbrandSecKillSort(id) {
      let data={
       activityId:id
      }
      seckillSort(data).then(response => {
        this.secKillSortList = response.goodsRelationList;
        this.openSecKillSort = true;
        this.title = "秒杀排序";
      });
    },


    submitSeckillSort(){

      updateSecKillSort(this.secKillSortList).then(response => {
        this.openSecKillSort=false
         this.msgSuccess("排序成功");
          this.getList()
      });
    },

    cancelSeckillSort(){
      this.openSecKillSort=false;
    },






      //秒杀配置


      // 重置链接
      handleResetLink(row){

        this.$confirm('是否确认重置链接?', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(function() {
            let data={
              activityId:row.id
            }
            return resetLink(data);
          }).then(() => {
            this.getList();
            this.msgSuccess("重置成功");
          }).catch(() => {});


      },


      // 红包充值
      handleRedSubmit(row){
        this.getredEnvelopesRecharge(row.id)
      },


      getredEnvelopesRecharge(id) {
        let data={
         activityId:id
        }
        redEnvelopesRecharge(data).then(response => {
         this.redSubmitData=response.data
         this.openRedSubmit=true
          this.title = "红包充值";
        });
      },

      RedSubmit(){
        redEnvelopesRechargeSubmit(this.redSubmitData).then(response => {
          this.openRedSubmit=false
          this.getList()
           this.msgSuccess("充值成功");
        });
      },

      cancelRedSubmit(){
        this.openRedSubmit=false
      },





      // 带看配置
      handleDaiKan(row){
        this.getopenTakeWatchConfig(row.id)

      },

      getopenTakeWatchConfig(id){
        let data={
         activityId:id
        }
        this.takeWatchId=id
        openTakeWatchConfig(data).then(response => {
          if(response.activityTakeWatch!=null){
             this.activityTakeWatch=response.activityTakeWatch
          }
         this.openDaiKanSubmit=true
         this.title = "带看配置";
        });
      },

      DaiKanSubmit(){
        this.activityTakeWatch.activityId=this.takeWatchId
        takeWatchConfig(this.activityTakeWatch).then(response => {
          this.openDaiKanSubmit=false
          this.getList()
           this.msgSuccess("配置成功");
        });
      },

      cancelDaiKanSubmit(){
        this.openDaiKanSubmit=false
      },





      // 带客充值
      handleDaikeCharge(row){
        this.takeWatchRechargeRemark=null;
        this.gettakeWatchRecharge(row.id)
      },

      gettakeWatchRecharge(id){
        let data={
         activityId:id
        }
        this.takeWatchRechargeId=id
        takeWatchRecharge(data).then(response => {
         this.takeWatchRecharge=response.rows
         this.openDaiKeRecharge=true
         this.title = "带客充值";
        });

      },


      DaiKeRechargeSubmit(){


        let submitList=[];

        for (var i = 0; i < this.takeWatchRecharge.length; i++) {
            let data={
              brandId:this.takeWatchRecharge[i].brandId,
              amount:this.takeWatchRecharge[i].amount
            }
            submitList.push(data)
        }

        let data={
            activityId:this.takeWatchRechargeId,
            remarks:this.takeWatchRechargeRemark,
            list:submitList
        }


        takeWatchRechargeSubmit(data).then(response => {
          this.openDaiKeRecharge=false
          this.getList()
           this.msgSuccess("充值成功");
        });
      },

      cancelDaiKeRecharge(){
        this.openDaiKeRecharge=false
      },





    // 直播充值
    handleLiveCharge(row){
      this.getLiveRecharge(row.id)
    },


    getLiveRecharge(id) {
      let data={
       activityId:id
      }
      liveRecharge(data).then(response => {
       this.liveRechargeData=response.data
       this.openLiveSubmit=true
        this.title = "直播充值";
      });
    },

    LiveSubmit(){
      this.liveRechargeData.id=null;
      liveRechargeSubmit(this.liveRechargeData).then(response => {
        this.openLiveSubmit=false
        this.getList()
         this.msgSuccess("充值成功");
      });
    },

    cancelLiveSubmit(){
      this.openLiveSubmit=false
    },






    //分卡配置

    handleFenak(row){
      this.getBrandEndNumList(row.id)

    },

    getBrandEndNumList(id){
      let data={
       activityId:id
      }

      this.cardNumListId=id

      BrandEndNumList(data).then(response => {
       this.cardNumListRespList=response.cardNumListRespList
       this.openFenka=true
       this.title = "分卡配置";
      });
    },

    fenkaSubmit(){
      this.cardNumListRespList.activityBrandId=this.cardNumListId
      BrandMaxNumSave(this.cardNumListRespList).then(response => {
        this.openFenka=false
        this.getList()
         this.msgSuccess("配置成功");
      });
    },

    cancelfenkaSubmit(){
      this.openFenka=false
    },






     // 审核
     handleShenHe(row){

       if(row.activityStatus==1){
         this.$confirm('是否确认审核?', "警告", {
             confirmButtonText: "拒绝",
             cancelButtonText: "取消",
             type: "warning"
           }).then(function() {
             let data={
               id:row.id,
               activityStatus:-1
             }
             return examine(data);
           })
           .then(() => {
             this.msgSuccess("审核成功");
             this.getList();
           })
           .catch(function() {

           });
       }
       else{
         this.$confirm('是否确认审核?', "警告", {
             confirmButtonText: "同意",
             cancelButtonText: "取消",
             type: "warning"
           }).then(function() {
             let data={
               id:row.id,
               activityStatus:1
             }
             return examine(data);
           })
           .then(() => {
             this.msgSuccess("审核成功");
             this.getList();
           })
           .catch(function() {

           });
       }



     },


    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      if(this.userName=="admin"){
          this.isEditAble=false
        }
       else{
         this.isEditAble=true
       }
      const id = row.id || this.ids
      getActivity(id).then(response => {
        this.form = response.activity;

        for (var i = 0; i < response.activityBrandList.length; i++) {
           this.brands.push(response.activityBrandList[i].brandId)
        }

        for (var i = 0; i < response.activityCityList.length; i++) {
           this.citys.push(response.activityCityList[i].cityId)
        }

        // if(this.form.activityType!=null&&this.form.activityType!=''){
        //   console.log(this.form.activityType.split(','))
        //     this.select=this.form.activityType.split(',')
        // }
        var temSelect=[];
        this.select=[];
        temSelect=response.activity.activityType.split(",")


        console.log(temSelect)


        for (var i = 0; i < temSelect.length; i++) {
          if(temSelect[i]==1){
            this.select.push("线上活动");
          }
          else if(temSelect[i]==2){
            this.select.push("线下活动");
          }
          else if(temSelect[i]==3){
            this.select.push("直播活动");
          }
          else if(temSelect[i]==4){
            this.select.push("带看活动");
          }
        }
        // this.activityTypeList=this.select
        this.open = true;
        this.title = "修改活动";
      });
    },
    /** 提交按钮 */
    submitForm() {

      if(this.select.length>0){
        let param=[]
        for (var i = 0; i < this.select.length; i++) {

           if(this.select[i]=='线上活动'){
             param.push("1")
           }
           else if(this.select[i]=='线下活动'){
             param.push("2")
           }
           else if(this.select[i]=='直播活动'){
             param.push("3")
           }
           else if(this.select[i]=='带看活动'){
             param.push("4")
           }
        }
        // param.splice(0, 0, ",");
        // param.push(",")

        this.form.activityType=param.toString()
        console.log(param)
      }
      else{
         this.form.activityType=null
      }
       // this.form.brandIds=this.brands
      // this.form.brandIds=JSON.stringify(this.brands).replaceAll("\"","");
      // this.form.cityIds=JSON.stringify(this.citys)
      this.form.brandIds=this.brands
      this.form.cityIds=this.citys


      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateActivity(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addActivity(this.form).then(response => {
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
      this.$confirm('是否确认删除活动编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delActivity(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },




    handleOpenActivity(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认上线', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          let data={
            id:ids,
            onlineStatus:1
          }
          return enableActivity(data);
        }).then(() => {
          this.getList();
          this.msgSuccess("上线成功");
        }).catch(() => {});
    },

    handleCloseActivity(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认下线', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          let data={
            id:ids,
            onlineStatus:-1
          }
          return enableActivity(data);
        }).then(() => {
          this.getList();
          this.msgSuccess("下线成功");
        }).catch(() => {});
    },



    handleOpenLiveActivity(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认上线', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          let data={
            id:ids,
            liveStatus:1
          }
          return enableLiveActivity(data);
        }).then(() => {
          this.getList();
          this.msgSuccess("上线成功");
        }).catch(() => {});
    },

    handleCloseLiveActivity(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认下线', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          let data={
            id:ids,
            liveStatus:-1
          }
          return enableLiveActivity(data);
        }).then(() => {
          this.getList();
          this.msgSuccess("下线成功");
        }).catch(() => {});
    },





    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有活动数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportActivity(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>

<style scoped>

.my-transfer/deep/.el-transfer-panel {
    width: 200px;
  }


  .my-transfer/deep/.el-transfer__buttons button {
    display: flex !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .my-transfer/deep/.el-button [class*=el-icon-]+span {
    margin-left: 0 !important;
  }

  .my-input/deep/.el-input__inner{
    text-align: center;
  }

  .require/deep/.el-form-item__label::before{
    content: "*";
    color: #ff4949;
    margin-right: 4px;
  }

  </style>
