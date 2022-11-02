import request from '@/utils/request'

// 查询派单订单派单记录列表
export function listDeliveryOrderEvaluate(query) {
  return request({
    url: '/delivery/deliveryOrderEvaluate/list',
    method: 'get',
    params: query
  })
}

// 查询派单订单派单记录详细
export function getDeliveryOrderEvaluate(id) {
  return request({
    url: '/delivery/deliveryOrderEvaluate/' + id,
    method: 'get'
  })
}

// 新增派单订单派单记录
export function addDeliveryOrderEvaluate(data) {
  return request({
    url: '/delivery/deliveryOrderEvaluate',
    method: 'post',
    data: data
  })
}

// 修改派单订单派单记录
export function updateDeliveryOrderEvaluate(data) {
  return request({
    url: '/delivery/deliveryOrderEvaluate',
    method: 'put',
    data: data
  })
}

// 删除派单订单派单记录
export function delDeliveryOrderEvaluate(id) {
  return request({
    url: '/delivery/deliveryOrderEvaluate/' + id,
    method: 'delete'
  })
}

// 导出派单订单派单记录
export function exportDeliveryOrderEvaluate(query) {
  return request({
    url: '/delivery/deliveryOrderEvaluate/export',
    method: 'get',
    params: query
  })
}