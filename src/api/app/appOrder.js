import request from '@/utils/request'

// 查询活动订单列表
export function listAppOrder(query) {
  return request({
    url: '/app/appOrder/list',
    method: 'get',
    params: query
  })
}

// 查询活动订单详细
export function getAppOrder(id) {
  return request({
    url: '/app/appOrder/' + id,
    method: 'get'
  })
}

// 新增活动订单
export function addAppOrder(data) {
  return request({
    url: '/app/appOrder',
    method: 'post',
    data: data
  })
}

// 修改活动订单
export function updateAppOrder(data) {
  return request({
    url: '/app/appOrder',
    method: 'put',
    data: data
  })
}



export function takegoods(data) {
  return request({
    url: '/app/appOrder/takegoods',
    method: 'put',
    data: data
  })
}




// 删除活动订单
export function delAppOrder(id) {
  return request({
    url: '/app/appOrder/' + id,
    method: 'delete'
  })
}

// 导出活动订单
export function exportAppOrder(query) {
  return request({
    url: '/app/appOrder/export',
    method: 'get',
    params: query
  })
}