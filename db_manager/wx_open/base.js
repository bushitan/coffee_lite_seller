
class WXOpenBase{
    constructor(appId){
        
        this.appId = appId
    }

    AccessToken(options){
        return new Promise((resolve, reject) => {

            var data = options.data || {}
            console.log("data", data)
            data.data = data.data || {}
            data.method = data.method || "POST"
            data.authorizerId = this.appId

            // // 获取appid
            // var app = getApp()
            // data.appId = wx.getStorageSync(app.KEY.APPID)
            // data.session = wx.getStorageSync(app.KEY.SESSION_MANAGER)
            
            wx.request({
                url: "https://admin.51zfgx.com/OpenOAuth/WxShopHttpHub/",
                data: data,
                method: "POST",
                success: res => {
                    
                    resolve(res.data)
                },
                fail: res => {
                    wx.hideLoading();
                    reject(res.data)
                },

            })

        })
    }

    
    ComponentVerifyTicket(){

    }
}
module.exports = WXOpenBase