import request from '@/utils/request'

// 查询带看活动列表
export function listteam(query) {
  return request({
    url: '/activityManage/team/list',
    method: 'get',
    params: query
  })
}

export function listbrands(query) {
  return request({
    url: '/activityManage/team/optional/brands',
    method: 'get',
    params: query
  })
}




export function addteam(data) {
  return request({
    url: '/activityManage/team',
    method: 'post',
    data: data
  })
}


export function updateteam(data) {
  return request({
    url: '/activityManage/team',
    method: 'put',
    data: data
  })
}


export function getteam(id) {
  return request({
    url: '/activityManage/team/' + id,
    method: 'get'
  })
}


export function delteam(id) {
  return request({
    url: '/activityManage/team/' + id,
    method: 'delete'
  })
}


export function getleader(query) {
  return request({
    url: '/activityManage/team/group/leader/view',
    method: 'get',
    params: query
  })
}

export function setleader(query) {
  return request({
    url: '/activityManage/team/set/group/leader',
    method: 'get',
    params: query
  })
}


export function getgroup(query) {
  return request({
    url: '/activityManage/team/group/list',
    method: 'get',
    params: query
  })
}



export function setgroup(query) {
  return request({
    url: '/activityManage/team/set/group',
    method: 'get',
    params: query
  })
}


export function getguideConfig(query) {
  return request({
    url: '/activityManage/team/guideConfig/view',
    method: 'get',
    params: query
  })
}


export function submitguideconfig(data) {
  return request({
    url: '/activityManage/team/guideconfig/submit',
    method: 'post',
    data: data
  })
}