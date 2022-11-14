import request from '@/utils/request'

// 查询抖音客户信息列表
export function listCustomer(query) {
  return request({
    url: '/douyin/customer/list',
    method: 'get',
    params: query
  })
}

// 查询抖音客户信息详细
export function getCustomer(id) {
  return request({
    url: '/douyin/customer/' + id,
    method: 'get'
  })
}

// 新增抖音客户信息
export function addCustomer(data) {
  return request({
    url: '/douyin/customer',
    method: 'post',
    data: data
  })
}

// 修改抖音客户信息
export function updateCustomer(data) {
  return request({
    url: '/douyin/customer',
    method: 'put',
    data: data
  })
}

// 删除抖音客户信息
export function delCustomer(id) {
  return request({
    url: '/douyin/customer/' + id,
    method: 'delete'
  })
}

// 导出抖音客户信息
export function exportCustomer(query) {
  return request({
    url: '/douyin/customer/export',
    method: 'get',
    params: query
  })
}