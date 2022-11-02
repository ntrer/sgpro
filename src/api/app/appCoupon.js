import request from '@/utils/request'

// 查询客户领取优惠券列表
export function listAppCoupon(query) {
  return request({
    url: '/app/appCoupon/list',
    method: 'get',
    params: query
  })
}

// 查询客户领取优惠券详细
export function getAppCoupon(id) {
  return request({
    url: '/app/appCoupon/' + id,
    method: 'get'
  })
}

// 新增客户领取优惠券
export function addAppCoupon(data) {
  return request({
    url: '/app/appCoupon',
    method: 'post',
    data: data
  })
}

// 修改客户领取优惠券
export function updateAppCoupon(data) {
  return request({
    url: '/app/appCoupon',
    method: 'put',
    data: data
  })
}

// 删除客户领取优惠券
export function delAppCoupon(id) {
  return request({
    url: '/app/appCoupon/' + id,
    method: 'delete'
  })
}

// 导出客户领取优惠券
export function exportAppCoupon(query) {
  return request({
    url: '/app/appCoupon/export',
    method: 'get',
    params: query
  })
}


export function verificationAppCoupon(data) {
  return request({
    url: '/app/appCoupon/verification',
    method: 'put',
    data: data
  })
}