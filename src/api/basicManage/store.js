import request from '@/utils/request'

// 查询组织列表
export function liststore(query) {
  return request({
    url: '/basicManage/store/list',
    method: 'get',
    params: query
  })
}


// 查询组织详细
export function getstore(id) {
  return request({
    url: '/basicManage/store/' + id,
    method: 'get'
  })
}

// 新增组织
export function addstore(data) {
  return request({
    url: '/basicManage/store',
    method: 'post',
    data: data
  })
}

// 修改组织
export function updatestore(data) {
  return request({
    url: '/basicManage/store',
    method: 'put',
    data: data
  })
}

// 删除组织
export function delstore(id) {
  return request({
    url: '/basicManage/store/' + id,
    method: 'delete'
  })
}