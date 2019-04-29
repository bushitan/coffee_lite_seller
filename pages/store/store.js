
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
    async getAuth() {
        var userInfo = wx.getStorageSync(API.USER_INFO, userInfo)
        var storeUUID = userInfo.store_uuid
        var isSeller = userInfo.store_uuid == '' ? false : true
        var isHost = userInfo.is_host

        var store = await db.storeInfo(storeUUID)

      
        GP.setData({
            store: store,
            userInfo: userInfo,
            storeUUID: storeUUID,
            isSeller: isSeller,
            isHost: isHost, 
        })
        GP.scanEvent("score","564146a2-67f5-11e9-989b-b83312f00bac")
    },

    // 扫码
    async scan(){

        wx.scanCode({
            success(res) {
                var list = res.result.split(",")
                var model = list[0]
                var customer_uuid = list[1]
                console.log(list)
                GP.scanEvent(model,customer_uuid)
            }
        })
    },

    async scanEvent(model, customer_uuid) {
        var result = await db.scanSeller({
            model: model,
            customer_uuid: customer_uuid,
        })
    },


    toLog() {
        wx.navigateTo({
            url: `/pages/log/log`
        })
    },

    toHost() {
        wx.navigateTo({
            url: `/pages/host/host`
        })
    },

    toPhone(){
        wx.makePhoneCall({ phoneNumber: '13677730361'})
    },



    // interval(){
    //     interval = setInterval(function () {
    //         db.refresh().then( res =>{
    //             console.log(res)
    //         })
    //     }, 4000)
    // },

    /**
     * 生命周期函数--监听页面卸载
     */
    // onUnload: function () {
    //     console.log("onUnload")
    //     clearInterval(interval)
    //     console.log(interval)
    // },

    // async getStoreData(options){
    //     var store_uuid = options.store_uuid
    //     store = await db.storeInfo(store_uuid)
    //     // console.log(list)
    //     data = await db.storeData(store_uuid)

    //     GP.setData({
    //         store: store,
    //         data: data
    //     })
    // },

    // toExchange(){
    //     wx.navigateTo({
    //         url: `/pages/exchange/exchange?store_uuid=${GP.data.store.uuid}`
    //     })
    // },
    // toHost() {
    //     wx.navigateTo({
    //         url: `/pages/share/share?store_uuid=${GP.data.store.uuid}`
    //     })
    // },
    // // 去到定位页面
    // toAddress() {
    //     wx.openLocation({
    //         name: GP.data.store.title,
    //         address: GP.data.store.address,
    //         latitude: GP.data.store.latitude,
    //         longitude: GP.data.store.longitude,
    //         scale: 18
    //     })

    // },


    // // 到集点二维码
    // toQR() {
    //     wx.navigateTo({
    //         url: '/pages/qrcode/qrcode?mode=score',
    //     })
    // },

    
    // toExchange() {
    //     wx.navigateTo({
    //         url: `/pages/exchange/exchang?store_uuid=${GP.data.store.store_uuid}`
    //     })
    // },

    // toStore(e) {
    //     var store_uuid = e.currentTarget.dataset.store_uuid
    //     wx.navigateTo({
    //         url: `/pages/store/store?store_uuid=${store_uuid}`,
    //     })
    // },

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