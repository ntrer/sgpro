import request from '@/utils/request'

// 查询客户总列表
export function listSysCustomer(query) {
  return request({
    url: '/customerManage/customer/list',
    method: 'get',
    params: query
  })
}

// 查询客户总详细
export function getSysCustomer(id) {
  return request({
    url: '/basicManage/sysCustomer/' + id,
    method: 'get'
  })
}

// 新增客户总
export function addSysCustomer(data) {
  return request({
    url: '/basicManage/sysCustomer',
    method: 'post',
    data: data
  })
}

// 修改客户总
export function updateSysCustomer(data) {
  return request({
    url: '/basicManage/sysCustomer',
    method: 'put',
    data: data
  })
}

// 删除客户总
export function delSysCustomer(id) {
  return request({
    url: '/customerManage/customer/' + id,
    method: 'delete'
  })
}

// 导出客户总
export function exportSysCustomer(query) {
  return request({
    url: '/basicManage/sysCustomer/export',
    method: 'get',
    params: query
  })
}
