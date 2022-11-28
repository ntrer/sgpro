import request from '@/utils/request'

// 查询小程序推荐商品关联列表
export function listAppSeckillGoods(query) {
  return request({
    url: '/app/appSeckillGoods/getSeckillGoodsList',
    method: 'get',
    params: query
  })
}

// 查询小程序推荐商品关联详细
export function getAppSeckillGoods(id) {
  return request({
    url: '/app/appSeckillGoods/' + id,
    method: 'get'
  })
}

// 新增小程序推荐商品关联
export function addAppSeckillGoods(data) {
  return request({
    url: '/app/appSeckillGoods',
    method: 'post',
    data: data
  })
}

// 修改小程序推荐商品关联
export function updateAppSeckillGoods(data) {
  return request({
    url: '/app/appSeckillGoods',
    method: 'put',
    data: data
  })
}

// 删除小程序推荐商品关联
export function delAppSeckillGoods(id) {
  return request({
    url: '/app/appSeckillGoods/' + id,
    method: 'delete'
  })
}

// 导出小程序推荐商品关联
export function exportAppSeckillGoods(query) {
  return request({
    url: '/app/appSeckillGoods/export',
    method: 'get',
    params: query
  })
}


export function listclassification(query) {
  return request({
    url: '/app/classification/list',
    method: 'get',
    params: query
  })
}

// 查询商品列表
export function listGoods(query) {
  return request({
    url: '/dataManage/goods/list',
    method: 'get',
    params: query
  })
}

export function examineAppSeckillGoods(data) {
  return request({
    url: '/app/appSeckillGoods/examine',
    method: 'put',
    data: data
  })
}