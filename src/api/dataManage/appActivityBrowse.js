import request from '@/utils/request'

// 查询小程序客户浏览活动记录列表
export function listAppActivityBrowse(query) {
  return request({
    url: '/dataManage/appActivityBrowse/list',
    method: 'get',
    params: query
  })
}

// 查询小程序客户浏览活动记录详细
export function getAppActivityBrowse(id) {
  return request({
    url: '/dataManage/appActivityBrowse/' + id,
    method: 'get'
  })
}

// 新增小程序客户浏览活动记录
export function addAppActivityBrowse(data) {
  return request({
    url: '/dataManage/appActivityBrowse',
    method: 'post',
    data: data
  })
}

// 修改小程序客户浏览活动记录
export function updateAppActivityBrowse(data) {
  return request({
    url: '/dataManage/appActivityBrowse',
    method: 'put',
    data: data
  })
}

// 删除小程序客户浏览活动记录
export function delAppActivityBrowse(id) {
  return request({
    url: '/dataManage/appActivityBrowse/' + id,
    method: 'delete'
  })
}

// 导出小程序客户浏览活动记录
export function exportAppActivityBrowse(query) {
  return request({
    url: '/dataManage/appActivityBrowse/export',
    method: 'get',
    params: query
  })
}