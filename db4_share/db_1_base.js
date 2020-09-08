
const qiniuUploader = require("../utils/qiniuUploader");
class dbBase {

    // APP_ID =  1 //"wxeb9623bdc85a64f4" 客户端
    // APP_ID = 2  // "wx3e0f68d227f05241" 商户端

    HOST_URL = "https://wm.51zfgx.com/"
    APP_ID = "7016db59b1e84bd1a84f4e974074fa78"  //
    KEY_SHARE_SESSION = "share_session"

    // KEY_USER_INFO = "user_info"
    // KEY_UUID = "uuid"
    // KEY_TOKEN = "token"
    // KEY_SHARE_SESSION = "share_session"
    // KEY_SN = "sn"
    // KEY_UNION_KEY = "union_key"
    // KEY_SHOP_ID = "shop_id"
    // KEY_SHOP_NAME = "shop_name"
    // KEY_SHOP_TAKE_TYPE = "shop_take_type"
    // KEY_ORDER_PRE_PHONE = "order_pre_phone"
    // KEY_ORDER_PRE_ADDRESS = "order_pre_address"


    constructor() {

    }

    // 封装基础的请求
    base(options) {
        return new Promise((resolve, reject) => {
            var data = options.data || {}

            data['Session'] = wx.getStorageSync(this.KEY_SHARE_SESSION) 
            data["AppId"] = this.APP_ID

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
     * @method 1 商户端登陆
     * @return
     */
    login(data) {
        return new Promise((resolve, reject) => {
            var that = this
            wx.login({
                success(res) {
                    console.log(res.code)
                    that.base({
                        url: that.HOST_URL + "api/gettoken/",
                        data: { Code: res.code },
                        method: "POST",
                    }).then(res => {
                        console.log("login:", res.data)
                        // resolve(res)
                        if (res.code == 0) {
                            wx.setStorageSync(that.KEY_SHARE_SESSION, res.data.session)
                        }
                        resolve(res)
                    }).catch(res => reject(false))
                }
            })

        })
    }
}


module.exports = dbBase