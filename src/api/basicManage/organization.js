import request from '@/utils/request'

// 查询组织列表
export function listOrganization(query) {
  return request({
    url: '/basicManage/organization/list',
    method: 'get',
    params: query
  })
}

// 查询组织详细
export function getOrganization(id) {
  return request({
    url: '/basicManage/organization/' + id,
    method: 'get'
  })
}

// 新增组织
export function addOrganization(data) {
  return request({
    url: '/basicManage/organization',
    method: 'post',
    data: data
  })
}

// 修改组织
export function updateOrganization(data) {
  return request({
    url: '/basicManage/organization',
    method: 'put',
    data: data
  })
}

// 删除组织
export function delOrganization(id) {
  return request({
    url: '/basicManage/organization/' + id,
    method: 'delete'
  })
}

// 导出组织
export function exportOrganization(query) {
  return request({
    url: '/basicManage/organization/export',
    method: 'get',
    params: query
  })
}


export function listArea(query) {
  return request({
    url: '/basicManage/area/list',
    method: 'get',
    params: query
  })
}



export function listShopPayInfo(query) {
  return request({
    url: '/basicManage/organization/getShopPayInfo',
    method: 'get',
    params: query
  })
}

export function listAppPayInfoId(query) {
  return request({
    url: '/basicManage/organization/getAppPayInfo',
    method: 'get',
    params: query
  })
}



export function enableOrganization(data) {
  return request({
    url: '/basicManage/organization/enable',
    method: 'put',
    data: data
  })
}
