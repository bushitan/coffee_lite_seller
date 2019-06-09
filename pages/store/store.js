
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
        MODE_SCORE: 1,
        MODE_SHARE: 2,
        MODE_DOUBLE: 3,
        store: { mode:1},
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
            
            var title = store.title || "分享集点卡"
            wx.setNavigationBarTitle({
                title: title  + '商户版',
            })

            

            // GP.scanEvent("score", "564146a2-67f5-11e9-989b-b83312f00bac")
        })

    },


    /*******新版本扫码 */
    // 基础扫码函数
    scanResult(){
        return new Promise((resolve, reject) => {
            wx.scanCode({
                success(res) {
                    var list = res.result.split(",")
                    var scan = {
                        model: list[0] || "",
                        customer_uuid: list[1] || "",
                        store_uuid: list[2] || "",
                    }
                    // 验证store_uuid是否当前店铺
                    if (scan.store_uuid != GP.data.store.uuid){
                        GP.scanErrorDialog("本店铺的二维码")     
                        return
                    }
                    // 扫码完毕
                    resolve(scan)
                }
            })
        })
    },

    // 集点
    addScore() {
        GP.scanResult().then(scan => {
            if (scan.model != "score") GP.scanErrorDialog("集点码")     
            console.log('in addScore',scan.model, scan.customer_uuid, scan.store_uuid)
            db.scanSeller(API.SCAN_SCORE_SELLER,scan.customer_uuid,scan.store_uuid)
        })
    },

    // 发分享券
    //TODO 判断是否扫码到分享券
    addShare() {
        GP.scanResult().then(scan => {
            if (scan.model != "score") GP.scanErrorDialog("集点码")                
            console.log('in addShare',scan.model, scan.customer_uuid, scan.store_uuid)
            db.scanSeller(API.SCAN_SHARE_SELLER,scan.customer_uuid,scan.store_uuid)
        })
    },

    // 兑换礼物
    addPrize() {
        GP.scanResult().then(scan => {
            if (scan.model != "prize") GP.scanErrorDialog("福利兑换码")   
            console.log('in addPrize',scan.model, scan.customer_uuid, scan.store_uuid)
            db.scanSeller(API.SCAN_PRIZE_SELLER,scan.customer_uuid,scan.store_uuid)
        })
    },

    scanErrorDialog(msg){
        wx.showModal({
            title: '扫码出错',
            content: `您扫的不是${msg}`,
            showCancel: false,
            confirmText: "重新扫描",
        })
    },


    // /*******旧版本扫码 */
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
        db.scanSellerOld({
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


    /***********路由************/

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
    toRoute() {
        wx.redirectTo({
            url: '/pages/route/route',
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