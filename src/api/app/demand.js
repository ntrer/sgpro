import request from '@/utils/request'

// 查询装修需求列表
export function listDemand(query) {
  return request({
    url: '/app/demand/list',
    method: 'get',
    params: query
  })
}

// 查询装修需求详细
export function getDemand(id) {
  return request({
    url: '/app/demand/' + id,
    method: 'get'
  })
}

// 新增装修需求
export function addDemand(data) {
  return request({
    url: '/app/demand',
    method: 'post',
    data: data
  })
}

// 修改装修需求
export function updateDemand(data) {
  return request({
    url: '/app/demand',
    method: 'put',
    data: data
  })
}

// 删除装修需求
export function delDemand(id) {
  return request({
    url: '/app/demand/' + id,
    method: 'delete'
  })
}

// 导出装修需求
export function exportDemand(query) {
  return request({
    url: '/app/demand/export',
    method: 'get',
    params: query
  })
}