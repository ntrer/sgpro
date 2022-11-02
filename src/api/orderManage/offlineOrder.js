import request from '@/utils/request'

// 查询线下订单列表
export function listOfflineOrder(query) {
  return request({
    url: '/orderManage/offlineOrder/list',
    method: 'get',
    params: query
  })
}

// 查询线下订单详细
export function getOfflineOrder(id) {
  return request({
    url: '/orderManage/offlineOrder/' + id,
    method: 'get'
  })
}

// 新增线下订单
export function addOfflineOrder(data) {
  return request({
    url: '/orderManage/offlineOrder',
    method: 'post',
    data: data
  })
}

// 修改线下订单
export function updateOfflineOrder(data) {
  return request({
    url: '/orderManage/offlineOrder',
    method: 'put',
    data: data
  })
}

// 删除线下订单
export function delOfflineOrder(id) {
  return request({
    url: '/orderManage/offlineOrder/' + id,
    method: 'delete'
  })
}

// 导出线下订单
export function exportOfflineOrder(query) {
  return request({
    url: '/orderManage/offlineOrder/export',
    method: 'get',
    params: query
  })
}

export function verificationOrder(data) {
  return request({
    url: '/orderManage/offlineOrder/verificationOrder',
    method: 'put',
    params: data
  })
}


