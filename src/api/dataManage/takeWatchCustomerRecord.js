import request from '@/utils/request'

// 查询带看客户记录列表
export function listTakeWatchCustomerRecord(query) {
  return request({
    url: '/dataManage/takeWatchCustomerRecord/list',
    method: 'get',
    params: query
  })
}

// 查询带看客户记录详细
export function getTakeWatchCustomerRecord(id) {
  return request({
    url: '/dataManage/takeWatchCustomerRecord/' + id,
    method: 'get'
  })
}

// 新增带看客户记录
export function addTakeWatchCustomerRecord(data) {
  return request({
    url: '/dataManage/takeWatchCustomerRecord',
    method: 'post',
    data: data
  })
}

// 修改带看客户记录
export function updateTakeWatchCustomerRecord(data) {
  return request({
    url: '/dataManage/takeWatchCustomerRecord',
    method: 'put',
    data: data
  })
}

// 删除带看客户记录
export function delTakeWatchCustomerRecord(id) {
  return request({
    url: '/dataManage/takeWatchCustomerRecord/' + id,
    method: 'delete'
  })
}

// 导出带看客户记录
export function exportTakeWatchCustomerRecord(query) {
  return request({
    url: '/dataManage/takeWatchCustomerRecord/export',
    method: 'get',
    params: query
  })
}


export function examineTakeWatchCustomerRecord(data) {
  return request({
    url: '/dataManage/takeWatchCustomerRecord/examine',
    method: 'put',
    data: data
  })
}