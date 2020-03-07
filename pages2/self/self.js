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

    /**
     * 扫码 -- 发放集点
     */
    async scanScore() {
        app.db.sellerScanScore({
            customerUUID : "",
            storeId : "",
            timestamp : "",
        })
     },
    /**
     * 扫码 -- 兑换
     */
    scanScore() {

     },

    /*****路由*****/
    toRule(){
        wx.navigateTo({
            url: '/pages2/rule_edt/rule_edt',
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})