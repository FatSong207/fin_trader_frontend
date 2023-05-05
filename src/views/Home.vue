<template>
    <a-layout style="min-height: 100vh">
        <a-layout-header class="header">
            <div style="display: flex;align-items: right;justify-items:right;">
                <a-tooltip title="首頁">
                    <a-button type="text" shape="circle" @click="home()">
                        <template #icon>
                            <HomeFilled style="color: #909399; font-size: 30px;" />
                        </template>
                    </a-button>
                </a-tooltip>
                <a-dropdown>
                    <a-button type="text" shape="circle" style="margin-left: 10px;">
                        <template #icon>
                            <UserOutlined style="color: #909399; font-size: 30px;" />
                        </template>
                    </a-button>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item key="3">
                                <a @click="onTraderInfo()">
                                    <UserOutlined /> 個人訊息
                                </a>
                            </a-menu-item>
                            <a-menu-divider />
                            <a-menu-item key="2">
                                <a @click="onLogout">
                                    <LogoutOutlined /> 登出
                                </a>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
        </a-layout-header>
        <a-layout>
            <a-layout-content :style="{ margin: '10px', }" class="content">
                <router-view v-slot="{ Component }">
                    <transition name="fade-transform" mode="out-in">
                        <!-- <keep-alive> -->
                        <component :is="Component" />
                        <!-- </keep-alive> -->
                    </transition>
                </router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script setup>
import { HomeFilled, LogoutOutlined, UserOutlined } from '@ant-design/icons-vue';
import { useUserStore } from '../store/user'
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter()

const onLogout = () => {
    userStore.LogOut()
}

const onTraderInfo = () => {
    router.push('trader')
}

const home = () => {
    router.push('list')
}

</script>

<style lang="scss" scoped>
.header {
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #e2e7f0;
    box-shadow: 0 2px 2.5px 0 rgb(0 0 0/20%);
    height: 60px;
    position: fixed;
    width: 100%;
    z-index: 99;
}

.content {
    /* box-shadow: 0 2px 12px 0 rgb(0 0 0/10%); */
    border-radius: 5px;
    padding-top: 60px;
    /* padding: 20px; */
}

.avatar {
    color: #fff;
    background-color: #87d068;
    cursor: pointer;
    margin-left: 10px;
}
</style>
<style>
.searchcard {
    margin-bottom: 20px;
    width: 100%;
    box-shadow: 0 1px 16px 0 rgb(33 41 48 / 15%);
}


.btnspace {
    margin-bottom: 10px;
    width: 100%;
}

.card {
    /* margin-bottom: 20px; */
    box-shadow: 0 1px 16px 0 rgb(33 41 48 / 15%);
    /* background: #ecf0ff89; */
}
</style>