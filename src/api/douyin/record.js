import request from '@/utils/request'

// 查询抖音视频扫码分享记录列表
export function listRecord(query) {
  return request({
    url: '/douyin/scanCodeshare/record/list',
    method: 'get',
    params: query
  })
}

// 查询抖音视频扫码分享记录详细
export function getRecord(id) {
  return request({
    url: '/douyin/record/' + id,
    method: 'get'
  })
}

// 新增抖音视频扫码分享记录
export function addRecord(data) {
  return request({
    url: '/douyin/record',
    method: 'post',
    data: data
  })
}

// 修改抖音视频扫码分享记录
export function updateRecord(data) {
  return request({
    url: '/douyin/record',
    method: 'put',
    data: data
  })
}

// 删除抖音视频扫码分享记录
export function delRecord(id) {
  return request({
    url: '/douyin/record/' + id,
    method: 'delete'
  })
}

// 导出抖音视频扫码分享记录
export function exportRecord(query) {
  return request({
    url: '/douyin/record/export',
    method: 'get',
    params: query
  })
}


export function listcustomerRecord(query) {
  return request({
    url: '/douyin/activity/customer/list',
    method: 'get',
    params: query
  })
}

export function listActivity(query) {
  return request({
    url: '/douyin/activity/list',
    method: 'get',
    params: query
  })
}


export function listredenvelopesRecord(query) {
  return request({
    url: '/douyin/redenvelopes/record/list',
    method: 'get',
    params: query
  })
}

export function listvideoRecord(query) {
  return request({
    url: '/home/chart/video/forward/statistics',
    method: 'get',
    params: query
  })
}



export function exportStatistics(query) {
  return request({
    url: '/home/chart/video/forward/statistics/export',
    method: 'get',
    params: query
  })
}


export function listdouiyinActivity(query) {
  return request({
    url: '/org/douyin/douiyinActivity/list',
    method: 'get',
    params: query
  })
}

export function enabledouiyinActivity(data) {
  return request({
    url: '/org/douyin/douiyinActivity/enable',
    method: 'put',
    data: data
  })
}

export function deldouiyinActivity(id) {
  return request({
    url: '/org/douyin/douiyinActivity/' + id,
    method: 'delete'
  })
}

export function adddouiyinActivity(data) {
  return request({
    url: '/org/douyin/douiyinActivity',
    method: 'post',
    data: data
  })
}

export function listpreview(query) {
  return request({
    url: '/org/douyin/douiyinActivity/preview',
    method: 'get',
    params: query
  })
}


export function videoMaxMegabyte(query) {
  return request({
    url: 'org/douyin/douiyinActivity/videoMaxMegabyte',
    method: 'get',
    params: query
  })
}


export function listinviteRecord(query) {
  return request({
    url: '/system/inviteRecord/list',
    method: 'get',
    params: query
  })
}

export function listinviteRecord2(query) {
  return request({
    url: '/system/inviteRecord/brand/list',
    method: 'get',
    params: query
  })
}


export function listinviteguide(query) {
  return request({
    url: '/system/inviteRecord/guide/list',
    method: 'get',
    params: query
  })
}


export function listliveBook(query) {
  return request({
    url: '/liveManage/liveBook/list',
    method: 'get',
    params: query
  })
}


export function listInviteRecord(query) {
  return request({
    url: '/liveManage/LiveInviteRecord/list',
    method: 'get',
    params: query
  })
}

export function listtakeorder(query) {
  return request({
    url: '/liveManage/LiveInviteRecord/takeorder/list',
    method: 'get',
    params: query
  })
}

export function exporttakeorder(query) {
  return request({
    url: '/liveManage/LiveInviteRecord/takeorder/export',
    method: 'get',
    params: query
  })
}