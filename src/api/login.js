import request from '../axios/index'

// 登入
export function userLogin (param) {
  return request({
    url: '/login',
    method: 'post',
    data: param
  })
}

//獲取用戶信息
export function getUserInfo () {
  return request({
    url: '/me',
    method: 'get'
  })
}

// 登出
export function userLogout () {
  return request({
    url: '/logout',
    method: 'post'
  })
}

//獲取通道對應表（取得所有支付通道資訊）
export function traderListPaymentChannels () {
  return request({
    url: '/payment_channels',
    method: 'get'
  })
}
