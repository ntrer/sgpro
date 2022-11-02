import request from '@/utils/request'

// 查询素食节留言列表
export function listVegetarianboard(query) {
  return request({
    url: '/vegetarian/vegetarianboard/list',
    method: 'get',
    params: query
  })
}

// 查询素食节留言详细
export function getVegetarianboard(id) {
  return request({
    url: '/vegetarian/vegetarianboard/' + id,
    method: 'get'
  })
}

// 新增素食节留言
export function addVegetarianboard(data) {
  return request({
    url: '/vegetarian/vegetarianboard',
    method: 'post',
    data: data
  })
}

// 修改素食节留言
export function updateVegetarianboard(data) {
  return request({
    url: '/vegetarian/vegetarianboard',
    method: 'put',
    data: data
  })
}

// 删除素食节留言
export function delVegetarianboard(id) {
  return request({
    url: '/vegetarian/vegetarianboard/' + id,
    method: 'delete'
  })
}

// 导出素食节留言
export function exportVegetarianboard(query) {
  return request({
    url: '/vegetarian/vegetarianboard/export',
    method: 'get',
    params: query
  })
}