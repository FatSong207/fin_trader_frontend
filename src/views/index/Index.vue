<template>
    <div class="container">
        <div class="header">
            <img src="../../assets/logo02.svg"
                style="width: 60px;height: 60px;filter: drop-shadow(2px 2px 6px #79bbff);" />
            <!-- <span class="title">SH<b style="color: #1283FF;">ADMIN</b></span> -->
        </div>
        <div class="content">
            <div class="main">
                <router-view v-slot="{ Component }">
                    <transition name="fade-transform" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </div>
            <div class="footer">
                <div class="copyright">Copyright © GSH</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { ContainerOutlined, MoneyCollectOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import moment from 'moment'
import { message } from 'ant-design-vue';

const data = reactive({
    title: '',
    key: '',
    expire_at: '',
})

onMounted(() => {
})

const emitInfo = (s) => {
    data.title = s.type === 1 ? '入款' : s.type === 2 ? '出款' : ''
    data.key = s.key
    data.expire_at = s.expire_at
}

const getInfo = () => {
    message.info('info')
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 100vh;
    background: #F0F2F5;
}

.header {
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.content {
    width: 100%;
}

.main {
    width: 368px;
    margin: 0 auto;
}

.footer {
    width: 100%;
    bottom: 0;
    text-align: center;
    color: rgba(0, 0, 0, .45);
    font-size: 14px;
}

.copyright {
    padding: 10px;
}

.title {
    font-size: 22px;
    color: rgba(31, 31, 31, 0.85);
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-weight: 600;
    position: relative;
    top: 2px;
    padding: 20px;
    letter-spacing: 1px;
}
</style>
