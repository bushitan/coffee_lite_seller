//app.js
var db = require('db/db.js')
var db3 = require('db3/db.js')
var db4Share = require('db4_share/db.js')
var db5Customer = require('db5_customer/db.js')
var dbManager = require('db_manager/db.js')

var configBehaviors = require('behaviors/config.js')
var listBehaviors = require('behaviors/list.js')
var dialogBehaviors = require('behaviors/dialog.js')

import { promisifyAll, promisify } from 'lib/miniprogram-api-promise/index.js'; // wx API化  promisify all wx's api
const wxp = {}
promisifyAll(wx, wxp)
wx = wxp

App({
    db: db,
    db3: db3,
    db4: db4Share,
    db5Customer: db5Customer,
    dbm: dbManager,

    configBehaviors: configBehaviors,

    behaviors:{
        configBehaviors:configBehaviors,
        listBehaviors:listBehaviors,
        dialogBehaviors:dialogBehaviors,

    },

    KEY:{
        APPID:"appId" , // appid的关键字段
        USER_TOKEN:"userToken" , // appid的关键字段

        UNION_ID:"unionId" , // appid的关键字段
        UNION_KEY:"unionKey" , // appid的关键字段
        SN:"sn",
        GUID:"guid",
    },
    

    async onLaunch (options) {
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

        // 加载 customer 云函数
        await db5Customer.init()

        // 获取appid
        var res = await wx.getAccountInfoSync()
        wx.setStorageSync(this.KEY.APPID, res.miniProgram.appId)


        // console.log( )
        // db5Customer.getGeoStoreList({
        //     store_uuid: 'e8eeb038-a2d0-11ea-97f8-e95aa2c51b5d', //&longitude=108.333693&latitude=22.805182// this.data.storeUUID,
        //     // isToday: this.data.TabCur == 0?true :false,
        //     range: 1 //this.data.SortMenu[this.data.TabCur].range
        // }).then(res=>{
        //     console.log(res)
        // })

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
        userInfo: null,
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


    // "tabBar": {
    //     "color": "#bfbfbf",
    //     "selectedColor": "#efaf30",
    //     "borderStyle": "black",
    //     "backgroundColor": "#ffffff",
    //     "list": [
    //         {
    //             "pagePath": "pages/store/store",
    //             "iconPath": "/images/icon/prize_un.png",
    //             "selectedIconPath": "/images/icon/prize.png",
    //             "text": "集点卡"
    //         },
    //         {
    //             "pagePath": "pages4/share/total/total",
    //             "iconPath": "/images/icon/prize_un.png",
    //             "selectedIconPath": "/images/icon/prize.png",
    //             "text": "先享卡"
    //         },
    //         {
    //             "pagePath": "pages_shop/admin/admin",
    //             "iconPath": "/images/icon/score_un.png",
    //             "selectedIconPath": "/images/icon/score.png",
    //             "text": "小程序点单"
    //         },
    //         {
    //             "pagePath": "pages3/menu/menu",
    //             "iconPath": "/images/icon/score_un.png",
    //             "selectedIconPath": "/images/icon/score.png",
    //             "text": "收银"
    //         }
    //     ]
    // },

// "list": [
//     {
//         "pagePath": "pages4/share/total/total",
//         "iconPath": "/images/icon/prize_un.png",
//         "selectedIconPath": "/images/icon/prize.png",
//         "text": "先享卡"
//     },
//     {
//         "pagePath": "pages4/hot/hot",
//         "iconPath": "/images/icon/prize_un.png",
//         "selectedIconPath": "/images/icon/prize.png",
//         "text": "最新功能"
//     },
//     {
//         "pagePath": "pages/store/store",
//         "iconPath": "/images/icon/prize_un.png",
//         "selectedIconPath": "/images/icon/prize.png",
//         "text": "集点卡"
//     },
//     {
//         "pagePath": "pages_shop/admin/admin",
//         "iconPath": "/images/icon/score_un.png",
//         "selectedIconPath": "/images/icon/score.png",
//         "text": "小程序点单"
//     }
// ]
    // ,
    // {
    //     "pagePath": "pages3/menu/menu",
    //     "iconPath": "/images/icon/score_un.png",
    //     "selectedIconPath": "/images/icon/score.png",
    //     "text": "收银"
    // }


    //  {
    //             "pagePath": "pages/store/store",
    //             "iconPath": "/images/icon/prize_un.png",
    //             "selectedIconPath": "/images/icon/prize.png",
    //             "text": "集点卡"
    //         },
    //         {
    //             "pagePath": "pages4/hot/hot",
    //             "iconPath": "/images/icon/prize_un.png",
    //             "selectedIconPath": "/images/icon/prize.png",
    //             "text": "便利店"
    //         },
    //         {
    //             "pagePath": "pages4/share/pay/pay",
    //             "iconPath": "/images/icon/prize_un.png",
    //             "selectedIconPath": "/images/icon/prize.png",
    //             "text": "先享卡"
    //         },
    //         {
    //             "pagePath": "pages_shop/admin/admin",
    //             "iconPath": "/images/icon/score_un.png",
    //             "selectedIconPath": "/images/icon/score.png",
    //             "text": "小程序点单"
    //         },
    //         {
    //             "pagePath": "pages3/menu/menu",
    //             "iconPath": "/images/icon/score_un.png",
    //             "selectedIconPath": "/images/icon/score.png",
    //             "text": "收银"
    //         }



{
    // "pagePath": "pages3/index/index",
    //     "iconPath": "/images/icon/score_un.png",
    //         "selectedIconPath": "/images/icon/score.png",
    //             "text": "收银"
}