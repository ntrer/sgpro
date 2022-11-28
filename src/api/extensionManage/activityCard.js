import request from '@/utils/request'

// 查询客户领取优惠券列表
export function listActivityCard(query) {
  return request({
    url: '/extensionManage/ActivityCard/list',
    method: 'get',
    params: query
  })
}


export function listactivityEnroll(query) {
  return request({
    url: '/extensionManage/activityEnroll/list',
    method: 'get',
    params: query
  })
}


export function listinputMember(query) {
  return request({
    url: '/extensionManage/inputMember/list',
    method: 'get',
    params: query
  })
}


export function listactivityAuthInfo(query) {
  return request({
    url: '/activityManage/activityAuthInfo/list',
    method: 'get',
    params: query
  })
}

export function listappCustomer(query) {
  return request({
    url: '/app/appCustomer/list',
    method: 'get',
    params: query
  })
}

export function listactivityRechargeRecord(query) {
  return request({
    url: '/orderManage/activityRechargeRecord/list',
    method: 'get',
    params: query
  })
}


export function listfissionRewardRecord(query) {
  return request({
    url: '/accountManage/fissionRewardRecord/list',
    method: 'get',
    params: query
  })
}

export function listmemberBalanceWithdraw(query) {
  return request({
    url: '/accountManage/memberBalanceWithdraw/list1',
    method: 'get',
    params: query
  })
}

export function listmemberBalanceWithdrawRecord(query) {
  return request({
    url: '/accountManage/memberBalanceWithdraw/list2',
    method: 'get',
    params: query
  })
}


export function listcommissionRecord(query) {
  return request({
    url: '/accountManage/commissionRecord/list',
    method: 'get',
    params: query
  })
}

export function listorder(query) {
  return request({
    url: '/orderManage/order/list',
    method: 'get',
    params: query
  })
}


export function listprizeOrder(query) {
  return request({
    url: '/orderManage/prizeOrder/list',
    method: 'get',
    params: query
  })
}

export function listcouponOrder(query) {
  return request({
    url: '/extensionManage/couponOrder/list',
    method: 'get',
    params: query
  })
}
