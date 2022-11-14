import request from '@/utils/request'

// 查询客户领取优惠券列表
export function listclassRoom(query) {
  return request({
    url: '/app/classRoom/list',
    method: 'get',
    params: query
  })
}

// 查询客户领取优惠券详细
export function getAppCoupon(id) {
  return request({
    url: '/app/classRoom/' + id,
    method: 'get'
  })
}

// 新增客户领取优惠券
export function addclassRoom(data) {
  return request({
    url: '/app/classRoom',
    method: 'post',
    data: data
  })
}

// 修改客户领取优惠券
export function updateAppCoupon(data) {
  return request({
    url: '/app/classRoom',
    method: 'put',
    data: data
  })
}

// 删除客户领取优惠券
export function delAppCoupon(id) {
  return request({
    url: '/app/classRoom/' + id,
    method: 'delete'
  })
}
