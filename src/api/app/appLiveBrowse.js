import request from '@/utils/request'

// 查询小程序客户浏览直播记录列表
export function listAppLiveBrowse(query) {
  return request({
    url: '/app/appLiveBrowse/list',
    method: 'get',
    params: query
  })
}

// 查询小程序客户浏览直播记录详细
export function getAppLiveBrowse(id) {
  return request({
    url: '/app/appLiveBrowse/' + id,
    method: 'get'
  })
}

// 新增小程序客户浏览直播记录
export function addAppLiveBrowse(data) {
  return request({
    url: '/app/appLiveBrowse',
    method: 'post',
    data: data
  })
}

// 修改小程序客户浏览直播记录
export function updateAppLiveBrowse(data) {
  return request({
    url: '/app/appLiveBrowse',
    method: 'put',
    data: data
  })
}

// 删除小程序客户浏览直播记录
export function delAppLiveBrowse(id) {
  return request({
    url: '/app/appLiveBrowse/' + id,
    method: 'delete'
  })
}

// 导出小程序客户浏览直播记录
export function exportAppLiveBrowse(query) {
  return request({
    url: '/app/appLiveBrowse/export',
    method: 'get',
    params: query
  })
}