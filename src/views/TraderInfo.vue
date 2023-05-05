<template>
    <div>
        <a-spin :spinning="data.spinning">
            <a-card class="card" :title="'交易員：' + data.infoForm.username">
                <a-tabs v-model:activeKey="data.tabKey">
                    <template #leftExtra>
                        <!-- <a-button class="tabs-extra-demo-button">Left Extra Action</a-button> -->
                    </template>
                    <template #rightExtra>
                        <a @click="onOpenCards()">銀行卡</a> |
                        <a @click="data.modalPaymentVisible = true">新增支付</a>
                        <!-- <a-button>Right Extra Action</a-button> -->
                    </template>
                    <a-tab-pane key="1">
                        <template #tab>
                            <span>
                                <UserOutlined v-if="data.tabKey === '1'" />個人訊息
                            </span>
                        </template>
                        <a-descriptions bordered size="small" :labelStyle="{ width: '120px' }"
                            :column="{ xxl: 4, xl: 4, lg: 3, md: 3, sm: 1, xs: 1 }">
                            <!-- <a-descriptions-item label="姓名">{{ data.infoForm.username }}</a-descriptions-item> -->
                            <a-descriptions-item label="可提領">{{ data.infoForm.current_income }}</a-descriptions-item>
                            <a-descriptions-item label="當月收入">{{ data.infoForm.month_income }}</a-descriptions-item>
                            <a-descriptions-item label="可接單額度">{{ data.infoForm.quota }}</a-descriptions-item>
                        </a-descriptions>
                        <br>
                        <a-descriptions bordered size="small" :labelStyle="{ width: '120px' }"
                            :column="{ xxl: 4, xl: 4, lg: 3, md: 3, sm: 1, xs: 1 }">
                            <a-descriptions-item label="出款總額">{{ data.transaction_report.withdraw_total_amount
                            }}</a-descriptions-item>
                            <a-descriptions-item label="出款單數">{{ data.transaction_report.withdraw_count
                            }}</a-descriptions-item>
                            <a-descriptions-item label="入款總額">{{ data.transaction_report.deposit_total_amount
                            }}</a-descriptions-item>
                            <a-descriptions-item label="入款單數">{{ data.transaction_report.deposit_count
                            }}</a-descriptions-item>
                        </a-descriptions>
                    </a-tab-pane>
                    <a-tab-pane key="2">
                        <template #tab>
                            <span>
                                <HistoryOutlined v-if="data.tabKey === '2'" />歷史訂單
                            </span>
                        </template>
                        <a-card>
                            <a-row>
                                <a-space direction="vertical" :size="8">
                                    <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                                        狀態：<a-radio-group v-model:value="data.searchform.status">
                                            <a-radio :value="5">成功</a-radio>
                                            <a-radio :value="6">失敗</a-radio>
                                            <a-radio :value="0">全部</a-radio>
                                        </a-radio-group>
                                    </a-col>
                                    <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                                        筆數：<a-select v-model:value="data.searchform.number" style="width: 70px">
                                            <a-select-option :value="10">10</a-select-option>
                                            <a-select-option :value="20">20</a-select-option>
                                            <a-select-option :value="30">30</a-select-option>
                                            <a-select-option :value="40">40</a-select-option>
                                        </a-select> 筆
                                        <!-- 筆數：<a-input-number v-model:value="data.searchform.number" :min="1" :max="50" /> -->
                                    </a-col>
                                </a-space>
                            </a-row>
                        </a-card>
                        <br>
                        <a-spin :spinning="data.listSpinning">
                            <a-list bordered item-layout="horizontal" :data-source="data.historyList"
                                style="overflow: auto;height: 520px;" size="small">
                                <template #renderItem="{ item }">
                                    <a-list-item>
                                        <a-list-item-meta>
                                            <template #description>
                                                {{ moment(item.create_at).format('YYYY-MM-DD HH:mm:ss') }}
                                            </template>
                                            <template #title>
                                                <a-tag v-if="item.status === 5" color="green">成功</a-tag>
                                                <a-tag color="red" v-else>失敗</a-tag>
                                                <a @click="getHistoryItem(item)">{{ item.merchant_order_no }}</a>
                                            </template>
                                        </a-list-item-meta>
                                    </a-list-item>
                                </template>
                            </a-list>
                        </a-spin>
                    </a-tab-pane>
                </a-tabs>
            </a-card>
        </a-spin>
        <a-modal v-model:visible="data.modalVisible" title="訂單訊息" :maskClosable="false" :keyboard="false" :closable="false"
            cancelText="取消" width="90%" style="max-width: 400px;" :ok-button-props="{ hidden: true }">
            <a-row>
                <a-space direction="vertical" :size="8">
                    <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                        商戶訂單號：{{ data.historyItem.merchant_order_no }}
                    </a-col>
                    <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                        建立時間：{{ moment(data.historyItem.create_at).format('YYYY-MM-DD HH:mm:ss') }}
                    </a-col>
                    <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                        交易員：{{ data.historyItem.handle_by_id }}
                    </a-col>
                    <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                        完成時間：{{ moment(data.historyItem.finish_at).format('YYYY-MM-DD HH:mm:ss') }}
                    </a-col>
                    <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                        訂單成功：{{ 'testing' }}
                    </a-col>
                    <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                        交易金額：{{ data.historyItem.amount }}
                    </a-col>
                    <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                        成功驗證圖片：<a-image :style="{ display: 'none' }" :preview="{
                                visible: data.imageVisible,
                                onVisibleChange: setVisible,
                            }" src="https://aliyuncdn.antdv.com/vue.png" />
                        <a @click="() => setVisible(true)">點擊查看</a>
                        <!-- 成功驗證圖片：{{ data.historyItem.report_image }} -->
                    </a-col>
                    <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                        備註：{{ data.historyItem.comment }}
                    </a-col>

                </a-space>
            </a-row>
        </a-modal>
        <a-modal v-model:visible="data.modalPaymentVisible" title="新增支付工具" :maskClosable="false" :keyboard="false"
            :closable="false" @ok="onCreate()" cancelText="取消" okText="確認" width="90%" style="max-width: 400px;">
            <a-spin :spinning="data.createPaymentSpinning">
                <a-form ref="paymentFormRef" name="paymentForm" :model="data.paymentForm" layout="horizontal"
                    :label-col="{ style: { width: '125px' } }" :wrapper-col="{ span: 12 }" :rules="data.rules">
                    <a-row>
                        <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                            <a-form-item label="戶名" name="account_name">
                                <a-input v-model:value="data.paymentForm.account_name" />
                                <!-- <a-radio-group v-model:value="data.paymentForm.account_name">
                                <a-radio :value="1">成功</a-radio>
                                <a-radio :value="2">失敗</a-radio>
                            </a-radio-group> -->
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                            <a-form-item label="帳號" name="account_number">
                                <a-input v-model:value="data.paymentForm.account_number" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                            <a-form-item label="銀行名稱" name="bank_name">
                                <a-input v-model:value="data.paymentForm.bank_name" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                            <a-form-item label="分行名稱" name="bank_branch">
                                <a-input v-model:value="data.paymentForm.bank_branch" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                            <a-form-item label="是否為收益提款卡" name="is_withdraw">
                                <a-radio-group v-model:value="data.paymentForm.is_withdraw">
                                    <a-radio :value="true">是</a-radio>
                                    <a-radio :value="false">否</a-radio>
                                </a-radio-group>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                            <a-form-item label="交易通道" name="payment_channel_id">
                                <a-select v-model:value="data.paymentForm.payment_channel_id" style="width: 120px">
                                    <a-select-option v-for="(item, index) in userStore.payment_channel" :key="index"
                                        :value="item.id">{{ item.name }}</a-select-option>
                                </a-select>
                                <!-- <a-radio-group v-model:value="data.paymentForm.payment_channel_id">
                                <a-radio :value="true">是</a-radio>
                                <a-radio :value="false">否</a-radio>
                            </a-radio-group> -->
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </a-spin>
        </a-modal>
        <a-modal v-model:visible="data.modalCardsVisible" title="銀行卡" :maskClosable="false" :keyboard="false"
            :closable="false" cancelText="關閉" width="90%" style="max-width: 400px;" :ok-button-props="{ hidden: true }">
            <cards :cardsInfoList="data.cardsInfoList" @emitList="emitList"></cards>
        </a-modal>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useUserStore } from '../store/user';
