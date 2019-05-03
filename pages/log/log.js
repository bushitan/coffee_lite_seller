// pages/exchange/exchange.js
var GP
var API = require('../../api/api.js')
var DB = require('../../api/db.js')
var db = new DB()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        menu: ['积分', '奖品', '兑换券'],
        isLoading: true,
        prizeList: [],
        pageNum:1,
        range:10,
        showModel:0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        GP.getLog("score")
    },

    getLog(model){
        db.storeDataSeller({
            model: model,
            page_num: GP.data.pageNum,
            range: GP.data.range,
        }).then(dataList =>{
            GP.setData({
                isLoading: false,
                detailList: dataList,
            })
        })
    },
    

    click(e){
        var index = e.detail
        console.log(index)
        var model
        if (index == 0) model = "score"
        else if (index == 1) model = "prize"
        else model = "share"
        GP.setData({
            showModel:index,
        })
        GP.getLog(model)
    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})