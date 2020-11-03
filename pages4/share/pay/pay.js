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
        backList: [1,],

        sn:"",//顾客sn号

        shopID: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({
            shopID: options.shopID
        })

        var that = this
        that.onInit()

        // interval = setInterval(function () {
        //     that.refresh()
        // }, 15000)
    },

    async onInit(){
        this.getPayList()
        // var res = await app.db4.login({
        //     ShopId: 70
        // })

        // var res = await app.db4.shareStateByStore({
        //     ShopId:70
        // })
        // app.db.shopLogin().then(res => {
        //     wx.setNavigationBarTitle({
        //         title: '商户ID:' + res.data.sn,
        //     })
        //     this.setData({
        //         sn:res.data.sn
        //     })

        //     this.refresh()
        // })
    },

    async getPayList(){
        var res = await app.db4.shareGetPayList({
            ShopId: this.data.shopID,
            PageIndex: 1,
            PageSize: 200,
            IsAll: true,
        })

        this.setData({
            payList: res.data.Items
        })
    },




    async refresh(){
        var ShopId = false
        var sn = this.data.sn

        if (sn == 1041 || sn == 31097)
            ShopId = 77 // 南湖名都

        if (sn == 31127 || sn == 31128 || sn == 31135)
            ShopId = 78 // 富力万达文华

        if (sn == 31243 || sn == 31244 || sn == 31250)
            ShopId = 79 // 鑫伟万豪酒店

        if (sn == 31116)
            ShopId = 81 //红林大酒店

        if (sn == 31094)
            ShopId = 85 //乐壳青山园

      if (sn == 1041 || sn == 29487 || sn == 31464)
            ShopId = 86 //居酒屋
        

        if (ShopId){
            var res = await app.db.shareGetPayDiscount({
                ShopId: ShopId,
                PageIndex: 1,
                PageSize: 200,
                IsAll:true,
            })

            this.setData({
                payList: res.data.Items
            })
        }
        
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