
// pages/list/list.js
var GP
var API = require('../../api/api.js')
var DB = require('../../api/db.js')
var db = new DB()
var interval

Page({

    /**
     * 页面的初始数据
     */
    data: {
        store: [],
        isSeller: false,
        isHost: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        GP.getAuth()
        // GP.getStoreData(options)
        // GP.interval()
    },

    // 获取权限信息
    getAuth() {
        var userInfo = wx.getStorageSync(API.USER_INFO, userInfo)
        var storeUUID = userInfo.store_uuid
        var isSeller = userInfo.store_uuid == '' ? false : true
        var isHost = userInfo.is_host

        db.storeInfo(storeUUID).then( store => {
            console.log(store)
            GP.setData({
                store: store,
                userInfo: userInfo,
                storeUUID: storeUUID,
                isSeller: isSeller,
                isHost: isHost,
            })
            wx.setNavigationBarTitle({
                title: store.title + '商户版',
            })
            // GP.scanEvent("score", "564146a2-67f5-11e9-989b-b83312f00bac")
        })

    },

    // 扫码
    scan(){
        wx.scanCode({
            success(res) {
                var list = res.result.split(",")
                var model = list[0]
                var customer_uuid = list[1]
                var store_uuid = list[2]
                console.log(list)
                GP.scanEvent(model, customer_uuid, store_uuid)
            }
        })
    },
    // 扫码事件
    scanEvent(model, customer_uuid, store_uuid) {
        db.scanSeller({
            model: model,
            customer_uuid: customer_uuid,
            store_uuid: store_uuid,
        }).then(res => {
            var message = res.message
            wx.showModal({
                title: message.title,
                content: message.content,
                showCancel:false,
            })
        })
    },

    // 去自动获取二维码的地方
    toAutoShare(){
        wx.navigateTo({
            url: `/pages/auto_share/auto_share`
        })  
    },

    // nav 日志
    toLog() {
        wx.navigateTo({
            url: `/pages/log/log`
        })
    },

    // nav 参数修改
    toHost() {
        wx.navigateTo({
            url: `/pages/host/host`
        })
    },

    // 拨打客服号码
    toPhone(){
        wx.makePhoneCall({ phoneNumber: '13677730361'})
    },



    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },



    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})