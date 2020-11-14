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
        var res = await app.db4.login()

        var res = await app.db4.shareGetStoreList()
        this.setData({
            list : res.data
        })
    },
    toMenu(e){
        var shopID = e.currentTarget.dataset.shop_id
        wx.navigateTo({
            url: '/pages3/menu/menu?shopID=' + shopID,
        }) 
    },
    toTotal(e) {
        var shopID = e.currentTarget.dataset.shop_id
        wx.navigateTo({
            url: '/pages4/share/total/total?shopID=' + shopID,
        }) 

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})