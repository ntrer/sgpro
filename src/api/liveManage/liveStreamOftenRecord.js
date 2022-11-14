import request from '@/utils/request'

// 查询直播推流时长记录列表
export function listLiveStreamOftenRecord(query) {
  return request({
    url: '/liveManage/liveStreamOftenRecord/list',
    method: 'get',
    params: query
  })
}

// 查询直播推流时长记录详细
export function getLiveStreamOftenRecord(id) {
  return request({
    url: '/liveManage/liveStreamOftenRecord/' + id,
    method: 'get'
  })
}

// 新增直播推流时长记录
export function addLiveStreamOftenRecord(data) {
  return request({
    url: '/liveManage/liveStreamOftenRecord',
    method: 'post',
    data: data
  })
}

// 修改直播推流时长记录
export function updateLiveStreamOftenRecord(data) {
  return request({
    url: '/liveManage/liveStreamOftenRecord',
    method: 'put',
    data: data
  })
}

// 删除直播推流时长记录
export function delLiveStreamOftenRecord(id) {
  return request({
    url: '/liveManage/liveStreamOftenRecord/' + id,
    method: 'delete'
  })
}

// 导出直播推流时长记录
export function exportLiveStreamOftenRecord(query) {
  return request({
    url: '/liveManage/liveStreamOftenRecord/export',
    method: 'get',
    params: query
  })
}