// pages4/mall/index/index.js

var swiperList = []
for (var i = 1; i < 16; i++)
    swiperList.push("cloud://sjshop-21at0.736a-sjshop-21at0-1301522941/mall_swiper/" + i + ".png")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperList: swiperList
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    preview(e){
        var index = e.currentTarget.dataset.index 
        var swiperList = this.data.swiperList
        wx.previewImage({
            current: swiperList[index],
            urls: swiperList,
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

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
        return {
            title: res.title || '小杯子便利店',
            path: res.path || '/pages/route/route',

        }
    }
})