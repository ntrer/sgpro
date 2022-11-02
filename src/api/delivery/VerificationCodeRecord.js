import request from '@/utils/request'

// 查询验证码日志列表
export function listVerificationCodeRecord(query) {
  return request({
    url: '/delivery/VerificationCodeRecord/list',
    method: 'get',
    params: query
  })
}

// 查询验证码日志详细
export function getVerificationCodeRecord(id) {
  return request({
    url: '/delivery/VerificationCodeRecord/' + id,
    method: 'get'
  })
}

// 新增验证码日志
export function addVerificationCodeRecord(data) {
  return request({
    url: '/delivery/VerificationCodeRecord',
    method: 'post',
    data: data
  })
}

// 修改验证码日志
export function updateVerificationCodeRecord(data) {
  return request({
    url: '/delivery/VerificationCodeRecord',
    method: 'put',
    data: data
  })
}

// 删除验证码日志
export function delVerificationCodeRecord(id) {
  return request({
    url: '/delivery/VerificationCodeRecord/' + id,
    method: 'delete'
  })
}

// 导出验证码日志
export function exportVerificationCodeRecord(query) {
  return request({
    url: '/delivery/VerificationCodeRecord/export',
    method: 'get',
    params: query
  })
}