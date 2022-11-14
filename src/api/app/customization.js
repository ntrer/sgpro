import request from '@/utils/request'

// 查询客户领取优惠券列表
export function listCustomization(query) {
  return request({
    url: 'customizationManage/customization/list',
    method: 'get',
    params: query
  })
}
