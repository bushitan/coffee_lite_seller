// pages_my/my/my.js
var API = require('../../api/api.js')
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],

    },

    onLoad: function (options) {
        this.onInit()
    },

    async onInit() {
        var res = await app.db4.login()

        var res = await app.db4.shareGetStoreList()
        var list = res.data
        list[0].showDetail = true
        this.setData({
            list: res.data
        })
    },

    /**`
     * @method 切换门店的开关
     */
    switchDetail(e){
        var index = e.currentTarget.dataset.index
        var list = this.data.list
        list[index].showDetail = !list[index].showDetail
        this.setData({
            list: list
        })
    },


    /****路由****/
    toScoreGeo(){
        var userInfo = wx.getStorageSync(API.USER_INFO, userInfo)
        // if (!userInfo.is_host) {
        //     wx.showModal({
        //         title: '权限不足',
        //         content: '请联系店主查看',
        //     })
        //     return
        // }
        wx.navigateTo({
            url: '/pages_my/score_geo/score_geo?store_uuid=' + userInfo.store_uuid,
        })
    },

    // 小程序订单列表
    toLiteOrderList(){
        wx.navigateTo({
            url: '/pages_shop/order/list/list',
        })
    },

    // 收银下单列表
    toCashList(e) {
        var shop_id = e.currentTarget.dataset.shop_id
        wx.navigateTo({
            url: '/pages3/cash_list/cash_list?shopID=' + shop_id,
        })
    },

    // 收银下单统计
    toCashStat(e) {
        var shop_id = e.currentTarget.dataset.shop_id
        wx.navigateTo({
            url: '/pages3/cash_stat/cash_stat?shopID=' + shop_id,
        })
    },

    toPayList(e) {
        var shop_id = e.currentTarget.dataset.shop_id
        wx.navigateTo({
            url: '/pages4/share/pay/pay?shopID=' + shop_id,
        })
    },
    toPayStat(e) {
        var shop_id = e.currentTarget.dataset.shop_id
        wx.navigateTo({
            url: '/pages4/share/total/total?shopID=' + shop_id,
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})