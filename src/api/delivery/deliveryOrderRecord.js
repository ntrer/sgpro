import request from '@/utils/request'

// 查询派单订单评价列表
export function listDeliveryOrderRecord(query) {
  return request({
    url: '/delivery/deliveryOrderRecord/list',
    method: 'get',
    params: query
  })
}

// 查询派单订单评价详细
export function getDeliveryOrderRecord(id) {
  return request({
    url: '/delivery/deliveryOrderRecord/' + id,
    method: 'get'
  })
}

// 新增派单订单评价
export function addDeliveryOrderRecord(data) {
  return request({
    url: '/delivery/deliveryOrderRecord',
    method: 'post',
    data: data
  })
}

// 修改派单订单评价
export function updateDeliveryOrderRecord(data) {
  return request({
    url: '/delivery/deliveryOrderRecord',
    method: 'put',
    data: data
  })
}

// 删除派单订单评价
export function delDeliveryOrderRecord(id) {
  return request({
    url: '/delivery/deliveryOrderRecord/' + id,
    method: 'delete'
  })
}

// 导出派单订单评价
export function exportDeliveryOrderRecord(query) {
  return request({
    url: '/delivery/deliveryOrderRecord/export',
    method: 'get',
    params: query
  })
}