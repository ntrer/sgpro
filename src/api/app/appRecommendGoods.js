import request from '@/utils/request'

// 查询小程序推荐商品关联列表
export function listAppRecommendGoods(query) {
  return request({
    url: '/app/appRecommendGoods/getRecommandGoodsList',
    method: 'get',
    params: query
  })
}

// 查询小程序推荐商品关联详细
export function getAppRecommendGoods(id) {
  return request({
    url: '/app/appRecommendGoods/' + id,
    method: 'get'
  })
}

// 新增小程序推荐商品关联
export function addAppRecommendGoods(data) {
  return request({
    url: '/app/appRecommendGoods',
    method: 'put',
    data: data
  })
}

// 修改小程序推荐商品关联
export function updateAppRecommendGoods(data) {
  return request({
    url: '/app/appRecommendGoods',
    method: 'put',
    data: data
  })
}

// 删除小程序推荐商品关联
export function delAppRecommendGoods(id) {
  return request({
    url: '/app/appRecommendGoods/' + id,
    method: 'delete'
  })
}

// 导出小程序推荐商品关联
export function exportAppRecommendGoods(query) {
  return request({
    url: '/app/appRecommendGoods/export',
    method: 'get',
    params: query
  })
}

export function listAppSeckillGoods(query) {
  return request({
    url: '/app/appSeckillGoods/getSeckillGoodsList',
    method: 'get',
    params: query
  })
}

// 智能排序
export function editIsRecommand(organizationId,isBrainRecommand) {
  return request({
    url: '/app/appRecommendGoods/editIsRecommand/'+organizationId+"/"+isBrainRecommand,
    method: 'get'
  })
}
