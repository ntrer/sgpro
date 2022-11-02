import request from '@/utils/request'

// 查询小程序轮播图列表
export function listCarouselImage(query) {
  return request({
    url: '/app/carouselImage/list',
    method: 'get',
    params: query
  })
}

// 查询小程序轮播图详细
export function getCarouselImage(id) {
  return request({
    url: '/app/carouselImage/' + id,
    method: 'get'
  })
}




export function getCarouselactivityList1() {
  return request({
    url: '/app/carouselImage/activityList',
    method: 'get'
  })
}

export function getCarouselactivityGoodsRelationList1() {
  return request({
    url: '/app/carouselImage/appSeckillGoodsList',
    method: 'get'
  })
}

export function getCarouselactivityList2(query) {
  return request({
    url: '/app/carouselImage/activityList/',
    method: 'get',
     params: query
  })
}

export function getCarouselactivityGoodsRelationList2(query) {
  return request({
    url: '/app/carouselImage/activityGoodsRelationList/',
    method: 'get',
     params: query
  })
}


export function listmainimg(query) {
  return request({
    url: '/basicManage/organization/seckill/mainimg/list ',
    method: 'get',
    params: query
  })
}


export function updatemainimg(data) {
  return request({
    url: '/basicManage/organization/seckill/mainimg/update',
    method: 'put',
    data: data
  })
}

export function updatemainimg2(data) {
  return request({
    url: '/basicManage/organization/seckill/out/mainimg/update',
    method: 'put',
    data: data
  })
}




// 新增小程序轮播图
export function addCarouselImage(data) {
  return request({
    url: '/app/carouselImage',
    method: 'post',
    data: data
  })
}

// 修改小程序轮播图
export function updateCarouselImage(data) {
  return request({
    url: '/app/carouselImage',
    method: 'put',
    data: data
  })
}

// 删除小程序轮播图
export function delCarouselImage(id) {
  return request({
    url: '/app/carouselImage/' + id,
    method: 'delete'
  })
}

// 导出小程序轮播图
export function exportCarouselImage(query) {
  return request({
    url: '/app/carouselImage/export',
    method: 'get',
    params: query
  })
}

// 获取组织列表
export function listOrganizationInfo(query) {
  return request({
    url: '/basicManage/organization/getOrganizationByid',
    method: 'get',
    params: query
  })
}



export function listillustration(query) {
  return request({
    url: '/app/carouselImage/adver/illustration',
    method: 'get',
    params: query
  })
}

export function submitadverImage(data) {
  return request({
    url: '/app/carouselImage/adver/submit',
    method: 'put',
    data: data
  })
}