import request from '@/utils/request'

// 查询省市区信息列表
export function listArea(query) {
  return request({
    url: '/basicManage/area/list',
    method: 'get',
    params: query
  })
}

// 查询省市区信息详细
export function getArea(id) {
  return request({
    url: '/basicManage/area/' + id,
    method: 'get'
  })
}

// 新增省市区信息
export function addArea(data) {
  return request({
    url: '/basicManage/area',
    method: 'post',
    data: data
  })
}

// 修改省市区信息
export function updateArea(data) {
  return request({
    url: '/basicManage/area',
    method: 'put',
    data: data
  })
}

// 删除省市区信息
export function delArea(id) {
  return request({
    url: '/basicManage/area/' + id,
    method: 'delete'
  })
}

// 导出省市区信息
export function exportArea(query) {
  return request({
    url: '/basicManage/area/export',
    method: 'get',
    params: query
  })
}