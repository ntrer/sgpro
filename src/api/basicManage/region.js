import request from '@/utils/request'

// 查询组织列表
export function listregion(query) {
  return request({
    url: '/basicManage/region/list',
    method: 'get',
    params: query
  })
}



// 查询组织详细
export function getregion(id) {
  return request({
    url: '/basicManage/region/' + id,
    method: 'get'
  })
}

// 新增组织
export function addregion(data) {
  return request({
    url: '/basicManage/region',
    method: 'post',
    data: data
  })
}

// 修改组织
export function updateregion(data) {
  return request({
    url: '/basicManage/region',
    method: 'put',
    data: data
  })
}

// 删除组织
export function delregion(id) {
  return request({
    url: '/basicManage/region/' + id,
    method: 'delete'
  })
}
