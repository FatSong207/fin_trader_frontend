import request from '../axios/index'

/**
 * 交易帳戶列表
 */
export function traderListPayments (params) {
  return request({
    url: `/payments`,
    method: 'get',
    params: params
  })
}

/**
 * 新增支付工具
 */
export function traderCreatePayment (data) {
  return request({
    url: `/payments`,
    method: 'post',
    data: data
  })
}

export function traderDeletePayment (id) {
  return request({
    url: `/payments/${id}`,
    method: 'delete'
  })
}
