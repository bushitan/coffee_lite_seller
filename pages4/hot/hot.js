// pages4/hot/hot.js

var API = require('../../api/api.js')
var DB = require('../../api/db.js')
var db = new DB()
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
    
    /**去电商小程序 */
    toMall(){
        wx.navigateToMiniProgram({
            appId: 'wx4aedf8c9edf9fd72',
        })
    },

    /**去点单小程序 */
    toMenu() {
        wx.navigateToMiniProgram({
            appId: 'wx28be8489b7a36aaa',
        })
    },

    /**去点单小程序 */
    async toCustomerGeo(){

        var userInfo = wx.getStorageSync(API.USER_INFO, userInfo)
        var storeUUID = userInfo.store_uuid
        var store = await db.storeInfo(storeUUID)
        
        // GP.setData({
        //     store: store,
        //     userInfo: userInfo,
        //     storeUUID: storeUUID,
        //     isSeller: isSeller,
        //     isHost: isHost,
        // })
        wx.navigateToMiniProgram({
            appId: 'wxd19bbe9cb3b293b6',
            path: "pages3/geo/geo?store_uuid=" + storeUUID + "&longitude=" + store.longitude + "&latitude=" + store.latitude ,
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