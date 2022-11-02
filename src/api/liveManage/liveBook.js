import request from '@/utils/request'

// 查询直播预约列表
export function listLiveBook(query) {
  return request({
    url: '/liveManage/liveBook/list',
    method: 'get',
    params: query
  })
}

// 查询直播预约详细
export function getLiveBook(id) {
  return request({
    url: '/liveManage/liveBook/' + id,
    method: 'get'
  })
}

// 新增直播预约
export function addLiveBook(data) {
  return request({
    url: '/liveManage/liveBook',
    method: 'post',
    data: data
  })
}

// 修改直播预约
export function updateLiveBook(data) {
  return request({
    url: '/liveManage/liveBook',
    method: 'put',
    data: data
  })
}

// 删除直播预约
export function delLiveBook(id) {
  return request({
    url: '/liveManage/liveBook/' + id,
    method: 'delete'
  })
}

// 导出直播预约
export function exportLiveBook(query) {
  return request({
    url: '/liveManage/liveBook/export',
    method: 'get',
    params: query
  })
}