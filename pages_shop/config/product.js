// pages_shop/config/product.js
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

    //
    async onInit(){
        var res = await app.db.shopGetProduct()
        this.setData({
            list: res.data
        })
    },
})