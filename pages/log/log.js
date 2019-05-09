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
        menu: ['集点', '福利', '福利分享券'],
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

        var page = getCurrentPages()
        var prePage = page[page.length - 2]
        GP.setData({
            store: prePage.data.store,
            isHost: prePage.data.isHost,
        })
        GP.getLog("score")
        GP.getHostData()
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

    getHostData() {
        // var page = getCurrentPages()
        // var prePage = page[page.length-2]
        // console.log(prePage.data.store.uuid)
        db.storeHostDataSeller({
            store_uuid: GP.data.store.uuid
        }).then(dataList => {
            GP.setData({
                hostData: dataList
            })
           console.log(dataList)
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