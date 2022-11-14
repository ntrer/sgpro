import request from '@/utils/request'

// 查询秒杀商品助力记录列表
export function listGoodsHelpLog(query) {
  return request({
    url: '/dataManage/goodsHelpLog/list',
    method: 'get',
    params: query
  })
}

// 查询秒杀商品助力记录详细
export function getGoodsHelpLog(id) {
  return request({
    url: '/dataManage/goodsHelpLog/' + id,
    method: 'get'
  })
}

// 新增秒杀商品助力记录
export function addGoodsHelpLog(data) {
  return request({
    url: '/dataManage/goodsHelpLog',
    method: 'post',
    data: data
  })
}

// 修改秒杀商品助力记录
export function updateGoodsHelpLog(data) {
  return request({
    url: '/dataManage/goodsHelpLog',
    method: 'put',
    data: data
  })
}

// 删除秒杀商品助力记录
export function delGoodsHelpLog(id) {
  return request({
    url: '/dataManage/goodsHelpLog/' + id,
    method: 'delete'
  })
}

// 导出秒杀商品助力记录
export function exportGoodsHelpLog(query) {
  return request({
    url: '/dataManage/goodsHelpLog/export',
    method: 'get',
    params: query
  })
}