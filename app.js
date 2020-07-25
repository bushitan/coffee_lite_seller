//app.js
var db = require('db/db.js')
var db3 = require('db3/db.js')
App({
    db: db,
    db3: db3,
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

    // 判断用户选择
    showModal(msg, showCancel=true){
        return new Promise((resolve, reject) => {
            wx.showModal({
                title: msg,
                showCancel: showCancel ,
                success(res){
                    if(res.confirm) 
                        resolve(true)
                    else{
                        resolve(false)
                    }
                },
                fail(){
                    reject(false)
                },                
            })
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

    // ,
    // {
    //     "pagePath": "pages_shop/local/local",
    //     "iconPath": "/images/icon/score_un.png",
    //     "selectedIconPath": "/images/icon/score.png",
    //     "text": "自助下单"
    // }


    //     "tabBar": {
    //     "color": "#bfbfbf",
    //     "selectedColor": "#efaf30",
    //     "borderStyle": "black",
    //     "backgroundColor": "#ffffff",
    //     "list": [
    //         {
    //             "pagePath": "pages2/self/self",
    //             "iconPath": "/images/icon/prize_un.png",
    //             "selectedIconPath": "/images/icon/prize.png",
    //             "text": "集点卡"
    //         },
    //         {
    //             "pagePath": "pages_shop/admin/admin",
    //             "iconPath": "/images/icon/score_un.png",
    //             "selectedIconPath": "/images/icon/score.png",
    //             "text": "点单管理"
    //         },
    //         {
    //             "pagePath": "pages3/menu/menu",
    //             "iconPath": "/images/icon/score_un.png",
    //             "selectedIconPath": "/images/icon/score.png",
    //             "text": "收银"
    //         }
    //     ]
    // },