import request from '@/utils/request'

// 查询直播活动商品关联列表
export function listActivityLiveGoodsRelation(query) {
  return request({
    url: '/liveManage/activityLiveGoodsRelation/list',
    method: 'get',
    params: query
  })
}

// 查询直播活动商品关联详细
export function getActivityLiveGoodsRelation(id) {
  return request({
    url: '/liveManage/activityLiveGoodsRelation/' + id,
    method: 'get'
  })
}

// 新增直播活动商品关联
export function addActivityLiveGoodsRelation(data) {
  return request({
    url: '/liveManage/activityLiveGoodsRelation',
    method: 'post',
    data: data
  })
}

// 修改直播活动商品关联
export function updateActivityLiveGoodsRelation(data) {
  return request({
    url: '/liveManage/activityLiveGoodsRelation',
    method: 'put',
    data: data
  })
}

// 删除直播活动商品关联
export function delActivityLiveGoodsRelation(id) {
  return request({
    url: '/liveManage/activityLiveGoodsRelation/' + id,
    method: 'delete'
  })
}

// 导出直播活动商品关联
export function exportActivityLiveGoodsRelation(query) {
  return request({
    url: '/liveManage/activityLiveGoodsRelation/export',
    method: 'get',
    params: query
  })
}