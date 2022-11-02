import request from '@/utils/request'

// 查询线上活动订单列表
export function listActivityOnlineOrder(query) {
  return request({
    url: '/orderManage/activityOnlineOrder/list',
    method: 'get',
    params: query
  })
}

// 查询线上活动订单详细
export function getActivityOnlineOrder(id) {
  return request({
    url: '/orderManage/activityOnlineOrder/' + id,
    method: 'get'
  })
}

// 新增线上活动订单
export function addActivityOnlineOrder(data) {
  return request({
    url: '/orderManage/activityOnlineOrder',
    method: 'post',
    data: data
  })
}

// 修改线上活动订单
export function updateActivityOnlineOrder(data) {
  return request({
    url: '/orderManage/activityOnlineOrder',
    method: 'put',
    data: data
  })
}

// 删除线上活动订单
export function delActivityOnlineOrder(id) {
  return request({
    url: '/orderManage/activityOnlineOrder/' + id,
    method: 'delete'
  })
}

// 导出线上活动订单
export function exportActivityOnlineOrder(query) {
  return request({
    url: '/orderManage/activityOnlineOrder/export',
    method: 'get',
    params: query
  })
}

export function verificationOrder(data) {
  return request({
    url: '/orderManage/activityOnlineOrder/verificationOrder',
    method: 'put',
    params: data
  })
}


export function refundOrderOnlineOrder(data) {
  return request({
    url: '/orderManage/activityOnlineOrder/refundOrder',
    method: 'put',
    params: data
  })
}


export function SumPayPriceOnlineOrder(query) {
  return request({
    url: '/orderManage/activityOnlineOrder/SumPayPrice',
    method: 'get',
    params: query
  })
}
