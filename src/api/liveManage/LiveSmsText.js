import request from '@/utils/request'

// 查询直播聊天列表
export function listLiveSmsText(query) {
  return request({
    url: '/liveManage/LiveSmsText/list',
    method: 'get',
    params: query
  })
}

// 查询直播聊天详细
export function getLiveSmsText(id) {
  return request({
    url: '/liveManage/LiveSmsText/' + id,
    method: 'get'
  })
}

// 新增直播聊天
export function addLiveSmsText(data) {
  return request({
    url: '/liveManage/LiveSmsText',
    method: 'post',
    data: data
  })
}

// 修改直播聊天
export function updateLiveSmsText(data) {
  return request({
    url: '/liveManage/LiveSmsText',
    method: 'put',
    data: data
  })
}

// 删除直播聊天
export function delLiveSmsText(id) {
  return request({
    url: '/liveManage/LiveSmsText/' + id,
    method: 'delete'
  })
}

// 导出直播聊天
export function exportLiveSmsText(query) {
  return request({
    url: '/liveManage/LiveSmsText/export',
    method: 'get',
    params: query
  })
}