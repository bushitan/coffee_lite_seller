// pages/list/list.js
var GP
var API = require('../../api/api.js')
var DB = require('../../api/db.js')
var db = new DB()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[],
        isSeller:false,
        isHost : false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        GP.getAuth()
    },

    async getAuth(){
        var userInfo = wx.setStorageSync(API.USER_INFO, userInfo)
        var storeUUID = userInfo.store_uuid
        var isSeller = userInfo.store_uuid == ''? false : true
        var isHost = userInfo.is_host
        GP.setData({
            userInfo: userInfo,
            storeUUID: storeUUID,
            isSeller: isSeller,
            isHost: isHost,S                
        })
    //    list = await db.storeList()
    //    console.log(list)
    //    GP.setData({
    //        list: list
    //    })
    },


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