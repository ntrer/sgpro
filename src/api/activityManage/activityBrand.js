import request from '@/utils/request'

// 查询活动品牌关联列表
export function listActivityBrand(query) {
  return request({
    url: '/activityManage/activityBrand/list',
    method: 'get',
    params: query
  })
}

// 查询活动品牌关联详细
export function getActivityBrand(id) {
  return request({
    url: '/activityManage/activityBrand/' + id,
    method: 'get'
  })
}

// 新增活动品牌关联
export function addActivityBrand(data) {
  return request({
    url: '/activityManage/activityBrand',
    method: 'post',
    data: data
  })
}

// 修改活动品牌关联
export function updateActivityBrand(data) {
  return request({
    url: '/activityManage/activityBrand',
    method: 'put',
    data: data
  })
}

// 删除活动品牌关联
export function delActivityBrand(id) {
  return request({
    url: '/activityManage/activityBrand/' + id,
    method: 'delete'
  })
}

// 导出活动品牌关联
export function exportActivityBrand(query) {
  return request({
    url: '/activityManage/activityBrand/export',
    method: 'get',
    params: query
  })
}