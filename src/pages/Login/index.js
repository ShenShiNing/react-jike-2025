import './index.scss'
import { Card, Form, Input, Button, message } from "antd"
import logo from "@/assets/logo.png"
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async (values) => {
        // 触发登录异步方法
        await dispatch(fetchLogin(values))
        // 跳转到首页
        navigate('/')
        // 提示登录成功
        message.success('登录成功') 
    }

    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="logo" />
                {/* 登录表单 */}
                <Form validateTrigger="onBlur" onFinish={onFinish}>
                    <Form.Item 
                        name="mobile"
                        // 多条校验规则，先校验第一条 第一条通过以后再校验第二条
                        rules={[
                            { required: true, 
                                message: '请输入手机号' 
                            }, 
                            { 
                                pattern: /^1[3-9]\d{9}$/, 
                                message: '请输入正确的手机号' 
                            }
                        ]}
                    >
                        <Input size="large" placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item 
                        name="code" 
                        rules={[
                            { 
                                required: true, 
                                message: '请输入验证码' 
                            }
                        ]}
                    >
                        <Input size="large" placeholder="请输入验证码" />
                    </Form.Item>
                    <Form.Item>
                        <Button size="large" type="primary" htmlType="submit" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login