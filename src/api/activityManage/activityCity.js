import request from '@/utils/request'

// 查询活动城市关联列表
export function listActivityCity(query) {
  return request({
    url: '/activityManage/activityCity/list',
    method: 'get',
    params: query
  })
}

// 查询活动城市关联详细
export function getActivityCity(id) {
  return request({
    url: '/activityManage/activityCity/' + id,
    method: 'get'
  })
}

// 新增活动城市关联
export function addActivityCity(data) {
  return request({
    url: '/activityManage/activityCity',
    method: 'post',
    data: data
  })
}

// 修改活动城市关联
export function updateActivityCity(data) {
  return request({
    url: '/activityManage/activityCity',
    method: 'put',
    data: data
  })
}

// 删除活动城市关联
export function delActivityCity(id) {
  return request({
    url: '/activityManage/activityCity/' + id,
    method: 'delete'
  })
}

// 导出活动城市关联
export function exportActivityCity(query) {
  return request({
    url: '/activityManage/activityCity/export',
    method: 'get',
    params: query
  })
}