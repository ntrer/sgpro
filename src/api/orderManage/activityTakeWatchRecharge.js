import request from '@/utils/request'

// 查询带看充值记录列表
export function listActivityTakeWatchRecharge(query) {
  return request({
    url: '/orderManage/activityTakeWatchRecharge/list',
    method: 'get',
    params: query
  })
}

// 查询带看充值记录详细
export function getActivityTakeWatchRecharge(id) {
  return request({
    url: '/orderManage/activityTakeWatchRecharge/' + id,
    method: 'get'
  })
}

// 新增带看充值记录
export function addActivityTakeWatchRecharge(data) {
  return request({
    url: '/orderManage/activityTakeWatchRecharge',
    method: 'post',
    data: data
  })
}

// 修改带看充值记录
export function updateActivityTakeWatchRecharge(data) {
  return request({
    url: '/orderManage/activityTakeWatchRecharge',
    method: 'put',
    data: data
  })
}

// 删除带看充值记录
export function delActivityTakeWatchRecharge(id) {
  return request({
    url: '/orderManage/activityTakeWatchRecharge/' + id,
    method: 'delete'
  })
}

// 导出带看充值记录
export function exportActivityTakeWatchRecharge(query) {
  return request({
    url: '/orderManage/activityTakeWatchRecharge/export',
    method: 'get',
    params: query
  })
}


export function examineActivityTakeWatchRecharge(data) {
  return request({
    url: '/orderManage/activityTakeWatchRecharge/examine',
    method: 'put',
    data: data
  })
}