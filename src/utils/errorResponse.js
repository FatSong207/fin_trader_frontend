import { message } from 'ant-design-vue'

/**
 * 通用 errorResponse
 */
export function ErrorResponse (error) {
  switch (error.response.data.data.error_code) {
    case 'api.data_invalid.username':
      message.error('帳號錯誤')
      break
    case 'api.data_invalid.password':
      message.error('密碼錯誤')
      break
    case 'api.not_found':
      message.error('未找到訂單')
      break
    case 'api.unauthorized':
      message.error('無法辨識使用者')
      break
    case 'api.forbidden':
      message.error('帳號狀態已關閉')
      break
    case 'api.db_unknown':
      message.error('db錯誤')
      break
    case 'api.unknown':
      message.error('伺服器錯誤')
      break
    default:
      message.error(error)
      break
  }
}

/**
 * 回報 errorResponse
 */
export function ReportErrorResponse (error) {
  switch (error.response.data.data.error_code) {
    case 'api.data_invalid.expire':
      message.error('訂單已過期')
      break
    case 'api.data_invalid.is_success':
      message.error('入款訂單僅有成功狀態')
      break
    case 'api.data_invalid.comment':
      message.error('訂單備註錯誤')
      break
    case 'api.data_invalid.payment_id':
      message.error('銀行卡未找到或非該使用者綁定')
      break
    case 'api.data_invalid.status':
      message.error('當前訂單狀態無法回報')
      break
    case 'api.data_invalid.report':
      message.error('無訂單驗證圖片')
      break
    case 'api.not_found':
      message.error('未找到訂單')
      break
    case 'api.unauthorized':
      message.error('無法辨識使用者')
      break
    case 'api.forbidden':
      message.error('帳號狀態已關閉')
      break
    case 'api.db_unknown':
      message.error('db錯誤')
      break
    case 'api.unknown':
      message.error('伺服器錯誤')
      break
    default:
      message.error(error)
      break
  }
}

/**
 * 接單 errorResponse
 */
export function TakeErrorResponse (error) {
  switch (error.response.data.data.error_code) {
    case 'api.bad_request':
      message.error('訂單狀態錯誤')
      break
    case 'api.data_invalid.expire':
      message.error('訂單已過期')
      break
    case 'api.data_invalid.income':
      message.error('提領收益額度不足')
      break
    case 'api.data_invalid.quota':
      message.error('交易員信用額度不足')
      break
    case 'api.data_invalid.payment_id':
      message.error('交易工具錯誤')
      break
    case 'api.data_existent':
      message.error('身上已有處理中訂單, 無法接取其他訂單')
      break
    case 'api.data_existent.taked':
      message.error('訂單已被其他交易員接走')
      break
    case 'api.not_found':
      message.error('未找到訂單')
      break
    case 'api.unauthorized':
      message.error('無法辨識使用者')
      break
    case 'api.forbidden':
      message.error('帳號狀態已關閉')
      break
    case 'api.db_unknown':
      message.error('db錯誤')
      break
    case 'api.unknown':
      message.error('伺服器錯誤')
      break
    default:
      message.error(error)
      break
  }
}

/**
 * 新增交易工具 errorResponse
 */
export function CreatePaymentErrorResponse (error) {
  switch (error.response.data.data.error_code) {
    case 'api.data_invalid':
      message.error('request body錯誤')
      break
    case 'api.data_invalid.is_withdraw':
      message.error('是否為收益提款卡錯誤')
      break
    case 'api.data_invalid.channel_id':
      message.error('交易通道錯誤')
      break
    case 'api.data_invalid.bank_name':
      message.error('銀行名稱錯誤')
      break
    case 'api.data_invalid.bank_branch':
      message.error('分行名稱錯誤')
      break
    case 'api.data_invalid.account_name':
      message.error('持有者名稱/戶名錯誤')
      break
    case 'api.data_invalid.account_number':
      message.error('帳號錯誤')
      break
    case 'api.data_existent':
      message.error('該交易工具已存在')
      break
    case 'api.unauthorized':
      message.error('無法辨識使用者')
      break
    case 'api.forbidden':
      message.error('帳號狀態已關閉')
      break
    case 'api.db_unknown':
      message.error('db錯誤')
      break
    case 'api.unknown':
      message.error('伺服器錯誤')
      break
    default:
      message.error(error)
      break
  }
}

/**
 * 刪除交易工具 errorResponse
 */
export function DeletePaymentErrorResponse (error) {
  switch (error.response.data.data.error_code) {
    case 'api.data_invalid':
      message.error('request body錯誤')
      break
    case 'api.not_found':
      message.error('未找到交易工具')
      break
      message.error('該交易工具已存在')
      break
    case 'api.unauthorized':
      message.error('無法辨識使用者')
      break
    case 'api.forbidden':
      message.error('帳號狀態已關閉')
      break
    case 'api.db_unknown':
      message.error('db錯誤')
      break
    case 'api.unknown':
      message.error('伺服器錯誤')
      break
    default:
      message.error(error)
      break
  }
}
