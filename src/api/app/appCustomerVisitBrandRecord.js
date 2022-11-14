import request from '@/utils/request'

// 查询小程序客户浏览品牌记录列表
export function listAppCustomerVisitBrandRecord(query) {
  return request({
    url: '/app/appCustomerVisitBrandRecord/list',
    method: 'get',
    params: query
  })
}

// 查询小程序客户浏览品牌记录详细
export function getAppCustomerVisitBrandRecord(id) {
  return request({
    url: '/app/appCustomerVisitBrandRecord/' + id,
    method: 'get'
  })
}

// 新增小程序客户浏览品牌记录
export function addAppCustomerVisitBrandRecord(data) {
  return request({
    url: '/app/appCustomerVisitBrandRecord',
    method: 'post',
    data: data
  })
}

// 修改小程序客户浏览品牌记录
export function updateAppCustomerVisitBrandRecord(data) {
  return request({
    url: '/app/appCustomerVisitBrandRecord',
    method: 'put',
    data: data
  })
}

// 删除小程序客户浏览品牌记录
export function delAppCustomerVisitBrandRecord(id) {
  return request({
    url: '/app/appCustomerVisitBrandRecord/' + id,
    method: 'delete'
  })
}

// 导出小程序客户浏览品牌记录
export function exportAppCustomerVisitBrandRecord(query) {
  return request({
    url: '/app/appCustomerVisitBrandRecord/export',
    method: 'get',
    params: query
  })
}