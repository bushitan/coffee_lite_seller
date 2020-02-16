//app.js
var db = require('db/db.js')
App({
    db: db,
    onLaunch: function (options) {
        console.log("[onLaunch] 本次场景值:", options.scene)
        this.globalData.scene = options.scene

        //加载广告
        // this.adInit()

        // 自定义导航条高度
        wx.getSystemInfo({
            success: e => {
                this.globalData.StatusBar = e.statusBarHeight;
                let capsule = wx.getMenuButtonBoundingClientRect();
                if (capsule) {
                    this.globalData.Custom = capsule;
                    this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
                } else {
                    this.globalData.CustomBar = e.statusBarHeight + 50;
                }
            }
        })
    },

    // 获取上一页面
    getPrePage() {
        var pre = getCurrentPages()[getCurrentPages().length - 2]
        return pre
    },

    globalData: {
        userInfo: null
    },
    
    // 基础的分享页面功能
    onShareAppMessage(res) {
        res = res || {}
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: res.title || '欢迎进入分享集点卡商户端',
            path: res.path || '/pages/route/route',
            imageUrl: res.imageUrl || "../../images/icon_share_base_cup.png",

        }
    },
})