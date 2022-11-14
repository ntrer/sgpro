import request from '@/utils/request'

// 查询积分商品订单列表
export function listIntegralOrder(query) {
  return request({
    url: '/Integral/IntegralOrder/list',
    method: 'get',
    params: query
  })
}

// 查询积分商品订单详细
export function getIntegralOrder(id) {
  return request({
    url: '/Integral/IntegralOrder/' + id,
    method: 'get'
  })
}

// 新增积分商品订单
export function addIntegralOrder(data) {
  return request({
    url: '/Integral/IntegralOrder',
    method: 'post',
    data: data
  })
}

// 修改积分商品订单
export function updateIntegralOrder(data) {
  return request({
    url: '/Integral/IntegralOrder',
    method: 'put',
    data: data
  })
}

// 删除积分商品订单
export function delIntegralOrder(id) {
  return request({
    url: '/Integral/IntegralOrder/' + id,
    method: 'delete'
  })
}

// 导出积分商品订单
export function exportIntegralOrder(query) {
  return request({
    url: '/Integral/IntegralOrder/export',
    method: 'get',
    params: query
  })
}


export function verificationIntegralOrder(data) {
  return request({
    url: '/Integral/IntegralOrder/verification',
    method: 'put',
    data: data
  })
}