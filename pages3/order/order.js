// pages3/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order:{},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onInit()
    },

    onInit(){
        var orderObj = wx.getStorageSync("order")
        var order = []
        for (var i in orderObj) {
            order.push(orderObj[i])
            // TODO  计算总价
        }
        this.setData({
            order: order,
        })		
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})