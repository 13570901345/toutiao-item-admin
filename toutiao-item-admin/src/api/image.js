import request from "@/utils/require"

//文件上传接口
export const imagefile = data => {
    return request({
        method: 'post',
        url: '/mp/v1_0/user/images',
        //由于请求头接口要求的content-type 设置的是multipart/form-data,但是我们axios不用手动设置
        //只要你传过来的数据是formdata对象就行了，他会自动设置
        data
    })
}
//图片获取接口
export const getimage = params => {
    return request({
        method: 'get',
        url: '/mp/v1_0/user/images',
        params
    })
}

//收藏/取消图片素材
export const collectimage = (imageid,collect) => {
    return request({
        method: 'put',
        url: `/mp/v1_0/user/images/${imageid}`,
        data: {
            collect
        }
    })
}
//删除图片素材
export const deleteimage = (imageid) => {
    return request({
        method: 'DELETE',
        url: `/mp/v1_0/user/images/${imageid}`,
    })
}

