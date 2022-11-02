import request from '@/utils/request'

// 查询直播邀约列表
export function listLiveInvitation(query) {
  return request({
    url: '/liveManage/liveInvitation/list',
    method: 'get',
    params: query
  })
}

// 查询直播邀约详细
export function getLiveInvitation(id) {
  return request({
    url: '/liveManage/liveInvitation/' + id,
    method: 'get'
  })
}

// 新增直播邀约
export function addLiveInvitation(data) {
  return request({
    url: '/liveManage/liveInvitation',
    method: 'post',
    data: data
  })
}

// 修改直播邀约
export function updateLiveInvitation(data) {
  return request({
    url: '/liveManage/liveInvitation',
    method: 'put',
    data: data
  })
}

// 删除直播邀约
export function delLiveInvitation(id) {
  return request({
    url: '/liveManage/liveInvitation/' + id,
    method: 'delete'
  })
}

// 导出直播邀约
export function exportLiveInvitation(query) {
  return request({
    url: '/liveManage/liveInvitation/export',
    method: 'get',
    params: query
  })
}