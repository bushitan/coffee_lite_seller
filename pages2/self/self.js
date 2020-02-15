// pages2/self/self.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

        userInfo: {
            id: '202232',
            name: 'fengef',
            allScoreNum: 1,
            allPrizeNum: 1,
            allStoreNum: 1,
        },

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /*****路由*****/
    toRule(){
        wx.redirectTo({
            url: '/pages2/rule_edt/rule_edt',
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})