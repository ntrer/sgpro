import request from '@/utils/request'

// 查询抖音活动列表
export function listActivity(query) {
  return request({
    url: '/douyin/activity/list',
    method: 'get',
    params: query
  })
}

// 查询抖音活动详细
export function getActivity(id) {
  return request({
    url: '/douyin/activity/' + id,
    method: 'get'
  })
}

// 新增抖音活动
export function addActivity(data) {
  return request({
    url: '/douyin/activity',
    method: 'post',
    data: data
  })
}

// 修改抖音活动
export function updateActivity(data) {
  return request({
    url: '/douyin/activity',
    method: 'put',
    data: data
  })
}

// 删除抖音活动
export function delActivity(id) {
  return request({
    url: '/douyin/activity/' + id,
    method: 'delete'
  })
}

// 导出抖音活动
export function exportActivity(query) {
  return request({
    url: '/douyin/activity/export',
    method: 'get',
    params: query
  })
}


export function enableActivity(data) {
  return request({
    url: '/douyin/activity/enable',
    method: 'put',
    data: data
  })
}


export function getdouyinQrCode(query) {
  return request({
    url: '/douyin/activity/douyinQrCode',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}