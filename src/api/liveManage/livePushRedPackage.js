import request from '@/utils/request'

// 查询直播推送红包列表
export function listLivePushRedPackage(query) {
  return request({
    url: '/liveManage/livePushRedPackage/list',
    method: 'get',
    params: query
  })
}

// 查询直播推送红包详细
export function getLivePushRedPackage(id) {
  return request({
    url: '/liveManage/livePushRedPackage/' + id,
    method: 'get'
  })
}

// 新增直播推送红包
export function addLivePushRedPackage(data) {
  return request({
    url: '/liveManage/livePushRedPackage',
    method: 'post',
    data: data
  })
}

// 修改直播推送红包
export function updateLivePushRedPackage(data) {
  return request({
    url: '/liveManage/livePushRedPackage',
    method: 'put',
    data: data
  })
}

// 删除直播推送红包
export function delLivePushRedPackage(id) {
  return request({
    url: '/liveManage/livePushRedPackage/' + id,
    method: 'delete'
  })
}

// 导出直播推送红包
export function exportLivePushRedPackage(query) {
  return request({
    url: '/liveManage/livePushRedPackage/export',
    method: 'get',
    params: query
  })
}