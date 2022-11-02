import request from '@/utils/request'

// 查询线上活动售卡列表
export function listActivityOnlineCard(query) {
  return request({
    url: '/activityManage/activityOnlineCard/list',
    method: 'get',
    params: query
  })
}

// 查询线上活动售卡详细
export function getActivityOnlineCard(id) {
  return request({
    url: '/activityManage/activityOnlineCard/' + id,
    method: 'get'
  })
}

// 新增线上活动售卡
export function addActivityOnlineCard(data) {
  return request({
    url: '/activityManage/activityOnlineCard',
    method: 'post',
    data: data
  })
}

// 修改线上活动售卡
export function updateActivityOnlineCard(data) {
  return request({
    url: '/activityManage/activityOnlineCard',
    method: 'put',
    data: data
  })
}

// 删除线上活动售卡
export function delActivityOnlineCard(id) {
  return request({
    url: '/activityManage/activityOnlineCard/' + id,
    method: 'delete'
  })
}

// 导出线上活动售卡
export function exportActivityOnlineCard(query) {
  return request({
    url: '/activityManage/activityOnlineCard/export',
    method: 'get',
    params: query
  })
}

export function SumPayPriceOnlineCard(query) {
  return request({
    url: '/activityManage/activityOnlineCard/SumPayPrice',
    method: 'get',
    params: query
  })
}