import request from '@/utils/request'

// 查询素食节授权信息列表
export function listVegetarianinfo(query) {
  return request({
    url: '/vegetarian/vegetarianinfo/list',
    method: 'get',
    params: query
  })
}

// 查询素食节授权信息详细
export function getVegetarianinfo(id) {
  return request({
    url: '/vegetarian/vegetarianinfo/' + id,
    method: 'get'
  })
}

// 新增素食节授权信息
export function addVegetarianinfo(data) {
  return request({
    url: '/vegetarian/vegetarianinfo',
    method: 'post',
    data: data
  })
}

// 修改素食节授权信息
export function updateVegetarianinfo(data) {
  return request({
    url: '/vegetarian/vegetarianinfo',
    method: 'put',
    data: data
  })
}

// 删除素食节授权信息
export function delVegetarianinfo(id) {
  return request({
    url: '/vegetarian/vegetarianinfo/' + id,
    method: 'delete'
  })
}

// 导出素食节授权信息
export function exportVegetarianinfo(query) {
  return request({
    url: '/vegetarian/vegetarianinfo/export',
    method: 'get',
    params: query
  })
}