import request from '@/utils/request'

// 查询组织列表
export function listteam(query) {
  return request({
    url: '/basicManage/team/list',
    method: 'get',
    params: query
  })
}


// 查询组织详细
export function getteam(id) {
  return request({
    url: '/basicManage/team/' + id,
    method: 'get'
  })
}

// 新增组织
export function addteam(data) {
  return request({
    url: '/basicManage/team',
    method: 'post',
    data: data
  })
}

// 修改组织
export function updateteam(data) {
  return request({
    url: '/basicManage/team',
    method: 'put',
    data: data
  })
}

// 删除组织
export function delteam(id) {
  return request({
    url: '/basicManage/team/' + id,
    method: 'delete'
  })
}