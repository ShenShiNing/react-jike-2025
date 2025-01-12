// 封装和文章相关的接口函数

import { request } from '@/utils'

// 获取频道列表
export function getChannelsAPI() {
    return request({
        url: '/channels',
        method: 'GET',
    })
}

// 提交文章
export function createArticleAPI(formData) {
    return request({
        url: '/mp/articles?draft=false',
        method: 'POST',
        data: formData
    })
} 