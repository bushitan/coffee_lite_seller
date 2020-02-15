// pages/user/user.js
var GP
var API = require('../../api/api.js')
var DB = require('../../api/db.js')
var db = new DB()


Page({

    /**
     * 页面的初始数据
     */
    data: {
        isShowLogin:false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        wx.showLoading({
            title: '加载中...',
        }) 
        
        GP.login(options)
    },    

    // 登陆获取用户信息
    login(options){
        // api login
        db.login().then(userInfo =>{
            wx.setStorageSync(API.UUID, userInfo.uuid)
            wx.setStorageSync(API.OPEN_ID, userInfo.wx_openid)
            wx.setStorageSync(API.USER_INFO, userInfo)
            GP.setData({
                options:options
            })
            wx.hideLoading()

            // 直接跳转store
            GP.nav()
            
        })
    },

    nav(){
        // return
        var options = GP.data.options
        wx.redirectTo({
            url: `/pages/store/store`,
        })
    },



    // 检测是否用户授权
    checkHasAuth() {
        return new Promise((resolve, reject) => {
            wx.getSetting({
                success(res) {
                    console.log(res.authSetting)
                    resolve(res.authSetting.hasOwnProperty("scope.userInfo"))
                }
            })
        })
    },


    //获取\更新用户头像信息
    onGetUserInfo: function (e) {
        if (!this.logged && e.detail.userInfo) {
            db.userUpdate(e.detail.userInfo).then( res => {
                GP.nav()
            })
        }
    },



    /**
     * @method 测试上传用户信息
     */
    testGetUserInfo: function (e) {
        // db.errorTest(e.detail.userInfo).then(res => {
        //     console.log(res)
        // })
        db.userUpdate(e.detail.userInfo).then(res => {
            console.log(res)
        })
    },

})