import {
  userLogin,
  getUserInfo,
  userLogout,
  traderListPaymentChannels
} from '../api/login'
import { defineStore } from 'pinia'
import router from '../router/index'
import { ref, watch } from 'vue'
import { useRouterStore } from '../store/router'
import { ErrorResponse } from '../utils/errorResponse'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const token = ref(window.localStorage.getItem('token') || '')
  const payment_channel = ref([])

  const SetUserInfo = val => {
    userInfo.value = val
  }

  const SetToken = val => {
    token.value = val
  }

  const SetPayment_Channels = val => {
    payment_channel.value = val
  }

  /*獲取用戶信息*/
  const GetUserInfo = async () => {
    const res = await getUserInfo()
    SetUserInfo(res.data.data)
    const pcres = await traderListPaymentChannels()
    SetPayment_Channels(pcres.data.data)
    return res
  }

  /*登入*/
  const Login = async loginInfo => {
    try {
      const res = await userLogin(loginInfo)
      // console.log(res.data.data)
      SetToken(res.data.data.access_token)

      const pcres = await traderListPaymentChannels()
      SetPayment_Channels(pcres.data.data)

      const routerStore = useRouterStore()
      await routerStore.SetAsyncRouter()
      const asyncRouters = routerStore.asyncRouters
      asyncRouters.forEach(asyncRouter => {
        router.addRoute(asyncRouter)
      })

      await router.push({ name: 'Home' })
      return true
    } catch (error) {
      ErrorResponse(error)
    }
  }

  /* 登出*/
  const LogOut = async () => {
    try {
      await userLogout()
      router.push({ path: '/login', replace: true })
      token.value = ''
      localStorage.clear()
      window.location.reload()
    } catch (error) {
      ErrorResponse(error)
    }
  }

  /* 清理数据 */
  const ClearStorage = async () => {
    token.value = ''
    sessionStorage.clear()
    localStorage.clear()
  }

  //偵測token是否更新
  watch(
    () => token.value,
    () => {
      window.localStorage.setItem('token', token.value)
    }
  )
  return {
    userInfo,
    token,
    payment_channel,
    SetToken,
    Login,
    LogOut,
    GetUserInfo,
    ClearStorage
  }
})
