import request from '@/utils/request'

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    method: 'get'
  })
}


// 订单笔数
export function getorder() {
  return request({
    url: '/home/dataStatistics/order',
    method: 'get'
  })
}

// 活动数据
export function getactivity() {
  return request({
    url: '/home/dataStatistics/activity',
    method: 'get'
  })
}

// 活动数据
export function getdouyin() {
  return request({
    url: '/home/dataStatistics/douyin',
    method: 'get'
  })
}


export function getnotice() {
  return request({
    url: '/home/chart/new/notice/list',
    method: 'get'
  })
}


export function getPricechart() {
  return request({
    url: '/home/chart/order/price/chart',
    method: 'get'
  })
}

export function getOrderchart() {
  return request({
    url: '/home/chart/order/num/chart',
    method: 'get'
  })
}


export function getBrowsechart() {
  return request({
    url: '/home/chart/activity/browse/chart',
    method: 'get'
  })
}


export function getForwardchart() {
  return request({
    url: '/home/chart/video/forward/chart',
    method: 'get'
  })
}


export function getOrganizationLogoAndName() {
  return request({
    url: '/home/chart/getOrganizationLogoAndName',
    method: 'get'
  })
}
