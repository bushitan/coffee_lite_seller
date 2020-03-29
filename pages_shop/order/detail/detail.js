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


        ORDER_STATUS_PENDING: app.db.ORDER_STATUS_PENDING, // 订单待处理
        ORDER_STATUS_PROCESSING: app.db.ORDER_STATUS_PROCESSING, // 订单处理中
        ORDER_STATUS_COMPLETE: app.db.ORDER_STATUS_COMPLETE, // 订单已完成
        ORDER_STATUS_CANCEL: app.db.ORDER_STATUS_CANCEL ,// 订单已取消

        SHIP_STATUS_NOT_REQUIRED : 10, //不需要配送
        SHIP_STATUS_NOT_YET : 20, //未配送
        SHIP_STATUS_ING: 30, //配送中
        
        SHIP_STATUS_CANCEL: app.db.SHIP_STATUS_CANCEL,

        PAYMENT_STATUS_REFUND : app.db.PAYMENT_STATUS_REFUND,
        PAYMENT_STATUS_REFUND_APPLY: app.db.PAYMENT_STATUS_REFUND_APPLY,
        
        orderId: "",
        order: {
            ship_address: {},
        }, // 订单信息
        riderInfo:{
            rider_name:'',
            rider_phone:'',
        },

        showReason:false,



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

    // 提示了才返回
    backConfirm(res){
        var that = this
        wx.showModal({
            title: res.msg,
            showCancel:false,
            success() {
                if (res.code == 0){
                    that.back()
                }
            },
        })
    },

    // 直接返回
    back(){
        var page = getCurrentPages()
        var prePage = page[page.length -2 ]
        prePage.onInit()   // 刷新
        wx.navigateBack({}) //后退
    },

    /*********逻辑*************/

    // 接单 发顺丰
    async clickShipSF(e) {
        if (await app.showModal(e.currentTarget.dataset.name) == false) return 

        var res = await app.db.orderShippingSF({
            orderId: this.data.orderId,
        })
        this.backConfirm(res)
    },
    // 接单　自配送 | 到店自取 | 堂食
    async clickShipStore(e) {
        if (await app.showModal(e.currentTarget.dataset.name) == false) return 

        var res = await app.db.orderShippingStore({
            orderId: this.data.orderId, 
        })
        this.backConfirm(res)
    },


    /***********退款**************/
    // 拒单
    async clickReject(e) {
        if (await app.showModal(e.currentTarget.dataset.name) == false) return 

        var res = await app.db.orderSellerReject({
            orderId: this.data.orderId,
        })
        this.backConfirm(res)
    },
    // 确认退款
    async clickConfirmrefund() {
        if (await app.showModal(e.currentTarget.dataset.name) == false) return 

        var res = await app.db.orderConfirmrefund({
            orderId: this.data.orderId,
        })
        this.backConfirm(res)
    },   



    /***********顺风取消**************/
    // 取消配送
    async clickSFCanceld(e) {
        if (await app.showModal(e.currentTarget.dataset.name) == false) return

        this.setData({ showReason: true })
    },   
    // 确定取消
    async formConfirm(e) {
        var that = this
        var formData = e.detail.value
        console.log(formData)
        var reason = formData.reason || ""
        if (reason == "") {
            wx.showToast({
                title: '请输入原因',
                icon: "loading",
                duration: 1000,

            })
            return
        }
        var res = await app.db.orderSFCancel({
            reason: reason,
            OrderId: this.data.orderId,
        })
        wx.showModal({ title: res.msg, showCancel: false })
        this.formCancel()
        this.backConfirm(res)
        // wx.navigateBack({})
    },
    // 关闭reason的dialog
    formCancel() {
        this.setData({
            showReason: false
        })
    },


    /***************强制动作*************/

    // 强制退款
    async clickForcerFund(e) {
        if (await app.showModal(e.currentTarget.dataset.name) == false) return

        var res = await app.db.orderForcerFund({
            OrderId: this.data.orderId,
        })
        this.backConfirm(res)
    },   

    // 订单作废
    async clickVoide(e) {
        if (await app.showModal(e.currentTarget.dataset.name) == false) return

        var res = await app.db.orderVoide({
            OrderId: this.data.orderId,
        })
        this.backConfirm(res)
    },   

    // 强制完成订单 | 顺风点单自配送
    async clickOver(e) {
        if (await app.showModal(e.currentTarget.dataset.name) == false) return

        var res = await app.db.orderOver({
            OrderId: this.data.orderId,
        })
        this.backConfirm(res)
    },   

    // 拨打用户电话
    takeRiderPhone(){
        wx.makePhoneCall({
            phoneNumber: this.data.riderInfo.rider_phone,
        })
    },

})