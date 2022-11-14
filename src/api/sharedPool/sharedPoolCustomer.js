import request from '@/utils/request'

// 查询共享池客户列表
export function listSharedPoolCustomer(query) {
  return request({
    url: '/sharedPool/sharedPoolCustomer/list',
    method: 'get',
    params: query
  })
}

// 查询共享池客户详细
export function getSharedPoolCustomer(id) {
  return request({
    url: '/sharedPool/sharedPoolCustomer/' + id,
    method: 'get'
  })
}

// 新增共享池客户
export function addSharedPoolCustomer(data) {
  return request({
    url: '/sharedPool/sharedPoolCustomer',
    method: 'post',
    data: data
  })
}

// 修改共享池客户
export function updateSharedPoolCustomer(data) {
  return request({
    url: '/sharedPool/sharedPoolCustomer',
    method: 'put',
    data: data
  })
}

// 删除共享池客户
export function delSharedPoolCustomer(id) {
  return request({
    url: '/sharedPool/sharedPoolCustomer/' + id,
    method: 'delete'
  })
}

// 导出共享池客户
export function exportSharedPoolCustomer(query) {
  return request({
    url: '/sharedPool/sharedPoolCustomer/export',
    method: 'get',
    params: query
  })
}