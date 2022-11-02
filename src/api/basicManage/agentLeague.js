import request from '@/utils/request'

// 查询经销商联盟列表
export function listAgentLeague(query) {
  return request({
    url: '/basicManage/agentLeague/list',
    method: 'get',
    params: query
  })
}

// 查询经销商联盟详细
export function getAgentLeague(id) {
  return request({
    url: '/basicManage/agentLeague/' + id,
    method: 'get'
  })
}

// 新增经销商联盟
export function addAgentLeague(data) {
  return request({
    url: '/basicManage/agentLeague',
    method: 'post',
    data: data
  })
}

// 修改经销商联盟
export function updateAgentLeague(data) {
  return request({
    url: '/basicManage/agentLeague',
    method: 'put',
    data: data
  })
}

// 删除经销商联盟
export function delAgentLeague(id) {
  return request({
    url: '/basicManage/agentLeague/' + id,
    method: 'delete'
  })
}

// 导出经销商联盟
export function exportAgentLeague(query) {
  return request({
    url: '/basicManage/agentLeague/export',
    method: 'get',
    params: query
  })
}



export function listOrganization(query) {
  return request({
    url: '/basicManage/agentLeague/getOrganizationList',
    method: 'get',
    params: query
  })
}