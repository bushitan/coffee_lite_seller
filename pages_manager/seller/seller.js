// pages_manager/seller/seller.js
var app = getApp()

Component({
    properties:{},

    data: {

        todayOrder: 0,
        todayMoney: 0,
        todayAvg: 0,

        menuList:[
            {
                name:"操作 ", color:"yellow",
                list: [
                  //  { name: "收款", url: "/pages_manager/action/receive/receive", text: "white", bg: "yellow" },
                  
                    { name: "订单", url: "/pages_manager/action/receive/receive", text: "white", bg: "yellow" },
                    { name: "核销", url: "/pages_manager/action/scan/scan", text: "white", bg: "yellow" },
                    { name: "会员", url: "/pages_manager/action/refund/refund", text: "yellow", bg: "gray" },
                    { name: "退款", url: "/pages_manager/action/refund/refund", text: "red", bg: "gray" },
                ],
            },
            {
                name: "统计 ", color: "blue",
                list: [
                    { name: "订单", url: "/pages_manager/stat/order/order", text: "white", bg: "blue" },
                    { name: "会员", url: "/pages_manager/stat/member/member", text: "blue", bg: "gray" },
                    { name: "门店", url: "/pages_manager/stat/store/store", text: "blue", bg: "gray" },
                ],
            },
            {
                name: "商品 ", color: "red",
                list: [
                    { name: "上下架", url: "/pages_manager/product/stock/stock", text: "white", bg: "red" },
                ],
            },

            {
                name: "原材料进销存 ", color: "black",
                list: [
                    { name: "入库", url: "/pages_manager/product/in/in", text: "", bg: "gray" },
                    { name: "盘点", url: "/pages_manager/product/check/check", text: "", bg: "gray" },
                ],
            },
        ]
    },
    behaviors: [app.configBehaviors],


    observers:{

    },

    attached() {
        this.autoMath()
    },


    methods:{

        /**
         * @method 点击菜单，自动触发事件
         */
        clickMenu(e) {
            var i = e.currentTarget.dataset.i
            var j = e.currentTarget.dataset.j
            console.log(i,j)
            wx.navigateTo({
                url: this.data.menuList[i].list[j].url,
            })
        },




        autoMath(){
            console.log("success")
            let that = this;
            wx.showLoading({
                title: '数据加载中',
                mask: true,
            })
            let i = 0;


            that.setData({
                // starCount: that.coutNum(3000),
                // forksCount: that.coutNum(484),
                // visitTotal: that.coutNum(24000)


                todayOrder: 3000,
                todayMoney: 484,
                todayAvg: 0,
            })

            var todayOrder = 3000
            var todayMoney =484
            var todayAvg = 0


            numDH();
            function numDH() {
                if (i < 20) {
                    setTimeout(function () {
                        that.setData({
                            todayOrder: i < todayOrder ? i : todayOrder,
                            todayMoney: i < todayMoney ? i : todayMoney,
                            todayAvg: i < todayAvg ? i : todayAvg
                        })
                        i++
                        numDH();
                    }, 20)
                } else {
                    that.setData({
                        // starCount: that.coutNum(3000),
                        // forksCount: that.coutNum(484),
                        // visitTotal: that.coutNum(24000)

                        
                        todayOrder: 3000,
                        todayMoney: 484,
                        todayAvg: 0,
                    })
                }
            }
            wx.hideLoading()
        },







































        // clickOperation(e){
        //     var index = e.currentTarget.dataset.index
        //     var operation = this.data.operationList[index]
        // },

        // clickQuery(e) {
        //     var index = e.currentTarget.dataset.index
        //     var query = this.data.queryList[index]
        // },

        // clickStat(e) {
        //     var index = e.currentTarget.dataset.index
        //     var stat = this.data.statList[index]
        // },

        
        // clickProduct(e) {
        //     var index = e.currentTarget.dataset.index
        //     var product = this.data.productList[index]
        // },
        // clickERP(e) {
        //     var index = e.currentTarget.dataset.index
        //     var erp = this.data.erpList[index]
        // },
        // /**
        //  * 用户点击右上角分享
        //  */
        // onShareAppMessage: function () {
        //     debugger
        // },

        // // onLoad: function (options) {
        // //     // 页面创建时执行
        // //     console.log("onLoad")
        // // },
        // onShow: function () {
        //     // 页面出现在前台时执行
        //     console.log(" onShow")
        // },
        // onReady: function () {
        //     // 页面首次渲染完毕时执行
        //     console.log(" onReady")
        // },
        // onHide: function () {
        //     // 页面从前台变为后台时执行
        //     console.log("onHide ")
        // },
        // onUnload: function () {
        //     // 页面销毁时执行
        //     console.log("onUnload ")
        // },
        // onPullDownRefresh: function () {
        //     // 触发下拉刷新时执行
        //     console.log(" onPullDownRefresh")
        // },
        // onReachBottom: function () {
        //     // 页面触底时执行
        //     console.log("onReachBottom ")
        // },
        // onShareAppMessage: function () {
        //     // 页面被用户分享时执行
        //     console.log(" onShareAppMessage")
        // },
        // onPageScroll: function () {
        //     // 页面滚动时执行
        //     console.log(" onPageScroll")
        // },
        // onResize: function () {
        //     // 页面尺寸变化时执行
        //     console.log(" onResize")
        // },
    }
})