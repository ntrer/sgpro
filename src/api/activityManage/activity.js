import request from '@/utils/request'

// 查询活动列表
export function listActivity(query) {
  return request({
    url: '/activityManage/activity/list',
    method: 'get',
    params: query
  })
}

// 查询活动详细
export function getActivity(id) {
  return request({
    url: '/activityManage/activity/' + id,
    method: 'get'
  })
}

// 新增活动
export function addActivity(data) {
  return request({
    url: '/activityManage/activity',
    method: 'post',
    data: data
  })
}

// 修改活动
export function updateActivity(data) {
  return request({
    url: '/activityManage/activity',
    method: 'put',
    data: data
  })
}

// 删除活动
export function delActivity(id) {
  return request({
    url: '/activityManage/activity/' + id,
    method: 'delete'
  })
}

// 导出活动
export function exportActivity(query) {
  return request({
    url: '/activityManage/activity/export',
    method: 'get',
    params: query
  })
}

// 查询品牌列表
export function listBrand(query) {
  return request({
    url: '/activityManage/activity/getBrandList',
    method: 'get',
    params: query
  })
}

export function listArea(query) {
  return request({
    url: '/activityManage/activity/getAreaList',
    method: 'get',
    params: query
  })
}

export function brandSort(query) {
  return request({
    url: '/activityManage/activityBrand/openOnlineBrandSort',
    method: 'get',
    params: query
  })
}



export function updateBrandSort(data) {
  return request({
    url: '/activityManage/activityBrand/onlineBrandSort',
    method: 'put',
    data: data
  })
}


export function seckillSort(query) {
  return request({
    url: '/activityManage/activityOnlineGoodsRelation/openOnlineGoodSort',
    method: 'get',
    params: query
  })
}


export function updateSecKillSort(data) {
  return request({
    url: '/activityManage/activityOnlineGoodsRelation/onlineGoodSort',
    method: 'put',
    data: data
  })
}



export function resetLink(data) {
  return request({
    url: '/activityManage/activity/resetLink',
    method: 'put',
    data: data
  })
}


export function redEnvelopesRecharge(query) {
  return request({
    url: '/orderManage/activityRedEnvelopesRecharge/initial/details',
    method: 'get',
    params: query
  })
}



export function redEnvelopesRechargeSubmit(data) {
  return request({
    url: '/orderManage/activityRedEnvelopesRecharge',
    method: 'post',
    data: data
  })
}




export function examine(data) {
  return request({
    url: '/activityManage/activity/examine',
    method: 'put',
    data: data
  })
}



export function openTakeWatchConfig(query) {
  return request({
    url: '/activityManage/activityTakeWatch/openTakeWatchConfig',
    method: 'get',
    params: query
  })
}


export function takeWatchConfig(data) {
  return request({
    url: '/activityManage/activityTakeWatch/takeWatchConfig',
    method: 'put',
    data: data
  })
}



export function takeWatchRecharge(query) {
  return request({
    url: '/orderManage/activityTakeWatchRecharge/initial/list',
    method: 'get',
    params: query
  })
}



export function takeWatchRechargeSubmit(data) {
  return request({
    url: '/orderManage/activityTakeWatchRecharge',
    method: 'post',
    data: data
  })
}


export function liveRecharge(query) {
  return request({
    url: '/liveManage/liveRedEnvelopesRecharge/initial/details',
    method: 'get',
    params: query
  })
}


export function liveRechargeSubmit(data) {
  return request({
    url: '/liveManage/liveRedEnvelopesRecharge',
    method: 'post',
      data: data
  })
}


export function BrandEndNumList(query) {
  return request({
    url: '/activityManage/activityBrand/activityBrandEndNumList',
    method: 'get',
    params: query
  })
}


export function BrandMaxNumSave(data) {
  return request({
    url: '/activityManage/activityBrand/activityBrandMaxNumSave',
    method: 'put',
    data: data
  })
}


export function activityOnlineConfig(data) {
  return request({
    url: '/activityManage/activityOnline/activityOnlineConfig',
    method: 'put',
    data: data
  })
}

export function openActivityOnlineConfig(query) {
  return request({
    url: '/activityManage/activityOnline/openActivityOnlineConfig',
    method: 'get',
    params: query
  })
}


export function openActivityLiveGoodConfig(query) {
  return request({
    url: '/liveManage/activityLiveGoodsRelation/openActivityLiveGoodConfig',
    method: 'get',
    params: query
  })
}


