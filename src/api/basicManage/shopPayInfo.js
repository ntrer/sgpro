import request from '@/utils/request'

// 查询微信商户信息列表
export function listShopPayInfo(query) {
  return request({
    url: '/basicManage/shopPayInfo/list',
    method: 'get',
    params: query
  })
}


export function listappPayInfo(query) {
  return request({
    url: '/basicManage/appPayInfo/list',
    method: 'get',
    params: query
  })
}

// 查询微信商户信息详细
export function getShopPayInfo(id) {
  return request({
    url: '/basicManage/shopPayInfo/' + id,
    method: 'get'
  })
}

// 新增微信商户信息
export function addShopPayInfo(data) {
  return request({
    url: '/basicManage/shopPayInfo',
    method: 'post',
    data: data
  })
}

// 修改微信商户信息
export function updateShopPayInfo(data) {
  return request({
    url: '/basicManage/shopPayInfo',
    method: 'put',
    data: data
  })
}

// 删除微信商户信息
export function delShopPayInfo(id) {
  return request({
    url: '/basicManage/shopPayInfo/' + id,
    method: 'delete'
  })
}

// 导出微信商户信息
export function exportShopPayInfo(query) {
  return request({
    url: '/basicManage/shopPayInfo/export',
    method: 'get',
    params: query
  })
}