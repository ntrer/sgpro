import request from '@/utils/request'

// 查询活动浏览记录列表
export function listActivityBrowse(query) {
  return request({
    url: '/activityManage/activityBrowse/list',
    method: 'get',
    params: query
  })
}

// 查询活动浏览记录详细
export function getActivityBrowse(id) {
  return request({
    url: '/activityManage/activityBrowse/' + id,
    method: 'get'
  })
}

// 新增活动浏览记录
export function addActivityBrowse(data) {
  return request({
    url: '/activityManage/activityBrowse',
    method: 'post',
    data: data
  })
}

// 修改活动浏览记录
export function updateActivityBrowse(data) {
  return request({
    url: '/activityManage/activityBrowse',
    method: 'put',
    data: data
  })
}

// 删除活动浏览记录
export function delActivityBrowse(id) {
  return request({
    url: '/activityManage/activityBrowse/' + id,
    method: 'delete'
  })
}

// 导出活动浏览记录
export function exportActivityBrowse(query) {
  return request({
    url: '/activityManage/activityBrowse/export',
    method: 'get',
    params: query
  })
}