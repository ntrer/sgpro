import request from '@/utils/request'

// 查询线下活动售卡列表
export function listActivityOfflineCard(query) {
  return request({
    url: '/activityManage/activityOfflineCard/list',
    method: 'get',
    params: query
  })
}

// 查询线下活动售卡详细
export function getActivityOfflineCard(id) {
  return request({
    url: '/activityManage/activityOfflineCard/' + id,
    method: 'get'
  })
}

// 新增线下活动售卡
export function addActivityOfflineCard(data) {
  return request({
    url: '/activityManage/activityOfflineCard',
    method: 'post',
    data: data
  })
}

// 修改线下活动售卡
export function updateActivityOfflineCard(data) {
  return request({
    url: '/activityManage/activityOfflineCard',
    method: 'put',
    data: data
  })
}

// 删除线下活动售卡
export function delActivityOfflineCard(id) {
  return request({
    url: '/activityManage/activityOfflineCard/' + id,
    method: 'delete'
  })
}

// 导出线下活动售卡
export function exportActivityOfflineCard(query) {
  return request({
    url: '/activityManage/activityOfflineCard/export',
    method: 'get',
    params: query
  })
}