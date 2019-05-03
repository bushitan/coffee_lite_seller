// pages/exchange/exchange.js
var GP
var API = require('../../api/api.js')
var DB = require('../../api/db.js')
var db = new DB()
var STORE_MODE_NORMAL = 1 //普通
var STORE_MODE_SHARE = 2 //分享
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isLoading: true,
        userInfo: {},
        storeInfo: {},
        radioItems: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this

        GP.getUserInfo()

    },

    getUserInfo(){
        var userInfo = wx.getStorageSync(API.USER_INFO, userInfo)
        var storeUUID = userInfo.store_uuid

        db.storeInfo(storeUUID).then(storeInfo => {
            GP.setData({
                isLoading: false,
                userInfo: userInfo,
                storeInfo: storeInfo,
                radioItems: [
                    {
                        name: '普通模式', value: STORE_MODE_NORMAL,
                        checked: storeInfo.mode == STORE_MODE_NORMAL ? true : false
                    },
                    {
                        name: '分享模式', value: STORE_MODE_SHARE,
                        checked: storeInfo.mode == STORE_MODE_SHARE ? true : false
                    }
                ],
            })
        })
    },

    // 模式选择
    radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value);

        var radioItems = this.data.radioItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
            radioItems[i].checked = radioItems[i].value == e.detail.value;
        }

        this.setData({
            radioItems: radioItems
        });
    },


    formSubmit(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        var data = e.detail.value
        data["store_uuid"] = GP.data.storeInfo.uuid
        db.storeUpdate(data).then(store => {
            var pages = getCurrentPages()
            var prevPage = pages[pages.length - 2]
            prevPage.setData({
                store: store
            })
            wx.showModal({
                title: '修改成功',
                showCancel: false,
                confirmText: "返回",
                success() {
                    wx.navigateBack({

                    })
                },

            })
        })
    },
    formReset() {
        console.log('form发生了reset事件')
    },




    // getStoreDetail(options) {
    //     var pages = getCurrentPages()
    //     var prevPage = pages[pages.length - 2]
    //     var userInfo = prevPage.data.userInfo
    //     GP.setData({
    //         isLoading: false,
    //         detailList: detailList,
    //         store: store,
    //     })
    // },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})