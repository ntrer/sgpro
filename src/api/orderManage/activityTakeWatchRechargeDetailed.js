import request from '@/utils/request'

// 查询带看充值明细列表
export function listActivityTakeWatchRechargeDetailed(query) {
  return request({
    url: '/orderManage/activityTakeWatchRechargeDetailed/list',
    method: 'get',
    params: query
  })
}

// 查询带看充值明细详细
export function getActivityTakeWatchRechargeDetailed(id) {
  return request({
    url: '/orderManage/activityTakeWatchRechargeDetailed/' + id,
    method: 'get'
  })
}

// 新增带看充值明细
export function addActivityTakeWatchRechargeDetailed(data) {
  return request({
    url: '/orderManage/activityTakeWatchRechargeDetailed',
    method: 'post',
    data: data
  })
}

// 修改带看充值明细
export function updateActivityTakeWatchRechargeDetailed(data) {
  return request({
    url: '/orderManage/activityTakeWatchRechargeDetailed',
    method: 'put',
    data: data
  })
}

// 删除带看充值明细
export function delActivityTakeWatchRechargeDetailed(id) {
  return request({
    url: '/orderManage/activityTakeWatchRechargeDetailed/' + id,
    method: 'delete'
  })
}

// 导出带看充值明细
export function exportActivityTakeWatchRechargeDetailed(query) {
  return request({
    url: '/orderManage/activityTakeWatchRechargeDetailed/export',
    method: 'get',
    params: query
  })
}