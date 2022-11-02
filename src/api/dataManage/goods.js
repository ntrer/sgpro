import request from '@/utils/request'

// 查询商品列表
export function listGoods(query) {
  return request({
    url: '/dataManage/goods/list',
    method: 'get',
    params: query
  })
}

// 查询商品详细
export function getGoods(id) {
  return request({
    url: '/dataManage/goods/'+id,
    method: 'get',
  })
}

// 新增商品
export function addGoods(data) {
  return request({
    url: '/dataManage/goods',
    method: 'post',
    data: data
  })
}

// 修改商品
export function updateGoods(data) {
  return request({
    url: '/dataManage/goods',
    method: 'put',
    data: data
  })
}

// 删除商品
export function delGoods(id) {
  return request({
    url: '/dataManage/goods/' + id,
    method: 'delete'
  })
}

// 导出商品
export function exportGoods(query) {
  return request({
    url: '/dataManage/goods/export',
    method: 'get',
    params: query
  })
}

export function listBrand(query) {
  return request({
    url: '/dataManage/goods/brandList',
    method: 'get',
    params: query
  })
}
