// 文章接口

import request from "@/utils/require"

export const getarticle = params => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/articles',
        //body 参数使用 data 设置
        // query 参数使用 params 设置
        // headers 参数使用 headers 设置
        params
    })
}