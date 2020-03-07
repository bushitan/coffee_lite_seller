// pages2/stats_edt/stats_edt.js
var app = getApp()
var pre 
Page({

    /**
     * 页面的初始数据
     */
    data: {

        TabCur: 0,
        scrollLeft: 0,
        tabber:["数据统计","顾客查询"],

        scoreList: [
            { name: "集点卡", },
            { name: "海报", },
            { name: "面对面扫码", },
            { name: "总计", },
        ]  ,
        
        prizeList: [
            { name: "seeking员工1", },
            { name: "seeking员工2", },
            { name: "seeking员工3", },
            { name: "总计", },
        ] , 





        inputKey: "", //搜索关键字
        showCunstomer:false,
        userInfo:{
            name:"丰丰",
            logo:"/images/2013/swiper.jpg",
        },
        userScoreList:[
            { name: "扫码集点", createTime: "2020-2-15" },
            { name: "海报集点", createTime: "2020-2-15" },
        ],
        userPrizeCount:2,
        userPrizeList: [
            { name: "兑换", createTime: "2020-2-15" },
            { name: "兑换", createTime: "2020-2-15" },
        ],


    },

    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.onInit()
    },


    async onInit(){
        pre = app.getPrePage()
        var storeUUID = pre.data.store.storeUUID
        // var scoreStats = await app.db.storeStat({ storeUUID: storeUUID })
        // var prizeStats = await app.db.storeStatcate({ storeUUID: storeUUID })
        var scoreStats = await app.db.storeStatcate({ storeUUID: storeUUID })
        this.setData({
            scoreStats: scoreStats
        })
    },










    back() {
        wx.redirectTo({
            url: '/pages2/self/self',
        })
    },

    // 输入搜索内容
    inputSearchText(e) {
        let key = e.detail.value.toLowerCase();
        this.setData({inputKey:key})
    },
    // 搜索
    search(){
        // 请求搜索结果
        // app.db.

        // 搜索成功
        this.setData({
            showCunstomer:true,
        })
    },
})