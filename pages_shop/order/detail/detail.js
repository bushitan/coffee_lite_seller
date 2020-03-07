// pages_shop/order/order.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // StatusBar: this.StatusBar,
        // CustomBar: this.CustomBar,
        // TabbarBot: this.TabbarBot,

        orderID: "",
        order: {
            ship_address: {},
        }, // 订单信息
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            orderID: options.orderID || ""
        })
        this.onInit()
    },

    async onInit() {
        // var order = await this.db.orderGen()
        var res = await app.db.orderGetDetail({
            OrderId: this.data.orderID
        })
        this.setData({
            order: res.data
        })
    },

    // 取消订单
    clickCancle(){
        console.log("取消订单")
    },
})