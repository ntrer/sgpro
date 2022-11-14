import request from '@/utils/request'

// 查询线上活动列表
export function listActivityOnline(query) {
  return request({
    url: '/activityManage/activityOnline/list',
    method: 'get',
    params: query
  })
}

// 查询线上活动详细
export function getActivityOnline(id) {
  return request({
    url: '/activityManage/activityOnline/' + id,
    method: 'get'
  })
}

// 新增线上活动
export function addActivityOnline(data) {
  return request({
    url: '/activityManage/activityOnline',
    method: 'post',
    data: data
  })
}

// 修改线上活动
export function updateActivityOnline(data) {
  return request({
    url: '/activityManage/activityOnline',
    method: 'put',
    data: data
  })
}

// 删除线上活动
export function delActivityOnline(id) {
  return request({
    url: '/activityManage/activityOnline/' + id,
    method: 'delete'
  })
}

// 导出线上活动
export function exportActivityOnline(query) {
  return request({
    url: '/activityManage/activityOnline/export',
    method: 'get',
    params: query
  })
}