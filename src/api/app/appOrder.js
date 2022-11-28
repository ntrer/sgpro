import request from '@/utils/request'

// 查询活动订单列表
export function listAppOrder(query) {
  return request({
    url: '/app/appOrder/list',
    method: 'get',
    params: query
  })
}



export function takegoods(data) {
  return request({
    url: '/app/appOrder/takegoods',
    method: 'put',
    data: data
  })
}


export function verificationAppOrder(data) {
  return request({
    url: '/app/appOrder/verification',
    method: 'put',
    data: data
  })
}
