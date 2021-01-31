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
    
    constructor() { }

    base(options) {
        return new Promise((resolve, reject) => {

            var data = options.data || {}
            
            var url = this.host + options.url
            app = app || getApp()
            data.AppId = wx.getStorageSync(app.KEY.APPID)
            data.Session = wx.getStorageSync(app.KEY.SESSION_MANAGER)
            // data['Session'] = wx.getStorageSync(this.KEY_SHARE_SESSION)
            // data["AppId"] = this.APP_ID

            var startTime = new Date().getTime();
            wx.request({
                url: url,
                method: options.method || "POST",
                header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                data: data,
                success : res => {

                    var completeTime = new Date().getTime();
                    console.warn(this.host + options.url , ":", completeTime - startTime)
                    resolve(res.data)
                },
                fail: res => {
                    // console.log("请求错误：" + this.host + options.url, res)
                    console.error(options.url, ":", completeTime - startTime)
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
                        url: "/Api/V5/OrgWxShoper/JsCode2Session",
                        data: {
                            "userToken": "",
                            "code": res.code
                        }
                    }).then(res => {
                        if (res.code == 0) {
                            wx.setStorageSync(app.KEY.SESSION_MANAGER, res.data.session)
                        }
                        wx.hideLoading();
                        reslove(res)
                    }).catch(res => reject(res))
                }
            })

        })
    }

}
module.exports = AdminBase