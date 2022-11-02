import request from '@/utils/request'

// 查询直播推送红包领取记录列表
export function listLivePushRedRecord(query) {
  return request({
    url: '/liveManage/livePushRedRecord/list',
    method: 'get',
    params: query
  })
}

// 查询直播推送红包领取记录详细
export function getLivePushRedRecord(id) {
  return request({
    url: '/liveManage/livePushRedRecord/' + id,
    method: 'get'
  })
}

// 新增直播推送红包领取记录
export function addLivePushRedRecord(data) {
  return request({
    url: '/liveManage/livePushRedRecord',
    method: 'post',
    data: data
  })
}

// 修改直播推送红包领取记录
export function updateLivePushRedRecord(data) {
  return request({
    url: '/liveManage/livePushRedRecord',
    method: 'put',
    data: data
  })
}

// 删除直播推送红包领取记录
export function delLivePushRedRecord(id) {
  return request({
    url: '/liveManage/livePushRedRecord/' + id,
    method: 'delete'
  })
}

// 导出直播推送红包领取记录
export function exportLivePushRedRecord(query) {
  return request({
    url: '/liveManage/livePushRedRecord/export',
    method: 'get',
    params: query
  })
}