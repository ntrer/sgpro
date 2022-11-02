import request from '@/utils/request'

// 查询客户领取优惠券列表
export function listmultipleRate(query) {
  return request({
    url: '/app/multipleRate/list',
    method: 'get',
    params: query
  })
}



export function listbrandClassificationList(query) {
  return request({
    url: '/basicManage/brandClassification/brandClassificationList',
    method: 'get',
    params: query
  })
}


// 查询客户领取优惠券详细
export function getmultipleRate(id) {
  return request({
    url: '/app/multipleRate/' + id,
    method: 'get'
  })
}

// 新增客户领取优惠券
export function addmultipleRate(data) {
  return request({
    url: '/app/multipleRate',
    method: 'post',
    data: data
  })
}

// 修改客户领取优惠券
export function updatemultipleRate(data) {
  return request({
    url: '/app/multipleRate',
    method: 'put',
    data: data
  })
}

// 删除客户领取优惠券
export function delmultipleRate(id) {
  return request({
    url: '/app/multipleRate/' + id,
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


export function setintegralcalculationmethod(data) {
  return request({
    url: '/app/multipleRate/set/org/integralcalculationmethod',
    method: 'put',
    data: data
  })
}

export function getintegralcalculationmethod(query) {
  return request({
    url: '/app/multipleRate/get/org/integralcalculationmethod',
    method: 'get',
    params: query
  })
}
