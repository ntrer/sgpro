import request from '@/utils/request'

// 查询线下活动列表
export function listActivityOffline(query) {
  return request({
    url: '/activityManage/activityOffline/list',
    method: 'get',
    params: query
  })
}

// 查询线下活动详细
export function getActivityOffline(id) {
  return request({
    url: '/activityManage/activityOffline/' + id,
    method: 'get'
  })
}

// 新增线下活动
export function addActivityOffline(data) {
  return request({
    url: '/activityManage/activityOffline',
    method: 'post',
    data: data
  })
}

// 修改线下活动
export function updateActivityOffline(data) {
  return request({
    url: '/activityManage/activityOffline',
    method: 'put',
    data: data
  })
}

// 删除线下活动
export function delActivityOffline(id) {
  return request({
    url: '/activityManage/activityOffline/' + id,
    method: 'delete'
  })
}

// 导出线下活动
export function exportActivityOffline(query) {
  return request({
    url: '/activityManage/activityOffline/export',
    method: 'get',
    params: query
  })
}