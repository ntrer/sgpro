import request from '@/utils/request'

// 查询派送订单列表
export function listDeliveryOrder(query) {
  return request({
    url: '/delivery/deliveryOrder/list',
    method: 'get',
    params: query
  })
}

// 查询派送订单详细
export function getDeliveryOrder(id) {
  return request({
    url: '/delivery/deliveryOrder/' + id,
    method: 'get'
  })
}

// 新增派送订单
export function addDeliveryOrder(data) {
  return request({
    url: '/delivery/deliveryOrder',
    method: 'post',
    data: data
  })
}

// 修改派送订单
export function updateDeliveryOrder(data) {
  return request({
    url: '/delivery/deliveryOrder',
    method: 'put',
    data: data
  })
}

// 删除派送订单
export function delDeliveryOrder(id) {
  return request({
    url: '/delivery/deliveryOrder/' + id,
    method: 'delete'
  })
}

// 导出派送订单
export function exportDeliveryOrder(query) {
  return request({
    url: '/delivery/deliveryOrder/export',
    method: 'get',
    params: query
  })
}


export function listworkerUser(query) {
  return request({
    url: '/delivery/workerUserInfo/list?del=1&enable=1',
    method: 'get',
    params: query
  })
}


export function dispatch(query) {
  return request({
    url: '/delivery/deliveryOrder/dispatch',
    method: 'get',
    params: query
  })
}



export function endlist(query) {
  return request({
    url: '/delivery/deliveryOrder/endlist',
    method: 'get',
    params: query
  })
}


export function deliveryRecord(query) {
  return request({
    url: '/delivery/deliveryOrder/delivery/record',
    method: 'get',
    params: query
  })
}

export function evaluateInfo(query) {
  return request({
    url: '/delivery/deliveryOrder/evaluate/info',
    method: 'get',
    params: query
  })
}

export function installimg(query) {
  return request({
    url: '/delivery/deliveryOrder/delivery/installimg',
    method: 'get',
    params: query
  })
}