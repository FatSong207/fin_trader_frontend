<template>
    <div class="error-container">
        <div class="error-content">
            <div class="bullshit">
                <div class="bullshit-oops">{{ oops }}</div>
                <div class="bullshit-headline">{{ headline }}</div>
                <div class="bullshit-info">{{ info }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';

const emit = defineEmits(["emitInfo"]);

const oops = ref('抱歉！')
const headline = ref('此訂單已失效（過期）')
const info = ref('請重新建立訂單。')

// 把資料清除讓訂單資訊欄不顯示
onMounted(() => {
    let s = {
        merchant_id: "",
        key: '',
        expire_at: '',
        type: ''
    }
    emit("emitInfo", s)
})
</script>

<style lang="scss" scoped>
.error-container {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #F0F2F5;

    .error-content {

        .bullshit {
            position: relative;
            float: left;
            width: 300px;
            padding: 30px 0;
            overflow: hidden;

            &-oops {
                margin-bottom: 20px;
                font-size: 32px;
                font-weight: bold;
                line-height: 40px;
                color: #1482f0;
                opacity: 0;
                animation-name: slideUp;
                animation-duration: 0.5s;
                animation-fill-mode: forwards;
            }

            &-headline {
                margin-bottom: 10px;
                font-size: 20px;
                font-weight: bold;
                line-height: 24px;
                color: #222;
                opacity: 0;
                animation-name: slideUp;
                animation-duration: 0.5s;
                animation-delay: 0.1s;
                animation-fill-mode: forwards;
            }

            &-info {
                margin-bottom: 30px;
                font-size: 13px;
                line-height: 21px;
                color: #1482f0;
                opacity: 0;
                animation-name: slideUp;
                animation-duration: 0.5s;
                animation-delay: 0.2s;
                animation-fill-mode: forwards;
            }

            &-return-home {
                display: block;
                float: left;
                width: 110px;
                height: 36px;
                font-size: 14px;
                line-height: 36px;
                color: #fff;
                text-align: center;
                cursor: pointer;
                background: #1482f0;
                border-radius: 100px;
                opacity: 0;
                animation-name: slideUp;
                animation-duration: 0.5s;
                animation-delay: 0.3s;
                animation-fill-mode: forwards;
            }

            @keyframes slideUp {
                0% {
                    opacity: 0;
                    transform: translateY(60px);
                }

                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        }
    }
}
</style>