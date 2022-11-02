import request from '@/utils/request'

export function listcollege(query) {
  return request({
    url: '/system/college/list',
    method: 'get',
    params: query
  })
}


export function getcollege(id) {
  return request({
    url: '/system/college/' + id,
    method: 'get'
  })
}



export function addcollege(data) {
  return request({
    url: '/system/college',
    method: 'post',
    data: data
  })
}


export function delcollege(id) {
  return request({
    url: '/system/college/' + id,
    method: 'delete'
  })
}

export function updatecollege(data) {
  return request({
    url: '/system/college',
    method: 'put',
    data: data
  })
}