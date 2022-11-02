import request from '@/utils/request'

// 查询直播浏览记录列表
export function listLiveBrowse(query) {
  return request({
    url: '/liveManage/liveBrowse/list',
    method: 'get',
    params: query
  })
}

// 查询直播浏览记录详细
export function getLiveBrowse(id) {
  return request({
    url: '/liveManage/liveBrowse/' + id,
    method: 'get'
  })
}

// 新增直播浏览记录
export function addLiveBrowse(data) {
  return request({
    url: '/liveManage/liveBrowse',
    method: 'post',
    data: data
  })
}

// 修改直播浏览记录
export function updateLiveBrowse(data) {
  return request({
    url: '/liveManage/liveBrowse',
    method: 'put',
    data: data
  })
}

// 删除直播浏览记录
export function delLiveBrowse(id) {
  return request({
    url: '/liveManage/liveBrowse/' + id,
    method: 'delete'
  })
}

// 导出直播浏览记录
export function exportLiveBrowse(query) {
  return request({
    url: '/liveManage/liveBrowse/export',
    method: 'get',
    params: query
  })
}