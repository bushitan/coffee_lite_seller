 // pages2/self/self.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isHost: true,
        isSeller: true,
        daystats: { totalScore: 0, totalPrize:0}, // 今日数据

        store:{},
        userInfo: {
            id: '202232',
            name: 'fengef',
            allScoreNum: 1,
            allPrizeNum: 1,
            allStoreNum: 1,
        },

        // 默认经纬度
        longitude: 108.32754,
        latitude: 22.81521,
        mapMarkers:[],

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onInit()
    },
    onShow(){
        // if (this.data.isSeller) {
        //    app.db.storeDaystat({storeUUID:this.data.store.storeUUID}).then(daystats =>{
        //        this.setData({daystats: daystats})
        //    })
        // }    
        console.log(getCurrentPages())
    },

    // 初始化
    async onInit(){
        var res = await app.db.sysSellerCheckStoreOwner()
        this.setData({
            isHost: res.isHost,
            isSeller: res.isSeller,

        })

        if(res.isSeller == false)
            return

        var store = await app.db.storeSellerGetData()
        store.startTime = store.startTime.split(" ")[0]
        store.endTime = store.endTime.split(" ")[0]
        this.setData({ store:store })
        
        app.db.storeDaystat({ storeUUID: store.storeUUID }).then(daystats => {
            this.setData({ daystats: daystats })
        })
        console.log(res)
    },


    /***************二维码扫描**************/
    /**
     * 扫码 -- 1 发放集点
     */
    scanScore(e) {
        var that = this
        wx.scanCode({
            success(res) {
                var list = res.result.split(",")
                var model = list[0] || ""
                var customerUUID = list[1] || ""
                var storeID = list[2] || ""
                var timestamp = list[3] || ""
                if (model != "score") {  // 验证是否积分码
                    wx.showModal({title: '您扫的不是集点码',showCancel: false,}); return; 
                }                
                if (storeID != that.data.store.storeID) {  // 验证store_uuid是否当前店铺
                    wx.showModal({ title: '您扫的不是本店铺的二维码', showCancel: false, }); return                 
                }
                app.db.sellerScanScore({
                    customerUUID: customerUUID,
                    storeId: storeID,
                    timestamp: timestamp,
                })
            }
        })
     },

    /**
     * 扫码 -- 2 兑换
     */
    scanPrize() {
        var that = this
        wx.scanCode({
            success(res) {
                var list = res.result.split(",")
                var model = list[0] || ""
                var customerUUID = list[1] || ""
                var storeID = list[2] || ""
                var timestamp = list[3] || ""
                if (model != "prize") {  // 验证是否积分码
                    wx.showModal({ title: '您扫的不是兑换码', showCancel: false, }); return;
                }
                if (storeID != that.data.store.storeID) {  // 验证store_uuid是否当前店铺
                    wx.showModal({ title: '您扫的不是本店铺的二维码', showCancel: false, }); return;
                }
                app.db.sellerScanPrize({
                    customerUUID: customerUUID,
                    storeId: storeID,
                    timestamp: timestamp,
                })
            }
        })
    },

    /*****路由*****/
    // 到规则详情
    toRule(){
        wx.navigateTo({
            url: '/pages2/rule_edt/rule_edt',
        })
    },
    // 到数据统计详情
    toStatsEdt() {
        wx.navigateTo({
            url: '/pages2/stats_edt/stats_edt',
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})