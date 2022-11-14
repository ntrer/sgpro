import request from '@/utils/request'

// 查询小程序商城客户列表
export function listAppCustomer(query) {
  return request({
    url: '/app/appCustomer/list',
    method: 'get',
    params: query
  })
}

// 查询小程序商城客户详细
export function getAppCustomer(id) {
  return request({
    url: '/app/appCustomer/' + id,
    method: 'get'
  })
}

// 新增小程序商城客户
export function addAppCustomer(data) {
  return request({
    url: '/app/appCustomer',
    method: 'post',
    data: data
  })
}

// 修改小程序商城客户
export function updateAppCustomer(data) {
  return request({
    url: '/app/appCustomer',
    method: 'put',
    data: data
  })
}

// 删除小程序商城客户
export function delAppCustomer(id) {
  return request({
    url: '/app/appCustomer/' + id,
    method: 'delete'
  })
}

// 导出小程序商城客户
export function exportAppCustomer(query) {
  return request({
    url: '/app/appCustomer/export',
    method: 'get',
    params: query
  })
}

// 设置积分
export function setIntegral(data) {
  return request({
    url: '/app/appCustomer/setIntegral',
    method: 'put',
    data: data
  })
}

export function IntegralRecordlist(query) {
  return request({
    url: '/Integral/IntegralRecord/list',
    method: 'get',
    params: query
  })
}


