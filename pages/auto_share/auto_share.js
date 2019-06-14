// pages/exchange/exchange.js
var GP
var API = require('../../api/api.js')
var DB = require('../../api/db.js')
var db = new DB()
const BASE64 = require('../../utils/base64.js')

var STORE_MODE_NORMAL = 1 //普通
var STORE_MODE_SHARE = 2 //分享
var VALID_RANGE = 60000  //二维码存活时间，30秒
var interval
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isLoading: true,
        // 二维码信息
        qrBase64:"",
        qrContent:"",

        // 分享券
        detailList:[], 
        pageNum:0,
        range:5,
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log("onUnload")
        clearInterval(interval)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this

        GP.onInit()
    },

    // 初始化
    onInit() {
        GP.getLog("share")
        GP.updateQR()
        var i = 0
        interval = setInterval(function () {
            GP.getLog("share") // 10秒刷新一次数据

            i++
            if (i % 6 == 0)  // 60秒刷新一次二维码，
                GP.updateQR()
        }, 10000) 

        // GP.createQR()
    },

    // 更新菊花码二维码
    updateQR(){
        db.storeAutoShareQR().then(res=>{
            GP.setData({
                qrContent: API.URL_WXA_CODE_UNLIMIT + res.qr
            })
        })
    },


    // 创建二维码
    createQR(){

        var userInfo = wx.getStorageSync(API.USER_INFO)
        var sellerUUID = wx.getStorageSync(API.UUID)
        var storeUUID = userInfo.store_uuid

        var obj = { 
            "mode": "auto_share", 
            "store_uuid": storeUUID, 
            "seller_uuid": sellerUUID, 
            "dead_time": new Date().getTime() + VALID_RANGE
        }

        console.log(JSON.stringify(obj))
        console.log(BASE64.encode(JSON.stringify(obj)))

        GP.setData({
            qrBase64: BASE64.encode(JSON.stringify(obj))
        })
    },

    getLog(model) {
        db.storeDataSeller({
            model: model,
            page_num: GP.data.pageNum,
            range: GP.data.range,
        }).then(dataList => {
            GP.setData({
                isLoading: false,
                detailList: dataList,
            })
        })
    },

    //  删除分享券
    deleteShare(e) {
        var share_uuid = e.currentTarget.dataset.share_uuid
        db.shareDelete(share_uuid).then(res => {
            wx.showModal({
                title: res.message.title,
                content: res.message.content,
                showCancel: false,
            })
            GP.getLog("share")
        })
    },


})
