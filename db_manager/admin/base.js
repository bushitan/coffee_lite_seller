/**
 * admin 管理体系的API汇总
 *  
 * 主机地址 ： host = "https://shop.51zfgx.com"
 * 测试地址 ： 暂无
 *  
 */


var app

class AdminBase {


    host = "https://shop.51zfgx.com"
    // host = "https://admin.51zfgx.com"
    
    constructor() { }

    base(options) {
        return new Promise((resolve, reject) => {

            var data = options.data || {}


            var url = this.host + options.url

            
            var _org = encodeURIComponent(url)
            var _temp = _org.replace(/%E2%80%8B/g,"")
            var _url = decodeURIComponent(_temp)

            // url = encodeURIComponent(url)
            // debugger
            app = app || getApp()
            data.appId = wx.getStorageSync(app.KEY.APPID)
            data.userToken = wx.getStorageSync(app.KEY.USER_TOKEN)

            // console.log(data)
            // data['Session'] = wx.getStorageSync(this.KEY_SHARE_SESSION)
            // data["AppId"] = this.APP_ID

            
            var startTime = new Date().getTime();
            var completeTime
            wx.request({
                url: _url,
                method: options.method || "POST",
                header: {
                    // 'content-type': 'application/x-www-form-urlencoded' // 默认值
                    'content-type':'application/json'
                },
                data: data,
                success : res => {

                    completeTime = new Date().getTime();
                    // console.warn(this.host + options.url , ":", completeTime - startTime)
                    resolve(res.data)
                },
                fail: res => {
                    // console.log("请求错误：" + this.host + options.url, res)
                    // console.error(options.url, ":", completeTime - startTime)
                    reject(res)
                },
            })
        })
    }

    // 登陆
    login() {
        return new Promise((reslove, reject) => {
            wx.login({
                success: res => {
                    this.base({
                        url: "/Api/V5/OrgWxShoper/JsCode2Session/",
                        data: {
                            "userToken": "",
                            "code": res.code
                        }
                    }).then(res => {
                        if (res.code == 0) {
                            wx.setStorageSync(app.KEY.USER_TOKEN, res.data.userToken)
                            wx.setStorageSync(app.KEY.UNION_ID, res.data.unionId)
                            wx.setStorageSync(app.KEY.UNION_KEY, res.data.unionKey)
                            wx.setStorageSync(app.KEY.SN, res.data.sn)
                            wx.setStorageSync(app.KEY.GUID, res.data.guid)
                            
                          
                            
                        }
                        reslove(res)
                    }).catch(res => reject(res))
                }
            })

        })
    }

}
module.exports = AdminBase