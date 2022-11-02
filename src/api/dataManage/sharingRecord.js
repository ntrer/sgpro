import request from '@/utils/request'

// 查询分享记录列表
export function listSharingRecord(query) {
  return request({
    url: '/dataManage/sharingRecord/list',
    method: 'get',
    params: query
  })
}

// 查询分享记录详细
export function getSharingRecord(id) {
  return request({
    url: '/dataManage/sharingRecord/' + id,
    method: 'get'
  })
}

// 新增分享记录
export function addSharingRecord(data) {
  return request({
    url: '/dataManage/sharingRecord',
    method: 'post',
    data: data
  })
}

// 修改分享记录
export function updateSharingRecord(data) {
  return request({
    url: '/dataManage/sharingRecord',
    method: 'put',
    data: data
  })
}

// 删除分享记录
export function delSharingRecord(id) {
  return request({
    url: '/dataManage/sharingRecord/' + id,
    method: 'delete'
  })
}

// 导出分享记录
export function exportSharingRecord(query) {
  return request({
    url: '/dataManage/sharingRecord/export',
    method: 'get',
    params: query
  })
}