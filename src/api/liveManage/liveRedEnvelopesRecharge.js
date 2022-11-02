import request from '@/utils/request'

// 查询直播红包充值记录列表
export function listLiveRedEnvelopesRecharge(query) {
  return request({
    url: '/liveManage/liveRedEnvelopesRecharge/list',
    method: 'get',
    params: query
  })
}

// 查询直播红包充值记录详细
export function getLiveRedEnvelopesRecharge(id) {
  return request({
    url: '/liveManage/liveRedEnvelopesRecharge/' + id,
    method: 'get'
  })
}

// 新增直播红包充值记录
export function addLiveRedEnvelopesRecharge(data) {
  return request({
    url: '/liveManage/liveRedEnvelopesRecharge',
    method: 'post',
    data: data
  })
}

// 修改直播红包充值记录
export function updateLiveRedEnvelopesRecharge(data) {
  return request({
    url: '/liveManage/liveRedEnvelopesRecharge',
    method: 'put',
    data: data
  })
}

// 删除直播红包充值记录
export function delLiveRedEnvelopesRecharge(id) {
  return request({
    url: '/liveManage/liveRedEnvelopesRecharge/' + id,
    method: 'delete'
  })
}

// 导出直播红包充值记录
export function exportLiveRedEnvelopesRecharge(query) {
  return request({
    url: '/liveManage/liveRedEnvelopesRecharge/export',
    method: 'get',
    params: query
  })
}



export function examineLiveRedEnvelopesRecharge(data) {
  return request({
    url: '/liveManage/liveRedEnvelopesRecharge/examine',
    method: 'put',
    data: data
  })
}
