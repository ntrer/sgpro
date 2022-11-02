import request from '@/utils/request'

// 查询直播用户信息列表
export function listLiveUserInfo(query) {
  return request({
    url: '/liveManage/liveUserInfo/list',
    method: 'get',
    params: query
  })
}

// 查询直播用户信息详细
export function getLiveUserInfo(id) {
  return request({
    url: '/liveManage/liveUserInfo/' + id,
    method: 'get'
  })
}

// 新增直播用户信息
export function addLiveUserInfo(data) {
  return request({
    url: '/liveManage/liveUserInfo',
    method: 'post',
    data: data
  })
}

// 修改直播用户信息
export function updateLiveUserInfo(data) {
  return request({
    url: '/liveManage/liveUserInfo',
    method: 'put',
    data: data
  })
}

// 删除直播用户信息
export function delLiveUserInfo(id) {
  return request({
    url: '/liveManage/liveUserInfo/' + id,
    method: 'delete'
  })
}

// 导出直播用户信息
export function exportLiveUserInfo(query) {
  return request({
    url: '/liveManage/liveUserInfo/export',
    method: 'get',
    params: query
  })
}

  
export function getListlist(query) {
  return request({
    url: '/liveManage/liveUserInfo/live/list',
    method: 'get',
    params: query
  })
}

export function enableliveUserInfo(data) {
  return request({
    url: '/liveManage/liveUserInfo/enable',
    method: 'put',
    data: data
  })
}

 
export function resetPwd(data) {
  return request({
    url: '/liveManage/liveUserInfo/resetPwd',
    method: 'put',
    data: data
  })
}