import { UserOutlined, HistoryOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { ErrorResponse, CreatePaymentErrorResponse } from '../utils/errorResponse';
import moment from 'moment';
import cards from './Cards.vue'

import { getUserInfo } from '../api/login'
import { traderHistoryTransactions } from '../api/transaction'
import { traderCreatePayment, traderListPayments } from '../api/payment'

components: {
    cards
}

const userStore = useUserStore()

onMounted(() => {
    getInfo()
    getHistoryList()
})

const data = reactive({
    infoForm: {
        username: '',
        current_income: 0,
        month_income: 0,
        quota: 0
    },
    searchform: {
        before_id: '', //string 在指定id前的
        status: 0, // int 5: 成功; 6: 失敗, other: 全部 default=0
        number: 20 // int 撈取筆數
    },
    rules: {
        account_name: [{ required: true, message: "請輸入戶名", trigger: "change" }],
        account_number: [{ required: true, message: "請輸入帳號", trigger: "change" }],
        bank_name: [{ required: true, message: "請輸入銀行名稱", trigger: "change" }],
        bank_branch: [{ required: true, message: "請輸入分行名稱", trigger: "change" }],
        is_withdraw: [{ required: true, message: "請選擇是否收益提款卡", trigger: "change" }],
        payment_channel_id: [{ required: true, message: "請選擇交易通道", trigger: "change" }],
    },
    paymentForm: {},
    transaction_report: {},
    historyItem: {},
    historyList: [],
    cardsInfoList: [],
    spinning: false,
    listSpinning: false,
    createPaymentSpinning: false,
    modalVisible: false,
    modalPaymentVisible: false,
    modalCardsVisible: false,
    imageVisible: false,
    tabKey: '1'
})

watch(() => data.searchform, (a, b) => {
    // console.log(a, b)
    getHistoryList()
}, {
    deep: true
})

/**
 * 獲取個人訊息
 */
const getInfo = async () => {
    data.spinning = true
    try {
        const res = await getUserInfo()
        let resf = res.data.data
        // console.log(resf)
        data.infoForm.username = resf.response.username
        data.infoForm.current_income = resf.current_income
        data.infoForm.month_income = resf.month_income
        data.infoForm.quota = resf.quota

        data.transaction_report = resf.transaction_report
    } catch (error) {
        ErrorResponse(error)
    } finally {
        data.spinning = false
    }
}

/**
 * 歷史訂單列表
 */
const getHistoryList = async () => {
    data.listSpinning = true
    try {
        let params = data.searchform
        const res = await traderHistoryTransactions(params)
        // console.log('traderHistoryTransactions', res)

        data.historyList = res.data.data.response
    } catch (error) {
        ErrorResponse(error)
    } finally {
        data.listSpinning = false
    }
}

/**
 * 查看某一筆歷史訂單
 */
const getHistoryItem = (item) => {
    // console.log(item)
    data.historyItem = item
    data.modalVisible = true
}

/**
 * 新增交易工具
 */
const paymentFormRef = ref()
const onCreate = async () => {
    paymentFormRef.value.validate().then(async () => {
        data.createPaymentSpinning = true
        try {
            let dataf = data.paymentForm
            const res = await traderCreatePayment(dataf)
            // console.log(res)

            message.success('新增成功')
            data.paymentForm = {}
            data.modalPaymentVisible = false
        } catch (error) {
            CreatePaymentErrorResponse(error)
        } finally {
            data.createPaymentSpinning = false
        }
    })
}

/**
 * 第一次傳給cards組件的list
 */
const onOpenCards = async () => {
    try {
        let param = {
            // channel_id: 0,
            channel_id: 1, //20230502 交易員只能使用銀行卡交易
            //TODO:確認此處要帶的參數
            is_withdraw: -1//是否為收益提款卡, 1: 是, 非1正數: 否, 負數: 兩種狀態 
        }

        //交易員可使用的通道
        const res = await traderListPayments(param)
        data.cardsInfoList = res.data.data.response

    } catch (error) {
        ErrorResponse(error)
    }
    data.modalCardsVisible = true
}

/**
 * 接收cards組件的emits更新銀行卡列表
 */
const emitList = async () => {
    try {
        let param = {
            // channel_id: 0,
            channel_id: 1, //20230502 交易員只能使用銀行卡交易
            //TODO:確認此處要帶的參數
            is_withdraw: -1//是否為收益提款卡, 1: 是, 非1正數: 否, 負數: 兩種狀態 
        }

        //交易員可使用的通道
        const res = await traderListPayments(param)
        data.cardsInfoList = res.data.data.response

    } catch (error) {
        ErrorResponse(error)
    }
}

/**
 * 圖片縮圖
 */
const setVisible = (value) => {
    data.imageVisible = value
}
</script>

<style lang="scss" scoped></style>