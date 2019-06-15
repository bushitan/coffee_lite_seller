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
        model:"score",
        newList:[], //新增加的数据
        detailList: [], //展示的总列表
        pageNum:0,
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
        GP.getLog()
        GP.getHostData()
    },

    // 获取更多
    getMore(){
        
    },
    // 获取详情列表
    getLog(){
        GP.setData({ isLoading: true})
        db.storeDataSeller({
            model: GP.data.model,
            page_num: GP.data.pageNum,
            range: GP.data.range,
        }).then(dataList =>{

            GP.setData({
                isLoading: false,
                newList: dataList,
                detailList: GP.data.detailList.concat(dataList),
                pageNum: dataList < 10 ? GP.data.pageNum : GP.data.pageNum + 1,
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
    reset(){
        GP.setData({
            isLoading: true,
            detailList: [],
            pageNum: 0,
            range: 10,
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
            model:model
        })
        GP.reset()
        GP.getLog()
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
            GP.setDeleteStatus(share_uuid)
        })
    },

    setDeleteStatus(share_uuid){
        var detailList = GP.data.detailList
        for (var i = 0; i < detailList.length;i++)
            if (share_uuid == detailList[i].uuid)
                detailList[i].is_delete = true
            
        GP.setData({
            detailList: detailList
        })
    },


})