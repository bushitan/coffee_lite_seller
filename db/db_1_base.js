
const qiniuUploader = require("../utils/qiniuUploader");
class dbBase {

    // APP_ID =  1 //"wxeb9623bdc85a64f4" 客户端
    APP_ID = 2  // "wx3e0f68d227f05241" 商户端



    KEY_SESSION = "session"
    KEY_SN = "sn"
    KEY_UUID = "uuid"
    KEY_USER_ID= "user_id"
    KEY_USER_INFO= "user_info"
    KEY_OPEN_ID= "open_id"
    KEY_APP_ID= "app_id"
    KEY_UNION_ID="union_id"

    HOST_URL = "https://jdkapi.qskjad.top/" // 主机地址

    constructor() {

    }

    // 封装基础的请求
    base(options) {
        return new Promise((resolve, reject) => {
            var data = options.data || {}
            // data['customer_uuid'] = wx.getStorageSync(this.KEY_UUID)


            data['session'] =  wx.getStorageSync(this.KEY_SESSION)  
            wx.request({
                url: options.url,
                method: options.method || "POST",
                header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                data: data,
                success(res) {
                    resolve(res.data)
                },
                fail(res) {
                    console.log("请求错误：" + options.url,res)
                    reject(res)
                },
            })
        })
    }




    /**
     * @method 1 用户登录
     * @param
     *      
     * @return 
     * 
     */
    test(data){
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "/",
                data:data,
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }


    /**
     * @method 2 获取token上传图片
     * @param
     *      
     * @return 
     * 
     */
    baseQiniuToken() {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/qiniu/token/",
                // data: data,
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res.token)
            }).catch(res => reject(res))
        })
    }

    baseUploadQIniu(filePath,key,token){
        return new Promise((resolve,reject) => {
            qiniuUploader.upload(filePath, (res) => {
                console.log(res)
                resolve(res.imageURL)
                // that.setData({
                //     'imageURL': res.imageURL,
                // });
                // console.log('file url is: ' + res.fileUrl);
            }, (error) => {
                console.log('error: ' + error);
            }, {
                    region: 'SCN',
                    domain: 'https://content.qskjad.top', // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
                    key: key, // [非必须]自定义文件 key。如果不设置，默认为使用微信小程序 API 的临时文件名
                    // 以下方法三选一即可，优先级为：uptoken > uptokenURL > uptokenFunc
                    uptoken: token, // 由其他程序生成七牛 uptoken
                },
                // (res) => {

                //     console.log(res)
                //     resolve(res.imageURL)
                // },
                //  () => {
                //     // 取消上传
                // }, () => {
                //     // `before` 上传前执行的操作
                // }, (err) => {
                //     // `complete` 上传接受后执行的操作(无论成功还是失败都执行)
                // }
                );
        })
    }



    // baseHost(options) {
    //     return new Promise((resolve, reject) => {
    //         this.base({
    //             url: HOST_URL + options.url,
    //             data: options.data,
    //             method: options.method,
    //             success(res) {
    //                 resolve(res)
    //             },
    //             fail(res) {
    //                 console.log(res)
    //                 reject(res)
    //             },
    //         })
    //     })
    // }

    // baseHostNormal() { }



    // base(){
    //     console.log(11)
    // }
}


module.exports = dbBase