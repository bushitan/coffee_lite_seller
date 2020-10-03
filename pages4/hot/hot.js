// pages4/hot/hot.js

var API = require('../../api/api.js')
var DB = require('../../api/db.js')
var db = new DB()
Page({

    /**
     * 页面的初始数据
     */
    data: {

        longitude: 108.32754,
        latitude: 22.81521,

        scList: [

            {
                cover: "/images/good/1_lizi.jpg",
                des: '下午茶的小蛋糕',
                icon: ["玛德琳", "下午茶"],
                appId:"wx7d6caecfc99ccdc5",
                path:"plugin-private://wx34345ae5855f892d/pages/productDetail/productDetail?productId=601428",
            },
            {
                cover: "https://wm.51zfgx.com/images/thumbs/0002454.jpeg",
                des: '轻餐搭配。',
                icon: ["可颂", "面包"],
                appId: 'wx9e97c9fb1e0b26b4',
                path: "pages/menu/menu_sc",
            },
            // {
            //     cover: "https://wm.51zfgx.com/images/thumbs/0002461_5_75.jpeg",
            //     des: '材料只有面粉、水、盐和酵母，不含油、糖以及任何添加剂，吃起来更放心。',
            //     icon: [],
            // },
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    
    /**去电商小程序 */
    toMall(){
        wx.navigateToMiniProgram({
            appId: 'wx4aedf8c9edf9fd72',
        })
    },

    /**去点单小程序 */
    toMenu() {
        wx.navigateToMiniProgram({
            appId: 'wx28be8489b7a36aaa',
        })
    },

    /**去点单小程序 */
    async toCustomerGeo(){

        // var userInfo = wx.getStorageSync(API.USER_INFO, userInfo)
        // var storeUUID = userInfo.store_uuid
        // var store = await db.storeInfo(storeUUID)
        
        // // GP.setData({
        // //     store: store,
        // //     userInfo: userInfo,
        // //     storeUUID: storeUUID,
        // //     isSeller: isSeller,
        // //     isHost: isHost,
        // // })
        // wx.navigateToMiniProgram({
        //     appId: 'wxd19bbe9cb3b293b6',
        //     path: "pages3/geo/geo?store_uuid=" + storeUUID + "&longitude=" + store.longitude + "&latitude=" + store.latitude ,
        // })

                // 声明新的 cloud 实例
        var c1 = new wx.cloud.Cloud({
            // 资源方 AppID
            resourceAppid: 'wxd19bbe9cb3b293b6',
            // 资源方环境 ID
            resourceEnv: 'cup-customer-release',
        })
        console.log(c1)
        
        // 跨账号调用，必须等待 init 完成
        // init 过程中，资源方小程序对应环境下的 cloudbase_auth 函数会被调用，并需返回协议字段（见下）来确认允许访问、并可自定义安全规则
        // var res = await c1.init()
        var res =   c1.init({traceUser: true})
        console.log(res)
        c1.callFunction({
            name: 'geo',
            data: {
                "action":"get_geo_store_list",
                store_uuid: this.data.storeUUID,
                // isToday: this.data.TabCur == 0?true :false,
                range: this.data.SortMenu[this.data.TabCur].range
            },
            success : res => {
                console.log(res)
                var temp = res.result.data
                var list = []
                for (var i = 0; i < temp.length;i++)
                    list.push({
                        "count": 100,
                        "lng": temp[i].geo.coordinates[0],
                        // "lng": temp[i].geo.coordinates[0],
                        "lat": temp[i].geo.coordinates[1]
                    })
                console.log(JSON.stringify( list))
                this.setData({
                    list:list
                })
                this.addMarkers()
                // wx.setStorageSync("list", list)
            },
        })
    },



    toAD() {
        wx.navigateToMiniProgram({
            appId: 'wxd947200f82267e58',
            path: "pages/wjxqList/wjxqList?activityId=90862932",
        })
    },

    toLine(e){
        var index = e.currentTarget.dataset.index
        var node = this.data.scList[index]
        wx.navigateToMiniProgram({
            appId: node.appId,
            path: node.path,
        })
        // wx.navigateToMiniProgram({
        //     appId: 'wx9e97c9fb1e0b26b4',
        //     path:"pages/menu/menu_sc",
        // })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})