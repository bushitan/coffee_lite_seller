// pages_pad/pad/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    toPadMenuSeeking(){

        wx.navigateTo({ url: '/pages_pad/pad/menu/menu?shopID=15', })   // 品牌专栏
    },

    toPadMenuHi(){

        wx.navigateTo({ url: '/pages_pad/pad/menu/menu?shopID=99', })   // 品牌专栏
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})