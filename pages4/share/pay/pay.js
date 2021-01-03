// pages4/share/total.js
var app = getApp()
var util = require('../../../utils/util.js')
var dateBehaviors = require('../../../utils/date_behaviors.js')
var TAB_PAY = 0
var TAB_BACK = 1
Page({

    /**
     * 页面的初始数据
     */
    data: {
        CreatedAtMin: "" ,
        CreatedAtMax: "",
        yesterday:util.yesterday,
        today:util.today,

        TAB_PAY: TAB_PAY,
        TAB_BACK: TAB_BACK,
        TabCur: 0,
        SortMenu: [
            { id: TAB_PAY, name: "收款", },
            { id: TAB_BACK, name: "约定追回", },
            // { id: 2, name: "已处理", },
        ],

        payList: [],
        backList: [],

        sn:"",//顾客sn号

        shopID: "",
    },

    behaviors:[dateBehaviors],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({
            shopID: options.shopID,
            // CreatedAtMin: '2020-01-01',
            CreatedAtMin: util.today,
            CreatedAtMax: util.today,
        })

        var that = this
        that.onInit()

    },

    async onInit(){
        if(this.data.TabCur == 0)
            this.getPayList()
        else 
            this.getBackList()
    },

    async getPayList(){
        var res = await app.db4.shareGetPayList({
            ShopId: this.data.shopID,
            StartDate: this.data.CreatedAtMin,
            EndDate: this.data.CreatedAtMax,
            PageIndex: 1,
            PageSize:300,
            IsAll: true,
        })

        this.setData({
            payList: res.data.Items
        })
    },

    async getBackList(){
        var res = await app.db4.shareGetBackList({
            ShopId: this.data.shopID,
            StartDate: this.data.CreatedAtMin,
            EndDate: this.data.CreatedAtMax,
        })
        this.setData({
            backList: res.data.Items
        })
    },
    // 点击tab
    async tabSelect(e) {
        console.log(e)
        var id = e ? e.currentTarget.dataset.tab_id : this.data.TabCur
        this.setData({
            TabCur: id,
            // list: [],
        })
        this.refresh()
    },

    // 刷新
    refresh() {
        var id = this.data.TabCur
        switch (id) {
            case 0: this.getPayList(); break;
            case 1: this.getBackList(); break;
        }
    },

    toDetail(e){
        var out_order_no = e.currentTarget.dataset.out_order_no
        // return
        console.log(out_order_no)
        if (out_order_no)
            wx.navigateTo({
                url: '/pages4/share/detail/detail?out_order_no=' + out_order_no,
            })
        // else
        //     wx.showModal({
        //         title: ''',
        //         content: '',
        //     })
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
        return {
            path :"/pages/route/route"
        }
    }
})






    // async refresh(){
    //     var ShopId = false
    //     var sn = this.data.sn

    //     if (sn == 1041 || sn == 31097)
    //         ShopId = 77 // 南湖名都

    //     if (sn == 31127 || sn == 31128 || sn == 31135)
    //         ShopId = 78 // 富力万达文华

    //     if (sn == 31243 || sn == 31244 || sn == 31250)
    //         ShopId = 79 // 鑫伟万豪酒店

    //     if (sn == 31116)
    //         ShopId = 81 //红林大酒店

    //     if (sn == 31094)
    //         ShopId = 85 //乐壳青山园

    //   if (sn == 1041 || sn == 29487 || sn == 31464)
    //         ShopId = 86 //居酒屋


    //     if (ShopId){
    //         var res = await app.db.shareGetPayDiscount({
    //             ShopId: ShopId,
    //             PageIndex: 1,
    //             PageSize: 200,
    //             IsAll:true,
    //         })

    //         this.setData({
    //             payList: res.data.Items
    //         })
    //     }

    // },
