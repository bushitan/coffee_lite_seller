// pages4/share/total.js
var app = getApp()

var date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const d = date.getDate()
const t = date.getDate() + 1
var today = [year, month, d].join('-')
var tomorrow = [year, month, t].join('-')
var currentMonth = [year, month].join('-')
console.log(today)
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // TabCur: 0,
        // SortMenu: [
        //     { id: 0, name: "收款", },
        //     { id: 1, name: "约定追回", },
        //     // { id: 2, name: "已处理", },
        // ],
        CreatedAtMin: currentMonth,
        // CreatedAtMax: tomorrow,

        list: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        shopID: "",
        summary: {},
        bill: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({
            shopID: options.shopID || ""
        })
        this.onInit()
    },

    async onInit(){

        // var res = await app.db4.login({
        //     ShopId: 70
        // })

        // var res = await app.db4.shareStateByStore({
        //     ShopId:70
        // })

        var res = await app.db4.shareGetOrderSummary({
            ShopId: this.data.shopID,
            StartDate: "2020-10-1",
            EndDate: "2020-10-31",
        })
        this.setData({
            summary:res.data
        })


        var res = await app.db4.shareGetBillSummary({
            ShopId: this.data.shopID,
            StartDate: "2020-10-1",
            EndDate: "2020-10-31",
        })
        this.setData({
            bill: res.data
        })
        
    },

    async tabSelect(e) {
        console.log(e)
        var id = e ? e.currentTarget.dataset.tab_id : this.data.TabCur
        this.setData({
            TabCur: id,
            // list: [],
        })
        // switch (id) {
        //     case 0: var res = await app.db.orderGetList({
        //         Page: 1, Limit: 100, FilterStatus: app.db.SELLER_PENDING, CreatedAtMin: today
        //     }); break;
        //     case 1: var res = await app.db.orderGetList({
        //         Page: 1, Limit: 100, FilterStatus: app.db.SELLER_RIDING, CreatedAtMin: today
        //     }); break;
        //     case 2: var res = await app.db.orderGetList({
        //         Page: 1, Limit: 100, FilterStatus: app.db.SELLER_COMLETE, CreatedAtMin: today
        //     }); break;
        // }
        // this.setData({
        //     list: res.data
        // })
    },

    /**查看门店信息详情 */
    toStore() {
        wx.navigateTo({
            url: '/pages4/share/store/store',
        })
    },
    /**查看支付详情 */
    toPay() {
        wx.navigateTo({
            url: '/pages4/share/pay/pay',
        })
    },


    // 改变开始日期
    CreatedAtMinChange(e) {
        this.setData({ CreatedAtMin: e.detail.value })
        this.onInit()
    },
    // // 改变结束日期
    // CreatedAtMaxChange(e) {
    //     this.setData({ CreatedAtMax: e.detail.value })
    //     this.onInit()
    // },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log("bottom")
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})