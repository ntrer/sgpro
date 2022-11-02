import request from '@/utils/request'

// 查询直播订单列表
export function listLiveGoodsOrder(query) {
  return request({
    url: '/orderManage/liveGoodsOrder/list',
    method: 'get',
    params: query
  })
}

// 查询直播订单详细
export function getLiveGoodsOrder(id) {
  return request({
    url: '/orderManage/liveGoodsOrder/' + id,
    method: 'get'
  })
}

// 新增直播订单
export function addLiveGoodsOrder(data) {
  return request({
    url: '/orderManage/liveGoodsOrder',
    method: 'post',
    data: data
  })
}

// 修改直播订单
export function updateLiveGoodsOrder(data) {
  return request({
    url: '/orderManage/liveGoodsOrder',
    method: 'put',
    data: data
  })
}

// 删除直播订单
export function delLiveGoodsOrder(id) {
  return request({
    url: '/orderManage/liveGoodsOrder/' + id,
    method: 'delete'
  })
}

// 导出直播订单
export function exportLiveGoodsOrder(query) {
  return request({
    url: '/orderManage/liveGoodsOrder/export',
    method: 'get',
    params: query
  })
}

export function verificationOrder(data) {
  return request({
    url: '/orderManage/liveGoodsOrder/verificationOrder',
    method: 'put',
    params: data
  })
}