import request from '@/utils/request'

// 查询线上售卡提成记录列表
export function listOnlineCardCommissionRecord(query) {
  return request({
    url: '/dataManage/onlineCardCommissionRecord/list',
    method: 'get',
    params: query
  })
}

// 查询线上售卡提成记录详细
export function getOnlineCardCommissionRecord(id) {
  return request({
    url: '/dataManage/onlineCardCommissionRecord/' + id,
    method: 'get'
  })
}

// 新增线上售卡提成记录
export function addOnlineCardCommissionRecord(data) {
  return request({
    url: '/dataManage/onlineCardCommissionRecord',
    method: 'post',
    data: data
  })
}

// 修改线上售卡提成记录
export function updateOnlineCardCommissionRecord(data) {
  return request({
    url: '/dataManage/onlineCardCommissionRecord',
    method: 'put',
    data: data
  })
}

// 删除线上售卡提成记录
export function delOnlineCardCommissionRecord(id) {
  return request({
    url: '/dataManage/onlineCardCommissionRecord/' + id,
    method: 'delete'
  })
}

// 导出线上售卡提成记录
export function exportOnlineCardCommissionRecord(query) {
  return request({
    url: '/dataManage/onlineCardCommissionRecord/export',
    method: 'get',
    params: query
  })
}