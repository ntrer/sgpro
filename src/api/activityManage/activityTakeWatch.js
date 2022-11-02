import request from '@/utils/request'

// 查询带看活动列表
export function listActivityTakeWatch(query) {
  return request({
    url: '/activityManage/activityTakeWatch/list',
    method: 'get',
    params: query
  })
}

// 查询带看活动详细
export function getActivityTakeWatch(id) {
  return request({
    url: '/activityManage/activityTakeWatch/' + id,
    method: 'get'
  })
}

// 新增带看活动
export function addActivityTakeWatch(data) {
  return request({
    url: '/activityManage/activityTakeWatch',
    method: 'post',
    data: data
  })
}

// 修改带看活动
export function updateActivityTakeWatch(data) {
  return request({
    url: '/activityManage/activityTakeWatch',
    method: 'put',
    data: data
  })
}

// 删除带看活动
export function delActivityTakeWatch(id) {
  return request({
    url: '/activityManage/activityTakeWatch/' + id,
    method: 'delete'
  })
}

// 导出带看活动
export function exportActivityTakeWatch(query) {
  return request({
    url: '/activityManage/activityTakeWatch/export',
    method: 'get',
    params: query
  })
}