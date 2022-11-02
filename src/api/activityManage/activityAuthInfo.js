import request from '@/utils/request'

// 查询活动授权信息列表
export function listActivityAuthInfo(query) {
  return request({
    url: '/activityManage/activityAuthInfo/list',
    method: 'get',
    params: query
  })
}

// 查询活动授权信息详细
export function getActivityAuthInfo(id) {
  return request({
    url: '/activityManage/activityAuthInfo/' + id,
    method: 'get'
  })
}

// 新增活动授权信息
export function addActivityAuthInfo(data) {
  return request({
    url: '/activityManage/activityAuthInfo',
    method: 'post',
    data: data
  })
}

// 修改活动授权信息
export function updateActivityAuthInfo(data) {
  return request({
    url: '/activityManage/activityAuthInfo',
    method: 'put',
    data: data
  })
}

// 删除活动授权信息
export function delActivityAuthInfo(id) {
  return request({
    url: '/activityManage/activityAuthInfo/' + id,
    method: 'delete'
  })
}

// 导出活动授权信息
export function exportActivityAuthInfo(query) {
  return request({
    url: '/activityManage/activityAuthInfo/export',
    method: 'get',
    params: query
  })
}


export function forbiddenWords(data) {
  return request({
    url: '/activityManage/activityAuthInfo/forbiddenWords',
    method: 'put',
    params: data
  })
}


