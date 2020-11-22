// pages4/share/index/index.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[],
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

    // to支付列表
    toPayList(e) {
        var shopID = e.currentTarget.dataset.shop_id
        wx.navigateTo({
            url: '/pages4/share/pay/pay?shopID=' + shopID,
        })
    },

    // to点单列表
    toTotal(e) {
        var shopID = e.currentTarget.dataset.shop_id
        wx.navigateTo({
            url: '/pages3/order_list/order_list?shopID=' + shopID,
        })

    },

    // 点单
    toMenu(e){
        var shopID = e.currentTarget.dataset.shop_id
        wx.navigateTo({
            url: '/pages3/menu/menu?shopID=' + shopID,
        }) 
    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})