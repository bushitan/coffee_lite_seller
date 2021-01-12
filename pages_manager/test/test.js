// pages_manager/test/test.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [
            { name: "店家", url: "/pages_manager/seller/seller", },
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    toNav(e){
        var index = e.currentTarget.dataset.index
        wx.navigateTo({
            url: this.data.list[index].url,
        })
    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})