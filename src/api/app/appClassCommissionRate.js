import request from '@/utils/request'


export function listAppClassCommissionRate(query) {
  return request({
    url: '/app/AppClassCommissionRate/list',
    method: 'get',
    params: query
  })
}


export function getAppClassCommissionRate(id) {
  return request({
    url: '/app/AppClassCommissionRate/' + id,
    method: 'get'
  })
}

// 新增客户领取优惠券
export function addAppClassCommissionRate(data) {
  return request({
    url: '/app/AppClassCommissionRate',
    method: 'post',
    data: data
  })
}

export function updateAppClassCommissionRate(data) {
  return request({
    url: '/app/AppClassCommissionRate',
    method: 'put',
    data: data
  })
}




export function listAppDistributorlist(query) {
  return request({
    url: '/app/AppDistributor/list',
    method: 'get',
    params: query
  })
}


export function getAppDistributor(id) {
  return request({
    url: '/app/AppDistributor/' + id,
    method: 'get'
  })
}

// 新增客户领取优惠券
export function addAppDistributor(data) {
  return request({
    url: '/app/AppDistributor',
    method: 'post',
    data: data
  })
}

export function updateAppDistributor(data) {
  return request({
    url: '/app/AppDistributor',
    method: 'put',
    data: data
  })
}


export function delAppDistributor(id) {
  return request({
    url: '/app/AppDistributor/' + id,
    method: 'delete'
  })
}


export function getauthUserQrCode(query) {
  return request({
    url: '/app/AppDistributor/authUserQrCode',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}


export function unbindAppDistributor(query) {
  return request({
    url: '/app/AppDistributor/unbind',
    method: 'get',
    params: query,
  })
}


export function listAppDistributorCommissionRecord(query) {
  return request({
    url: '/app/AppDistributorCommissionRecord/list',
    method: 'get',
    params: query
  })
}


export function listAppDistributorCommissionRecorddetails(query) {
  return request({
    url: '/app/AppDistributorCommissionRecord/details/list',
    method: 'get',
    params: query
  })
}