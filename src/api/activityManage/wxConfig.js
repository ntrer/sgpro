import request from '@/utils/request'

// 查询带看活动列表
export function listregion(query) {
  return request({
    url: '/activityManage/region/list',
    method: 'get',
    params: query
  })
}

export function addregion(data) {
  return request({
    url: '/activityManage/region',
    method: 'post',
    data: data
  })
}


export function updateregion(data) {
  return request({
    url: '/activityManage/region',
    method: 'put',
    data: data
  })
}


export function getregion(id) {
  return request({
    url: '/activityManage/region/' + id,
    method: 'get'
  })
}


export function delregion(id) {
  return request({
    url: '/activityManage/region/' + id,
    method: 'delete'
  })
}
