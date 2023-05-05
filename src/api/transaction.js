import request from '../axios/index'

/**
 * 交易員交易訂單列表
 */
export function traderListTransactions (params) {
  return request({
    url: `/transactions`,
    method: 'get',
    params: params
  })
}

/**
 * 取得該交易員歷史訂單
 */
export function traderHistoryTransactions (params) {
  return request({
    url: `/transactions/history`,
    method: 'get',
    params: params
  })
}

/**
 * 取得指定交易訂單
 * @param {String} id 訂單id
 */
export function traderGetTransaction (id) {
  return request({
    url: `/transactions/${id}`,
    method: 'get'
  })
}

/**
 * 接單
 * @param {String} id 訂單id
 */
export function traderTakeTransaction (id, data) {
  return request({
    url: `/transactions/${id}/take`,
    method: 'post',
    data: data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

/**
 * 取得該交易員當前處理訂單, id為空值時表示當前無處理中的訂單
 */
export function traderConductTransaction () {
  return request({
    url: `/transactions/conduct`,
    method: 'get'
  })
}

/**
 * 交易員完成訂單回報
 * @param {Stirng} id 訂單id
 */
export function traderReportTransaction (id, data) {
  return request({
    url: `/transactions/${id}/report`,
    method: 'post',
    data: data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
