import request from '@/utils/request'

// 查询设计师列表
export function listDesigner(query) {
  return request({
    url: '/app/designer/list',
    method: 'get',
    params: query
  })
}

// 查询设计师详细
export function getDesigner(id) {
  return request({
    url: '/app/designer/' + id,
    method: 'get'
  })
}

// 新增设计师
export function addDesigner(data) {
  return request({
    url: '/app/designer',
    method: 'post',
    data: data
  })
}

// 修改设计师
export function updateDesigner(data) {
  return request({
    url: '/app/designer',
    method: 'put',
    data: data
  })
}

// 删除设计师
export function delDesigner(id) {
  return request({
    url: '/app/designer/' + id,
    method: 'delete'
  })
}

// 导出设计师
export function exportDesigner(query) {
  return request({
    url: '/app/designer/export',
    method: 'get',
    params: query
  })
}


// 获取组织列表
export function listOrganizationInfo(query) {
  return request({
    url: '/basicManage/organization/getOrganization',
    method: 'get',
    params: query
  })
}


export function listDesignerCase(query) {
  return request({
    url: '/app/DesignerCase/list',
    method: 'get',
    params: query
  })
}

export function getDesignerCase(id) {
  return request({
    url: '/app/DesignerCase/' + id,
    method: 'get'
  })
}


export function updateDesignerCase(data) {
  return request({
    url: '/app/DesignerCase',
    method: 'put',
    data: data
  })
}

export function addDesignerCase(data) {
  return request({
    url: '/app/DesignerCase',
    method: 'post',
    data: data
  })
}

export function delDesignerCase(id) {
  return request({
    url: '/app/DesignerCase/' + id,
    method: 'delete'
  })
}


export function enableDesignerCase(data) {
  return request({
    url: '/app/DesignerCase/enable',
    method: 'put',
    data: data
  })
}
