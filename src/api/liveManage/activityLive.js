import request from '@/utils/request'

// 查询活动直播列表
export function listActivityLive(query) {
  return request({
    url: '/liveManage/activityLive/list',
    method: 'get',
    params: query
  })
}

// 查询活动直播详细
export function getActivityLive(id) {
  return request({
    url: '/liveManage/activityLive/' + id,
    method: 'get'
  })
}

// 新增活动直播
export function addActivityLive(data) {
  return request({
    url: '/liveManage/activityLive',
    method: 'post',
    data: data
  })
}

// 修改活动直播
export function updateActivityLive(data) {
  return request({
    url: '/liveManage/activityLive',
    method: 'put',
    data: data
  })
}

// 删除活动直播
export function delActivityLive(id) {
  return request({
    url: '/liveManage/activityLive/' + id,
    method: 'delete'
  })
}

// 导出活动直播
export function exportActivityLive(query) {
  return request({
    url: '/liveManage/activityLive/export',
    method: 'get',
    params: query
  })
}