import request from '@/utils/request'

// 查询带看活动列表
export function listregioninvite(query) {
  return request({
    url: '/activityManage/team/region/invite/list',
    method: 'get',
    params: query
  })
}


export function listteaminvite(query) {
  return request({
    url: '/activityManage/team/team/invite/list',
    method: 'get',
    params: query
  })
}


export function listregion(query) {
  return request({
    url: '/activityManage/region/list',
    method: 'get',
    params: query
  })
}



export function listbrand(query) {
  return request({
    url: '/activityManage/team/brand/invite/list',
    method: 'get',
    params: query
  })
}


export function listteam(query) {
  return request({
    url: '/activityManage/team/list',
    method: 'get',
    params: query
  })
}


export function lisbrands(query) {
  return request({
    url: '/activityManage/team/team/brands/list',
    method: 'get',
    params: query
  })
}



 export function lisuser(query) {
   return request({
     url: '/activityManage/team/user/invite/list',
     method: 'get',
     params: query
   })
 }


 export function listguide(query) {
   return request({
     url: '/activityManage/team/guide/list',
     method: 'get',
     params: query
   })
 }




export function addregion(data) {
  return request({
    url: '/activityManage/region',
    method: 'post',
    data: data
  })
}


export function updateregion(data) {
  return request({
    url: '/activityManage/region',
    method: 'put',
    data: data
  })
}


export function getregion(id) {
  return request({
    url: '/activityManage/region/' + id,
    method: 'get'
  })
}


export function delregion(id) {
  return request({
    url: '/activityManage/region/' + id,
    method: 'delete'
  })
}
