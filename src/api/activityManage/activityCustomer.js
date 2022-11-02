import request from '@/utils/request'

// 查询活动客户列表
export function listActivityCustomer(query) {
  return request({
    url: '/activityManage/activityCustomer/list',
    method: 'get',
    params: query
  })
}

// 查询活动客户详细
export function getActivityCustomer(id) {
  return request({
    url: '/activityManage/activityCustomer/' + id,
    method: 'get'
  })
}

// 新增活动客户
export function addActivityCustomer(data) {
  return request({
    url: '/activityManage/activityCustomer',
    method: 'post',
    data: data
  })
}

// 修改活动客户
export function updateActivityCustomer(data) {
  return request({
    url: '/activityManage/activityCustomer',
    method: 'put',
    data: data
  })
}

// 删除活动客户
export function delActivityCustomer(id) {
  return request({
    url: '/activityManage/activityCustomer/' + id,
    method: 'delete'
  })
}

// 导出活动客户
export function exportActivityCustomer(query) {
  return request({
    url: '/activityManage/activityCustomer/export',
    method: 'get',
    params: query
  })
}