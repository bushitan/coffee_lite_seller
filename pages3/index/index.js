// pages4/share/index/index.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[],
        currentIndex:0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onInit()
    },

    async onInit(){
        var res = await app.db3.productSellerGetToken()
        var res = await app.db3.productGetStoreList()
        this.setData({
            list : res.data
        })


    },

    // 获取门店的数据
    getShopData(){},

    changeShop(e){
        this.setData({
            currentIndex : parseInt(e.detail.value)
        })
        this.getShopData()
    },

    // to点单列表
    toTotal(e) {  wx.navigateTo({ url: '/pages3/order_list/order_list?shopID=' + this.data.list[ this.data.currentIndex].Id }) },


    /***************店员下单收银*************/
    // 点单
    toMenu(e) { wx.navigateTo({ url: '/pages3/menu/menu?shopID=' + this.data.list[this.data.currentIndex].Id }) },
    // 收银下单列表
    toCashList(e) { wx.navigateTo({ url: '/pages3/cash_list/cash_list?shopID=' + this.data.list[this.data.currentIndex].Id }) },

    // 收银下单统计
    toCashStat(e) { wx.navigateTo({ url: '/pages3/cash_stat/cash_stat?shopID=' + this.data.list[this.data.currentIndex].Id }) },

    /***************嗨翻节核销订单*************/
    // 嗨翻节扫码
    toHiScan(){
        wx.scanCode({
            success:res=>{
                console.log(res.result)
                this.checkHiOrder(res.result)
            },
        })
    },
    async checkHiOrder(customerGUID){
        var res = await app.db3.productScanOrderID({
            customerGUID: customerGUID,
            sellerSN: wx.getStorageSync(app.db3.KEY_SN) 
        })

        wx.showModal({ title: res.msg, showCancel: false, })
        // if (res.code == 0)
        //     wx.showModal({ title: res.msg, showCancel: false, })
        // if (res.code == -1)
        //     wx.showModal({ title: , showCancel: false, })
    },

    // 嗨翻节扫码
    toHiOrderList(e) { wx.navigateTo({ url: '/pages3/hi_order/hi_order?shopID=' + this.data.list[this.data.currentIndex].Id }) },

    /***************顾客自助点单*************/
    // 小程序接单
    toLiteOrder(e) { wx.navigateTo({ url: '/pages_shop/admin/admin?shopID=' + this.data.list[this.data.currentIndex].Id }) },
    // 查询订单
    toLiteOrderList() { wx.navigateTo({ url: '/pages_shop/order/list/list?shopID=' + this.data.list[this.data.currentIndex].Id }) },

    /***************顾客扫码支付*************/
    //支付列表
    toPayList(e) { wx.navigateTo({ url: '/pages4/share/pay/pay?shopID=' + this.data.list[this.data.currentIndex].Id }) },
    // 支付统计
    toPayOrderStat(e) { wx.navigateTo({ url: '/pages4/share/total/total?type=order&shopID=' + this.data.list[this.data.currentIndex].Id }) },

    /***************汇总统计*************/

    // 支付对账单
    toBillStat(e) {   wx.navigateTo({ url: '/pages4/share/total/total?type=bill&shopID=' + this.data.list[this.data.currentIndex].Id   }) },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})