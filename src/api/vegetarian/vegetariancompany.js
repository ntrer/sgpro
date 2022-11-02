import request from '@/utils/request'

// 查询素食节单位列表
export function listVegetariancompany(query) {
  return request({
    url: '/vegetarian/vegetariancompany/list',
    method: 'get',
    params: query
  })
}

// 查询素食节单位详细
export function getVegetariancompany(id) {
  return request({
    url: '/vegetarian/vegetariancompany/' + id,
    method: 'get'
  })
}

// 新增素食节单位
export function addVegetariancompany(data) {
  return request({
    url: '/vegetarian/vegetariancompany',
    method: 'post',
    data: data
  })
}

// 修改素食节单位
export function updateVegetariancompany(data) {
  return request({
    url: '/vegetarian/vegetariancompany',
    method: 'put',
    data: data
  })
}

// 删除素食节单位
export function delVegetariancompany(id) {
  return request({
    url: '/vegetarian/vegetariancompany/' + id,
    method: 'delete'
  })
}

// 导出素食节单位
export function exportVegetariancompany(query) {
  return request({
    url: '/vegetarian/vegetariancompany/export',
    method: 'get',
    params: query
  })
}


export function listArea(query) {
  return request({
    url: '/vegetarian/vegetariancompany/getAreaList',
    method: 'get',
    params: query
  })
}
