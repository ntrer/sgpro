import request from '@/utils/request'

// 查询直播邀约人员观看时长列表
export function listLiveInvitationWatchTimes(query) {
  return request({
    url: '/liveManage/liveInvitationWatchTimes/list',
    method: 'get',
    params: query
  })
}

// 查询直播邀约人员观看时长详细
export function getLiveInvitationWatchTimes(id) {
  return request({
    url: '/liveManage/liveInvitationWatchTimes/' + id,
    method: 'get'
  })
}

// 新增直播邀约人员观看时长
export function addLiveInvitationWatchTimes(data) {
  return request({
    url: '/liveManage/liveInvitationWatchTimes',
    method: 'post',
    data: data
  })
}

// 修改直播邀约人员观看时长
export function updateLiveInvitationWatchTimes(data) {
  return request({
    url: '/liveManage/liveInvitationWatchTimes',
    method: 'put',
    data: data
  })
}

// 删除直播邀约人员观看时长
export function delLiveInvitationWatchTimes(id) {
  return request({
    url: '/liveManage/liveInvitationWatchTimes/' + id,
    method: 'delete'
  })
}

// 导出直播邀约人员观看时长
export function exportLiveInvitationWatchTimes(query) {
  return request({
    url: '/liveManage/liveInvitationWatchTimes/export',
    method: 'get',
    params: query
  })
}