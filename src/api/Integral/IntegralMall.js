import request from '@/utils/request'

// 查询积分商品列表
export function listIntegralMall(query) {
  return request({
    url: '/Integral/IntegralMall/list',
    method: 'get',
    params: query
  })
}

// 查询积分商品详细
export function getIntegralMall(id) {
  return request({
    url: '/Integral/IntegralMall/' + id,
    method: 'get'
  })
}

// 新增积分商品
export function addIntegralMall(data) {
  return request({
    url: '/Integral/IntegralMall',
    method: 'post',
    data: data
  })
}

// 修改积分商品
export function updateIntegralMall(data) {
  return request({
    url: '/Integral/IntegralMall',
    method: 'put',
    data: data
  })
}

// 删除积分商品
export function delIntegralMall(id) {
  return request({
    url: '/Integral/IntegralMall/' + id,
    method: 'delete'
  })
}

// 导出积分商品
export function exportIntegralMall(query) {
  return request({
    url: '/Integral/IntegralMall/export',
    method: 'get',
    params: query
  })
}

export function updateIntegralMallenable(data) {
  return request({
    url: '/Integral/IntegralMall/enable',
    method: 'put',
    data: data
  })
}