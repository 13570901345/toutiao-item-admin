// 文章接口

import request from "@/utils/require"

//获取文章数据接口
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

//获取文章频道
export const getarticlemouth = data => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/channels',
        data
    })
}
//注意关于id传值从字符串转化为json对象的时候发送的数字变化，因为系统他默认不识别那么多数字的id 可用json-bigint来解决
//删除文章
export const detalearticle = articleid => {
    return request({
        method: 'DELETE',
        url: `/mp/v1_0/articles/${articleid}`
    })
}

//发布文章接口  draft可传一个默认值，但必须放在后面，这样另一边传参就可以只传一个
export const publisharticle = (data,draft = false) => {
    return request({
        method: 'POST',
        url: '/mp/v1_0/articles',
        params: {
            draft,//是否存为草稿（true 为草稿）
        },
        data:data
    })
}

//编辑文章的操作
export const putarticle = (id,data,draft = false) => {
    return request({
        method: 'PUT',
        url: `/mp/v1_0/articles/${id}`,
        params: {
            draft //是否存为草稿（true 为草稿）
        },
        data
    })
}

//获取指定文章
export const getfindarticle = id => {
    return request({
        method: 'GET',
        url: `/mp/v1_0/articles/${id}`,
    })
}
//修改评论状态
export const updatacommend = (articleid,dram) => {
    return request({
        method: 'put',
        url: '/mp/v1_0/comments/status',
        params: {
            article_id:articleid
        },
        data: {
            allow_comment: dram
        }
    })
}
