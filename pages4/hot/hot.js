// pages4/hot/hot.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        longitude: 108.32754,
        latitude: 22.81521,

        scList:[
            {
                cover:"https://wm.51zfgx.com/images/thumbs/0002461_5_75.jpeg",
                des:'材料只有面粉、水、盐和酵母，不含油、糖以及任何添加剂，吃起来更放心。',
                icon: ["法棍","可颂","吐司"],
            },
            // {
            //     cover: "https://wm.51zfgx.com/images/thumbs/0002461_5_75.jpeg",
            //     des: '材料只有面粉、水、盐和酵母，不含油、糖以及任何添加剂，吃起来更放心。',
            //     icon: [],
            // },
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    toMall(){
        wx.navigateToMiniProgram({
            appId: 'wx4aedf8c9edf9fd72',
        })
    },

    toMenu() {
        wx.navigateToMiniProgram({
            appId: 'wx28be8489b7a36aaa',
        })
    },
    toBL(){
        wx.navigateToMiniProgram({
            appId: 'wx9e97c9fb1e0b26b4',
            path:"pages/menu/menu_sc",
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})