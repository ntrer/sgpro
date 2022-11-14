import request from '@/utils/request'

// 查询活动红包充值记录列表
export function listActivityRedEnvelopesRecharge(query) {
  return request({
    url: '/orderManage/activityRedEnvelopesRecharge/list',
    method: 'get',
    params: query
  })
}

// 查询活动红包充值记录详细
export function getActivityRedEnvelopesRecharge(id) {
  return request({
    url: '/orderManage/activityRedEnvelopesRecharge/' + id,
    method: 'get'
  })
}

// 新增活动红包充值记录
export function addActivityRedEnvelopesRecharge(data) {
  return request({
    url: '/orderManage/activityRedEnvelopesRecharge',
    method: 'post',
    data: data
  })
}

// 修改活动红包充值记录
export function updateActivityRedEnvelopesRecharge(data) {
  return request({
    url: '/orderManage/activityRedEnvelopesRecharge',
    method: 'put',
    data: data
  })
}

// 删除活动红包充值记录
export function delActivityRedEnvelopesRecharge(id) {
  return request({
    url: '/orderManage/activityRedEnvelopesRecharge/' + id,
    method: 'delete'
  })
}

// 导出活动红包充值记录
export function exportActivityRedEnvelopesRecharge(query) {
  return request({
    url: '/orderManage/activityRedEnvelopesRecharge/export',
    method: 'get',
    params: query
  })
}


export function examineRedEnvelopesRecharge(data) {
  return request({
    url: '/orderManage/activityRedEnvelopesRecharge/examine',
    method: 'put',
    data: data
  })
}