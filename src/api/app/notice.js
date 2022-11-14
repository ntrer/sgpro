import request from '@/utils/request'

// 查询小程序轮播图列表
export function listnotice(query) {
  return request({
    url: '/app/notice/list',
    method: 'get',
    params: query
  })
}



export function listSeckillGoods(query) {
  return request({
    url: '/app/notice/getSeckillGoodsList',
    method: 'get',
    params: query
  })
}

export function listonline(query) {
  return request({
    url: '/app/notice/online/list',
    method: 'get',
    params: query
  })
}


export function listcustomer(query) {
  return request({
    url: '/app/notice/customer/list',
    method: 'get',
    params: query
  })
}


export function addnotice(data) {
  return request({
    url: '/app/notice',
    method: 'post',
    data: data
  })
}

// 删除活动
export function delNotice(id) {
  return request({
    url: '/app/notice/' + id,
    method: 'delete'
  })
}


// 启用停用
export function enableNotice(data) {
  return request({
    url: '/app/notice/enable',
    method: 'put',
    data: data
  })
}