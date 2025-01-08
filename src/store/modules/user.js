// 用户相关的状态管理

import { createSlice } from '@reduxjs/toolkit'
import { request, setToken as _setToken, getToken, removeToken } from '@/utils'
import { getUserInfoAPI, loginAPI } from '@/apis/user'

const userStore = createSlice({
    name: 'user',
    // 数据状态
    initialState: {
        token: getToken() || '',
        userInfo: {}
    },
    // 同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            // localStorage存储token
            _setToken(action.payload)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        clearUserInfo(state) {
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    }
})

// 异步修改方法
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        // 1.发送异步请求
        const response = await loginAPI(loginForm)
        // 2.提交同步方法，进行token的存储
        dispatch(setToken(response.data.token))
    }
}

// 获取个人信息异步方法
const fetchUserInfo = () => {
    return async (dispatch) => {
        const response = await getUserInfoAPI()
        dispatch(setUserInfo(response.data))
    }
}

// 解构出actionCreater
const { setToken, setUserInfo, clearUserInfo } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

export { fetchLogin, fetchUserInfo, setToken, setUserInfo, clearUserInfo }

export default userReducer