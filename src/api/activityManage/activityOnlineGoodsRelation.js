import request from '@/utils/request'

// 查询线上活动商品关联列表
export function listActivityOnlineGoodsRelation(query) {
  return request({
    url: '/activityManage/activityOnlineGoodsRelation/list',
    method: 'get',
    params: query
  })
}

// 查询线上活动商品关联详细
export function getActivityOnlineGoodsRelation(id) {
  return request({
    url: '/activityManage/activityOnlineGoodsRelation/' + id,
    method: 'get'
  })
}

// 新增线上活动商品关联
export function addActivityOnlineGoodsRelation(data) {
  return request({
    url: '/activityManage/activityOnlineGoodsRelation',
    method: 'post',
    data: data
  })
}

// 修改线上活动商品关联
export function updateActivityOnlineGoodsRelation(data) {
  return request({
    url: '/activityManage/activityOnlineGoodsRelation',
    method: 'put',
    data: data
  })
}

// 删除线上活动商品关联
export function delActivityOnlineGoodsRelation(id) {
  return request({
    url: '/activityManage/activityOnlineGoodsRelation/' + id,
    method: 'delete'
  })
}

// 导出线上活动商品关联
export function exportActivityOnlineGoodsRelation(query) {
  return request({
    url: '/activityManage/activityOnlineGoodsRelation/export',
    method: 'get',
    params: query
  })
}