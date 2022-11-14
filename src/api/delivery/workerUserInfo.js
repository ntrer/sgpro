import request from '@/utils/request'

// 查询工人信息列表
export function listWorkerUserInfo(query) {
  return request({
    url: '/delivery/workerUserInfo/list',
    method: 'get',
    params: query
  })
}

// 查询工人信息详细
export function getWorkerUserInfo(id) {
  return request({
    url: '/delivery/workerUserInfo/' + id,
    method: 'get'
  })
}

// 新增工人信息
export function addWorkerUserInfo(data) {
  return request({
    url: '/delivery/workerUserInfo',
    method: 'post',
    data: data
  })
}

// 修改工人信息
export function updateWorkerUserInfo(data) {
  return request({
    url: '/delivery/workerUserInfo',
    method: 'put',
    data: data
  })
}

// 删除工人信息
export function delWorkerUserInfo(id) {
  return request({
    url: '/delivery/workerUserInfo/' + id,
    method: 'delete'
  })
}

// 导出工人信息
export function exportWorkerUserInfo(query) {
  return request({
    url: '/delivery/workerUserInfo/export',
    method: 'get',
    params: query
  })
}

export function listOrganization(query) {
  return request({
    url: '/basicManage/organization/list',
    method: 'get',
    params: query
  })
}

export function enableworkerUserInfo(data) {
  return request({
    url: '/delivery/workerUserInfo/enable',
    method: 'put',
    data: data
  })
}

export function resetPwdworkerUserInfo(data) {
  return request({
    url: '/delivery/workerUserInfo/resetPwd',
    method: 'put',
    data: data
  })
}
