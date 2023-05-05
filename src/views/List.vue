<template>
    <div>
        <a-button @click="Init()" style="margin-bottom: 10px;">
            Refresh
            <template #icon>
                <ReloadOutlined />
            </template>
        </a-button>
        <a-spin :spinning="data.spinning">
            <a-card v-if="Object.keys(data.handling).length > 0" class="card" title="當前訂單">
                <a-card size="small" hoverable
                    :title="data.handling.type === 1 ? '入款' : data.handling.type === 2 ? '出款' : ''"
                    @click="onClickCardHandling(data.handling)">
                    <a-card-meta>
                        <template #title>
                            金額：{{ data.handling.amount }}
                        </template>
                        <template #description>
                            到期：{{ moment(data.handling.expire_at).format('YYYY-MM-DD HH:mm:ss') }}<br>
                            <!-- 通道：{{ filter1(data.handling) }} -->
                        </template>
                    </a-card-meta>
                </a-card>
            </a-card>
            <a-card v-else class="card" title="列表">
                <a-list :grid="{ gutter: 10, xs: 1, sm: 1, md: 3, lg: 3, xl: 3, xxl: 3, xxxl: 3 }" :data-source="data.list">
                    <template #renderItem="{ item }">
                        <a-list-item>
                            <a-card size="small" hoverable :title="item.type === 1 ? '入款' : item.type === 2 ? '出款' : ''"
                                @click="onClickCard(item)">
                                <a-card-meta>
                                    <template #title>
                                        金額：{{ item.amount }}
                                    </template>
                                    <template #description>
                                        到期：{{ moment(item.expire_at).format('YYYY-MM-DD HH:mm:ss') }}<br>
                                        通道：{{ filter1(item) }}
                                    </template>
                                </a-card-meta>
                            </a-card>
                        </a-list-item>
                    </template>
                </a-list>
            </a-card>
        </a-spin>
        <a-modal v-model:visible="data.modalVisible" title="訂單訊息" :maskClosable="false" :keyboard="false" :closable="false"
            @ok="onSave" @cancel="onCancel" cancelText="取消" okText="接收訂單" width="90%" style="max-width: 400px;">
            <a-spin :spinning="data.modalSpinning">
                <a-row>
                    <a-space direction="vertical" :size="8">
                        <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                            訂單編號：{{ data.editForm.merchant_order_no }}
                        </a-col>
                        <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                            出單時間：{{ moment(data.editForm.create_at).format('YYYY-MM-DD HH:mm:ss') }}
                        </a-col>
                        <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                            到期時間：{{ moment(data.editForm.expire_at).format('YYYY-MM-DD HH:mm:ss') }}
                        </a-col>
                        <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                            交易金額：{{ data.editForm.amount }}
                        </a-col>
                        <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                            銀行名稱：{{ data.transactionpayment.bank_name }}
                        </a-col>
                        <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                            分行名稱：{{ data.transactionpayment.bank_branch }}
                        </a-col>
                        <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                            持有人名稱：{{ data.transactionpayment.account_name }}
                        </a-col>
                        <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                            帳戶：{{ data.transactionpayment.account_number }}
                        </a-col>
                        <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                            交易銀行卡：<a-select v-model:value="data.takeForm.payment" style="width: 180px">
                                <a-select-option v-for="( item, index ) in  data.paymentlist " :key="index"
                                    :value="item.id">{{
                                        item.account_name }}-{{ item.bank_name }}</a-select-option>
                            </a-select>
                        </a-col>
                    </a-space>
                </a-row>
            </a-spin>
        </a-modal>
        <a-modal v-model:visible="data.modalhandingVisible" title="交易結果" :maskClosable="false" :keyboard="false"
            :closable="false" @ok="onReport()" @cancel="onCancel" cancelText="取消" okText="確認" width="90%"
            style="max-width: 400px;">
            <a-spin :spinning="data.modalSpinning">
                <a-form ref="resultFormRef" name="resultForm" :model="data.resultForm" layout="horizontal"
                    :wrapper-col="{ span: 12 }">
                    <a-row>
                        <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                            <a-form-item name="is_success">
                                <a-radio-group v-model:value="data.resultForm.is_success">
                                    <a-radio :value="1">成功</a-radio>
                                    <a-radio :value="2">失敗</a-radio>
                                </a-radio-group>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                            <a-form-item label="備註" name="comment">
                                <a-textarea v-model:value="data.resultForm.comment" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </a-spin>
        </a-modal>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { reactive, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { ReloadOutlined } from '@ant-design/icons-vue';
import { useUserStore } from '../store/user'
import { ErrorResponse, ReportErrorResponse, TakeErrorResponse } from '../utils/errorResponse';
import moment from 'moment'

import { traderListTransactions, traderGetTransaction, traderTakeTransaction, traderConductTransaction, traderReportTransaction } from '../api/transaction'
import { traderListPayments } from '../api/payment'

const router = useRouter()
const userStore = useUserStore()

onMounted(async () => {
    await Init()
})

const data = reactive({
    editForm: {},
    transactionpayment: {},
    handling: {},
    resultForm: {
        is_success: 1
    },
    takeForm: {
        id: '',
        payment: '',
    },
    list: [],
    paymentlist: [],
    spinning: false,
    modalSpinning: false,
    modalVisible: false,
    modalhandingVisible: false
})

const filter1 = (item) => {
    if (userStore.payment_channel) {
        return userStore.payment_channel.filter(x => x.id === item.payment_channel_id)[0].name
    } else {
        return ''
    }
}

/**
 * 初始化
 * 如果此交易員已經有正在處理的單子就不會獲取列表
 */
const Init = async () => {
    await getHandling()
    if (Object.keys(data.handling).length === 0) {
        getList()
    }
}

/**
 * 接單
 */
const onSave = async () => {
    try {
        var urlencoded = new URLSearchParams();
        urlencoded.append("payment_id", data.takeForm.payment);
        const res = await traderTakeTransaction(data.takeForm.id, urlencoded)
        // console.log(res)
        data.modalVisible = false
        getHandling()
    } catch (error) {
        TakeErrorResponse(error)
    }
}

/**
 * 回報
 * 接單後要回報
 */
const onReport = async () => {
    try {
        var formdata = new FormData();
        formdata.append("is_success", data.resultForm.is_success);
        formdata.append("comment", data.resultForm.comment);
        const res = await traderReportTransaction(data.takeForm.id, formdata)
        // console.log('traderReportTransaction', res)

        data.modalhandingVisible = false
        Init()
    } catch (error) {
        ReportErrorResponse(error)
    }
}

const onCancel = () => {
    // message.info('onCancel')
}

const onClickCard = async (item) => {
    // console.log(item)

    data.modalSpinning = true
    data.modalVisible = true
    try {
        let param = {
            // channel_id: item.payment_channel_id,
            channel_id: 1, //20230502 交易員只能使用銀行卡交易
            //TODO:確認此處要帶的參數
            is_withdraw: 2//是否為收益提款卡, 1: 是, 非1正數: 否, 負數: 兩種狀態 
        }

        //交易員可使用的通道
        const res = await traderListPayments(param)
        data.paymentlist = res.data.data.response

        //此單的詳細資訊（帶出玩家的銀行資訊）
        const res2 = await traderGetTransaction(item.id)
        data.transactionpayment = res2.data.data.transaction_payment
        // console.log(res2.data.data.transaction_payment)

        data.takeForm.id = item.id

        data.editForm = item
    } catch (error) {
        ErrorResponse(error)
    } finally {
        data.modalSpinning = false
    }
}

const onClickCardHandling = (item) => {
    // console.log('onClickCardHandling', item)
    data.takeForm.id = item.id
    data.modalhandingVisible = true
}

/**
 * 獲取此交易員正在處理的單子
 */
const getHandling = async () => {
    data.spinning = true
    try {
        const res = await traderConductTransaction()
        // console.log(res)
        if (res.data.data.response) {
            data.handling = res.data.data.response
        } else {
            data.handling = {}
        }
    } catch (error) {
        ErrorResponse(error)
    } finally {
        data.spinning = false
    }
}

/**
 * 列表
 */
const getList = async () => {
    data.spinning = true
    let param = {
        number: 20,
        type: 1,
        before_id: ''
    }
    try {
        const res = await traderListTransactions(param)
        data.list = res.data.data.response
    } catch (error) {
        ErrorResponse(error)
    } finally {
        data.spinning = false
    }
}

</script>

<style lang="scss" scoped></style>