export function activityLiveGoodsRelation(data) {
  return request({
    url: '/liveManage/activityLiveGoodsRelation',
    method: 'put',
    data: data
  })
}



export function activityLiveConfig(data) {
  return request({
    url: '/liveManage/activityLiveControlPanel/liveControlPanel',
    method: 'put',
    data: data
  })
}


export function openActivityLiveConfig(query) {
  return request({
    url: '/liveManage/activityLiveControlPanel/openLiveControlPanel',
    method: 'get',
    params: query
  })
}


export function livePushRedPackage(data) {
  return request({
    url: '/liveManage/livePushRedPackage',
    method: 'post',
     data: data
  })
}


export function pushRedPackageEnable(data) {
  return request({
    url: '/liveManage/livePushRedPackage',
    method: 'put',
    data: data
  })
}


export function getLiveConfig(query) {
  return request({
    url: '/liveManage/activityLive/openActivityLiveConfig',
    method: 'get',
    params: query
  })
}


export function openOnlineGoodConfig(query) {
  return request({
    url: '/activityManage/activityOnlineGoodsRelation/openOnlineGoodConfig',
    method: 'get',
    params: query
  })
}


export function activityLiveConfigSubmit(data) {
  return request({
    url: '/liveManage/activityLive/activityLiveConfig',
    method: 'put',
    data: data
  })
}


// 删除活动
export function delLiveShieldKeyWords(id) {
  return request({
    url: '/liveManage/activityLiveControlPanel/delLiveShieldKeyWords/' + id,
    method: 'delete'
  })
}


export function addLiveShieldKeyWords(data) {
  return request({
    url: '/liveManage/activityLiveControlPanel/addLiveShieldKeyWords',
    method: 'post',
      data: data
  })
}


export function updateLiveGoodsSoldNum(data) {
  return request({
    url: '/liveManage/activityLiveControlPanel/updateActivityLiveGoodsRelation',
    method: 'put',
    data: data
  })
}


export function virtualBuyOne(data) {
  return request({
    url: '/liveManage/activityLiveControlPanel/virtualBuyOne',
    method: 'post',
      data: data
  })
}


export function liveGoodsRelationSort(data) {
  return request({
    url: '/liveManage/activityLiveControlPanel/liveGoodsRelationSort',
    method: 'put',
    data: data
  })
}


export function openSeckillGoods(query) {
  return request({
    url: '/activityManage/activityOnlineGoodsRelation/openOnlineGoodConfig',
    method: 'get',
    params: query
  })
}


export function openOnlineGoodConfigDetail(data) {
  return request({
    url: '/activityManage/activityOnlineGoodsRelation/openOnlineGoodConfigDetail',
   method: 'put',
   data: data
  })
}


export function submitSecConfig(data) {
  return request({
    url: '/activityManage/activityOnlineGoodsRelation/onlineGoodConfig',
   method: 'put',
   data: data
  })
}


// 活动二维码
export function getActivityQrCode(query) {
  return request({
    url: '/activityManage/activity/activityQrCode',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

// 直播二维码
export function getActivityLiveQrCode(query) {
  return request({
    url: '/liveManage/activityLive/activityQrCode',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}


export function enableActivity(data) {
  return request({
    url: '/activityManage/activity/online/enable',
    method: 'put',
    data: data
  })
}

export function enableLiveActivity(data) {
  return request({
    url: '/activityManage/activity/live/enable',
    method: 'put',
    data: data
  })
}


export function getactivityLinkQrCode(query) {
  return request({
    url: '/activityManage/activity/activityLinkQrCode',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}



export function opengroupleader(query) {
  return request({
    url: '/activityManage/guideConfig/group/leader/view',
    method: 'get',
    params: query
  })
}

export function setgroupleader(query) {
  return request({
    url: '/activityManage/guideConfig/set/group/leader',
    method: 'get',
    params: query
  })
}


export function opengrouplist(query) {
  return request({
    url: '/activityManage/guideConfig/group/list',
    method: 'get',
    params: query
  })
}


export function setgrouplist(query) {
  return request({
    url: '/activityManage/guideConfig/set/group',
    method: 'get',
    params: query
  })
}



export function openguideConfig(query) {
  return request({
    url: '/activityManage/guideConfig/guideConfig/view',
    method: 'get',
    params: query
  })
}


export function setguideConfig(data) {
  return request({
    url: '/activityManage/guideConfig',
    method: 'post',
    data: data
  })
}
