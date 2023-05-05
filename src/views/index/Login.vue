<template>
    <a-spin :spinning="spin" size="large" :tip="tip">
        <a-form :model="formData" name="normal_login" class="login-form" @finish="onLogin" @finishFailed="onLoginFailed">
            <a-row>
                <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                    <a-form-item name="username" :rules="[{ required: true, message: '請輸入帳號!' }]">
                        <a-input v-model:value="formData.username" size="large" placeholder="帳號">
                            <template #prefix>
                                <UserOutlined class="site-form-item-icon" />
                            </template>
                        </a-input>
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                    <a-form-item name="password" :rules="[{ required: true, message: '請輸入密碼!' }]">
                        <a-input-password v-model:value="formData.password" size="large" placeholder="密碼">
                            <template #prefix>
                                <LockOutlined class="site-form-item-icon" />
                            </template>
                        </a-input-password>
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="24" :xl="24" :xxl="24">
                    <a-form-item>
                        <a-button size="large" type="primary" html-type="submit" class="login-form-button"
                            style="width: 100%">
                            登入
                        </a-button><br />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </a-spin>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '../../store/user'

const router = useRouter()

// 用户登录
const formData = reactive({
    username: '',
    password: '',
});
const userStore = useUserStore()
const spin = ref(false)
const tip = ref('')

const onLogin = async () => {
    spin.value = true
    tipRun()
    let param = {
        username: formData.username,
        password: formData.password,
        grant_type: "password",
        refresh_token: "",
    }
    await userStore.Login(param)
    spin.value = false
};
const tipRun = () => {
    tip.value = "登入中"
    let i = 0;
    setInterval(() => {
        tip.value += "."
        i++
        if (i % 4 === 0) {
            tip.value = "登入中"
        }
    }, 500);
}

const onLoginFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

</script>

<style scoped>
.site-form-item-icon {
    color: rgba(0, 0, 0, .45);
}
</style>