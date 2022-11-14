import request from '@/utils/request'

// 查询品牌列表
export function listBrand(query) {
  return request({
    url: '/basicManage/brand/list',
    method: 'get',
    params: query
  })
}

// 查询品牌详细
export function getBrand(id) {
  return request({
    url: '/basicManage/brand/' + id,
    method: 'get'
  })
}

// 新增品牌
export function addBrand(data) {
  return request({
    url: '/basicManage/brand',
    method: 'post',
    data: data
  })
}

// 修改品牌
export function updateBrand(data) {
  return request({
    url: '/basicManage/brand',
    method: 'put',
    data: data
  })
}

// 删除品牌
export function delBrand(id) {
  return request({
    url: '/basicManage/brand/' + id,
    method: 'delete'
  })
}

// 导出品牌
export function exportBrand(query) {
  return request({
    url: '/basicManage/brand/export',
    method: 'get',
    params: query
  })
}


export function getOrganization(query) {
  return request({
    url: '/basicManage/organization/getOrganization',
    method: 'get',
    params: query
  })
}



export function brandClassificationList(query) {
  return request({
    url: '/basicManage/brandClassification/brandClassificationList',
    method: 'get',
    params: query
  })
}



export function enableBrand(data) {
  return request({
    url: '/basicManage/brand/enable',
    method: 'put',
    data: data
  })
}


export function updateVideo(data) {
  return request({
    url: '/basicManage/brand/set/brand/video',
    method: 'get',
    params: data
  })
}

export function getCode(data) {
  return request({
    url: '/basicManage/brand/douyinQrCode',
    method: 'get',
    params: data,
    responseType: 'blob'
  })
}
