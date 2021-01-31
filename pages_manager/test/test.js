// pages_manager/test/test.js
var app = getApp()
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
    onReady(){
        this.onInit()
    },

    toNav(e){
        var index = e.currentTarget.dataset.index
        wx.navigateTo({
            url: this.data.list[index].url,
        })
    },

    async onInit(){
        // var res = await wx.getAccountInfoSync()
        // console.log(res.miniProgram.appId)

        console.log( await  app.dbm.admin.org.login() )
        
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})