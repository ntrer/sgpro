import request from '@/utils/request'

// 查询小程序信息列表
export function listAppPayInfo(query) {
  return request({
    url: '/app/appPayInfo/list',
    method: 'get',
    params: query
  })
}

// 查询小程序信息详细
export function getAppPayInfo(id) {
  return request({
    url: '/app/appPayInfo/' + id,
    method: 'get'
  })
}

// 新增小程序信息
export function addAppPayInfo(data) {
  return request({
    url: '/app/appPayInfo',
    method: 'post',
    data: data
  })
}

// 修改小程序信息
export function updateAppPayInfo(data) {
  return request({
    url: '/app/appPayInfo',
    method: 'put',
    data: data
  })
}

// 删除小程序信息
export function delAppPayInfo(id) {
  return request({
    url: '/app/appPayInfo/' + id,
    method: 'delete'
  })
}

// 导出小程序信息
export function exportAppPayInfo(query) {
  return request({
    url: '/app/appPayInfo/export',
    method: 'get',
    params: query
  })
}