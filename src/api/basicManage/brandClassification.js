import request from '@/utils/request'

// 查询品牌分类列表
export function listBrandClassification(query) {
  return request({
    url: '/basicManage/brandClassification/list',
    method: 'get',
    params: query
  })
}

// 查询品牌分类详细
export function getBrandClassification(id) {
  return request({
    url: '/basicManage/brandClassification/' + id,
    method: 'get'
  })
}

// 新增品牌分类
export function addBrandClassification(data) {
  return request({
    url: '/basicManage/brandClassification',
    method: 'post',
    data: data
  })
}

// 修改品牌分类
export function updateBrandClassification(data) {
  return request({
    url: '/basicManage/brandClassification',
    method: 'put',
    data: data
  })
}

// 删除品牌分类
export function delBrandClassification(id) {
  return request({
    url: '/basicManage/brandClassification/' + id,
    method: 'delete'
  })
}

// 导出品牌分类
export function exportBrandClassification(query) {
  return request({
    url: '/basicManage/brandClassification/export',
    method: 'get',
    params: query
  })
}