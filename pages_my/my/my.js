// pages_my/my/my.js
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

    /**
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})