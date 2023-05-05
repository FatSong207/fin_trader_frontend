<template>
    <div>
        <a-collapse v-model:activeKey="data.activeKey" accordion>
            <a-collapse-panel v-for="(item, index) in props.cardsInfoList" :key="item.id" :header="item.bank_name">
                <!-- <p>{{ item.account_name }}</p> -->
                <a-descriptions bordered size="small" :labelStyle="{ width: '100px' }"
                    :column="{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }">
                    <template #title>
                        <a-button type="primary" danger @click="onDeletePayment(item.id)">刪除</a-button>
                    </template>
                    <a-descriptions-item label="銀行名稱">{{ item.bank_name }}</a-descriptions-item>
                    <a-descriptions-item label="分行名稱">{{ item.bank_branch }}</a-descriptions-item>
                    <a-descriptions-item label="戶名">{{ item.account_name }}</a-descriptions-item>
                    <a-descriptions-item label="銀行帳號">{{ item.account_number }}</a-descriptions-item>
                    <a-descriptions-item label="額度">000</a-descriptions-item>
                    <a-descriptions-item label="每日上限">000</a-descriptions-item>
                    <a-descriptions-item label="每週上限">000</a-descriptions-item>
                </a-descriptions>
            </a-collapse-panel>
        </a-collapse>
    </div>
</template>

<script setup>
import { reactive } from 'vue';

import { traderDeletePayment } from '../api/payment';
import { Modal, message } from 'ant-design-vue';
import { DeletePaymentErrorResponse } from '../utils/errorResponse';


const emit = defineEmits(["emitList"]);

const props = defineProps({
    cardsInfoList: {
        type: Array,
        default: () => [],
    },
})

const data = reactive({
    activeKey: '',
})

const onDeletePayment = async (id) => {
    Modal.confirm({
        title: '確認',
        content: `確定刪除？`,
        okText: '確認',
        cancelText: '取消',
        onOk: async () => {
            try {
                const res = await traderDeletePayment(id)
                // console.log(res)

                message.success('刪除成功')
                emit("emitList")
            } catch (error) {
                DeletePaymentErrorResponse(error)
            }
        },
    })

}

</script>
<script>
export default {
    name: 'cards'
}
</script>

<style lang="scss" scoped></style>