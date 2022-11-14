import request from '@/utils/request'

// 查询红包领取记录列表
export function listRedEnvelopesRecord(query) {
  return request({
    url: '/dataManage/redEnvelopesRecord/list',
    method: 'get',
    params: query
  })
}

// 查询红包领取记录详细
export function getRedEnvelopesRecord(id) {
  return request({
    url: '/dataManage/redEnvelopesRecord/' + id,
    method: 'get'
  })
}

// 新增红包领取记录
export function addRedEnvelopesRecord(data) {
  return request({
    url: '/dataManage/redEnvelopesRecord',
    method: 'post',
    data: data
  })
}

// 修改红包领取记录
export function updateRedEnvelopesRecord(data) {
  return request({
    url: '/dataManage/redEnvelopesRecord',
    method: 'put',
    data: data
  })
}

// 删除红包领取记录
export function delRedEnvelopesRecord(id) {
  return request({
    url: '/dataManage/redEnvelopesRecord/' + id,
    method: 'delete'
  })
}

// 导出红包领取记录
export function exportRedEnvelopesRecord(query) {
  return request({
    url: '/dataManage/redEnvelopesRecord/export',
    method: 'get',
    params: query
  })
}