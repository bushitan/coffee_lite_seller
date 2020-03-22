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

        orderId: "",
        order: {
            ship_address: {},
        }, // 订单信息
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            orderId: options.orderId || ""
        })
        this.onInit()
    },

    async onInit() {
        // var order = await this.db.orderGen()
        var res = await app.db.orderGetDetail({
            OrderID: this.data.orderId
        })
        this.setData({
            order: res.data
        })
    },



    // 发顺丰
    async clickShipSF() {
        var orderId = this.data.orderId
        var res = await app.db.orderShippingSF({
            OrderID: orderId,
        })
    },
    //　堂食
    async clickShipStore() {
        var orderId = this.data.orderId
        var res = await app.db.orderShippingStore({
            OrderID: orderId, 
        })
    },

    // 取消订单
    async clickCancle(){
        console.log("取消订单")
    },
})