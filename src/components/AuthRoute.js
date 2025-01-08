// 封装路由权限验证组件
// 核心逻辑：验证token是否有效，无效则跳转到登录页
import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'

export function AuthRoute({ children }) {
    const token = getToken()
    if (token) {
        return <>{children}</>
    } else {
        return <Navigate to="/login" replace />
    }
}