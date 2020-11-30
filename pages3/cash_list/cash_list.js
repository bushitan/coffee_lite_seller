// pages3/total/total.js
var app = getApp()
var TAB_PAY = 0
var TAB_BACK = 1


// PAYMENT_STATUS_PENDING = 10 // 待支付
// PAYMENT_STATUS_AUTHORIZED = 20 // 待支付
// PAYMENT_STATUS_PAID = 30 // 已经支付
// PAYMENT_STATUS_REFUND = 40 // 退款
// PAYMENT_STATUS_CANCEL = 50 // 取消支付
// PAYMENT_STATUS_REFUND_APPLY = 60 // 申请退款
Page({

    /**
     * 页面的初始数据
     */
    data: {
        PAYMENT_STATUS_PAID: 30, // 已经支付

        TAB_PAY: TAB_PAY,
        TAB_BACK: TAB_BACK,
        TabCur: TAB_PAY,
        SortMenu: [
            { id: TAB_PAY, name: "收银", },
            { id: TAB_BACK, name: "作废", },
            // { id: 2, name: "已处理", },
        ],
        shopID:"",

        list:[],
        showDetail:false,
        order:{},

        summary:{},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({
            shopID: options.shopID || ""
        })
        this.onInit()
    },
    
    onInit(){
        this.getOrderList()
        // this.getOrderSummary()
    },

    /**
     * @method 点单点总统计结果
     */
    // async getOrderSummary(){
    //     var res = await app.db3.productGetOrderSummary({
    //         ShopId: this.data.shopID,
    //         PayMethod:-1
    //     })
    //     this.setData({
    //         summary:res.data
    //     })
    //     console.log(res)
    // },

    async getOrderList(){
        var res = await app.db3.productGetOrderList({
            Page:1,
            Limit:100,
            ShopId: this.data.shopID,
            FilterStatus: this.data.TabCur == 0 ? 32 : 40,// 30已完成   40已取消（作废）
            // PayMethod: -1
        })


        this.setData({
            list: res.data
        })
    },

    toDetail(e){
        var index = e.currentTarget.dataset.index
        this.setData({
            showDetail:true,
            order: this.data.list[index]
        })
    },

    closeDetail(){
        this.setData({
            showDetail: false
        })
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