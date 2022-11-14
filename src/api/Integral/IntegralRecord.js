import request from '@/utils/request'

// 查询会员积分记录列表
export function listIntegralRecord(query) {
  return request({
    url: '/Integral/IntegralRecord/list',
    method: 'get',
    params: query
  })
}

// 查询会员积分记录详细
export function getIntegralRecord(id) {
  return request({
    url: '/Integral/IntegralRecord/' + id,
    method: 'get'
  })
}

// 新增会员积分记录
export function addIntegralRecord(data) {
  return request({
    url: '/Integral/IntegralRecord',
    method: 'post',
    data: data
  })
}

// 修改会员积分记录
export function updateIntegralRecord(data) {
  return request({
    url: '/Integral/IntegralRecord',
    method: 'put',
    data: data
  })
}

// 删除会员积分记录
export function delIntegralRecord(id) {
  return request({
    url: '/Integral/IntegralRecord/' + id,
    method: 'delete'
  })
}

// 导出会员积分记录
export function exportIntegralRecord(query) {
  return request({
    url: '/Integral/IntegralRecord/export',
    method: 'get',
    params: query
  })
}