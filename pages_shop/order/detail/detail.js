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

        STORE_TAKE_TYPE_WM: app.db.STORE_TAKE_TYPE_WM, // 外卖
        STORE_TAKE_TYPE_ZQ: app.db.STORE_TAKE_TYPE_ZQ, // 到店自取
        STORE_TAKE_TYPE_TS: app.db.STORE_TAKE_TYPE_TS, // 堂食
        
        orderId: "",
        order: {
            ship_address: {},
        }, // 订单信息
        riderInfo:{
            rider_name:'',
            rider_phone:'',
        },
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
        var order = res.data
        this.setData({
            order: order 
        })

        // console.log(res.data.shipping_status_code)
        if (order.shipping_status_code == app.db.SHIP_STATUS_ING) {
            // var res = await app.db.orderRiderInfo({ order_id: order.id })
            // this.setData({ riderInfo:res.data })
            // console.log(res.data)
            var res = await app.db.orderRiderPosition({ order_id: order.id })
            this.setData({ riderInfo: res.data })
            // console.log(res.data)
            // var res = await app.db.orderRiderH5({ order_id: order.id })
            // console.log(res.data)
        }
    },



    // 发顺丰
    async clickShipSF() {
        var res = await app.db.orderShippingSF({
            orderId: this.data.orderId,
        })
    },
    //　堂食
    async clickShipStore() {
        var res = await app.db.orderShippingStore({
            orderId: this.data.orderId, 
        })
    },

    // 取消订单
    async clickCancle(){
        console.log("退款")

        var res = await app.db.orderConfirmrefund({
            orderId: this.data.orderId,
        })
        wx.showModal({ title: res.msg, showCancel:false})

    },

    takeRiderPhone(){
        wx.makePhoneCall({
            phoneNumber: this.data.riderInfo.rider_phone,
        })
    },
})