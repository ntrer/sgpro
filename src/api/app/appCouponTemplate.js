import request from '@/utils/request'

// 查询优惠券模板列表
export function listAppCouponTemplate(query) {
  return request({
    url: '/app/appCouponTemplate/list',
    method: 'get',
    params: query
  })
}

// 查询优惠券模板详细
export function getAppCouponTemplate(id) {
  return request({
    url: '/app/appCouponTemplate/' + id,
    method: 'get'
  })
}

// 新增优惠券模板
export function addAppCouponTemplate(data) {
  return request({
    url: '/app/appCouponTemplate',
    method: 'post',
    data: data
  })
}

// 修改优惠券模板
export function updateAppCouponTemplate(data) {
  return request({
    url: '/app/appCouponTemplate',
    method: 'put',
    data: data
  })
}

// 删除优惠券模板
export function delAppCouponTemplate(id) {
  return request({
    url: '/app/appCouponTemplate/' + id,
    method: 'delete'
  })
}

// 导出优惠券模板
export function exportAppCouponTemplate(query) {
  return request({
    url: '/app/appCouponTemplate/export',
    method: 'get',
    params: query
  })
}


// 审核优惠券模板
export function examineAppCouponTemplate(data) {
  return request({
    url: '/app/appCouponTemplate/examine',
    method: 'put',
    data: data
  })
}