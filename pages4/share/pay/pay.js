// pages4/share/total.js
var app = getApp()
var TAB_PAY = 0
var TAB_BACK = 1
Page({

    /**
     * 页面的初始数据
     */
    data: {
        TAB_PAY: TAB_PAY,
        TAB_BACK: TAB_BACK,
        TabCur: TAB_PAY,
        SortMenu: [
            { id: TAB_PAY, name: "收款", },
            { id: TAB_BACK, name: "约定追回", },
            // { id: 2, name: "已处理", },
        ],

        payList: [],
        backList: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onInit()
    },

    async onInit(){

        // var res = await app.db4.login({
        //     ShopId: 70
        // })

        // var res = await app.db4.shareStateByStore({
        //     ShopId:70
        // })

        var res = await app.db.shareGetPayDiscount({
            ShopId: 70,
            PageIndex:1,
            PageSize:100,
        })

        this.setData({
            payList:res.data.Items
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
    toDetail(){
        wx.navigateTo({
            url: '/pages4/share/detail/detail',
        })
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