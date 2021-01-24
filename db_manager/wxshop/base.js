class WXShopBase{
    constructor(){
        
    }

    appId = ""
    setAppId(appId){
        this.appId = appId
    }
    AccessToken(options){
        return new Promise((reslove, reject) => {

            var data = options.data || {}
            console.log("data", data)
            data.data = data.data || {}
            data.method = data.method || "POST"
            data.authorizerId = this.appId
            wx.request({
                url: "https://admin.51zfgx.com/OpenOAuth/WxShopHttpHub/",
                data: data,
                method: "POST",
                success: res => {
                    
                    reslove(res.data)
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
module.exports = WXShopBase