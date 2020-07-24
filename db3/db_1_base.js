
const qiniuUploader = require("../utils/qiniuUploader");
class dbBase {

    // APP_ID =  1 //"wxeb9623bdc85a64f4" 客户端
    // APP_ID = 2  // "wx3e0f68d227f05241" 商户端


    KEY_USER_INFO = "user_info"
    KEY_UUID = "uuid"
    KEY_TOKEN = "token"
    KEY_SESSION = "Session"
    KEY_SN = "sn"
    KEY_UNION_KEY = "union_key"
    KEY_SHOP_ID = "shop_id"
    KEY_SHOP_NAME = "shop_name"
    KEY_SHOP_TAKE_TYPE = "shop_take_type"
    KEY_ORDER_PRE_PHONE = "order_pre_phone"
    KEY_ORDER_PRE_ADDRESS = "order_pre_address"

    HOST_URL = "https://wm.51zfgx.com/"
    APP_ID = "59c38d10ba0e453ba52111b8059482c5"  //

    constructor() {

    }

    // 封装基础的请求
    base(options) {
        return new Promise((resolve, reject) => {
            var data = options.data || {}
            // data['customer_uuid'] = wx.getStorageSync(this.KEY_UUID)
            // data['session'] =  wx.getStorageSync(this.KEY_SESSION) 

            // data["Session"] = wx.getStorageSync(this.KEY_SESSION)  

            data["Session"] = "5IRWgui7bOgux2bPP/yG/+X6ggVyOfVOuddyHjREIRovkeAica+InpgVULYXNQXKPkSpPKqTVj1LlRTjhSESW6FymvO6KP2dSbxqgTd9Bi86ESKz50jF8CBGHN/jOAaOz70JIJ3jHIcmgoCbF+u5JQBxAQHxV7vXOeNImc5F7IWrfRbQGjukCY8TQ39EbjQIGW3tZhmME9AmRTAT/WiMtm8Dtiqany+CKI6Hzmg4vM5MeaKKhVOvAE1souwPnLXbE1KBJ+Pfc8QQsLcNFeR1HrN6jxautESS57A7t1eVwD5z1fI23Y45oyNJlNb9rsc3dr6eDdLhH5QR6qTXz6OQgtYrMjOXzPLKogxO5gcfQhE=" 

            // data["AppId"] = this.APP_ID
            data["AppId"] = "cd8ef711513b41ad8d2f6aea94349e2d"

            var startTime = new Date().getTime();
            wx.request({
                url: options.url,
                method: options.method || "POST",
                header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                data: data,
                success(res) {

                    var completeTime = new Date().getTime();
                    console.log(options.url , ":", completeTime - startTime)
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



    /********瀑布流模块*********/
    checkIsMore(page, limit, count) {
        // 版本2
        if (count < limit)
            return false
        else
            return true
    }
	/**
	 * @method 初始化瀑布流
	 */
    listInit(self) {
        self.setData({
            page: 1,
            limit: 20,
            lock: false,
            isMore: true,
            list: [],
        })
    }
	/**
	 * @method 更新
	 */
    listUpdate(self, res) {
        // debugger
        var page = self.data.page
        var limit = self.data.limit
        // var count = res.count || res.data.length
        var count = res.data.length
        var oldList = self.data.list
        var newList = res.data

        var isMore = this.checkIsMore(page, limit, count)
        self.setData({
            page: self.data.page + 1,
            lock: false,
            list: oldList.concat(newList),
            isMore: isMore,
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