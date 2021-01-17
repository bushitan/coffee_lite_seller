// pages_manager/seller/seller.js
var app = getApp()
var Utils = require("js/utils.js")
var ActionBehaviors = require("../lib/actionBehaviors.js") //本地的
var OrderList = require("../../../data/order.js")
Component({

    properties: { 
    },
    data: {
        
        dialogShow:!true,
        node:{},
        tabMatrix: Utils.matrix,
    },
    behaviors: [app.behaviors.configBehaviors, app.behaviors.listBehaviors, app.behaviors.dialogBehaviors, ActionBehaviors],


    observers:{

    },
    methods:{

        onLoad(options){
            this.setData({
                tabbarIndex: options.tabbarIndex || 0 ,
                tabIndex: options.tabIndex || 0,
            })
            console.log("refund")
            this.onInit()
        },


        onInit() {
            this.listInit( 20 )            
            this.getList()
            this.setData({ list: OrderList })
        },

        // 底部刷新
        onReachBottom: function () {
            this.getList()
        },

        // 获取数组列表 
        async getList(){
            var id
            try {
                id = this.data.tabMatrix[this.data.tabbarIndex].list[this.data.tabIndex].id
                if(!id)
                    throw "id为空"
            }
            catch (err) {
                wx.showModal({title: '当前栏目不存在', showCancel:false})
                return 
            }


            try {
                var res = await Utils.mapQueryList[id](this.data.listPage, this.data.listRange) //获取相应的数组
            }
            catch (err) {
                wx.showModal({ title: '当前mapList不存在', showCancel: false })
                return
            }




            console.log(res.data)
            this.setData({ listResData: res.data}) // 将数据反馈至列表
        },







        // 操作事件

        /**
         * @method 点击搜索框 
         */
        async search(e){
            console.log(e.detail)
            var input = e.detail // 输入框的项目
            //TODO 查询结果
            try {
                var res = await Utils.mapSearchNode[this.data.tabbarIndex](input) //获取相应的Node
            }
            catch (err) {
                wx.showModal({ title: '当前mapNode不存在', showCancel: false })
                return
            }

            
            this.setData({ 
                dialogShow: true,
                node:res.data
             })

        },


        // 点击confirm
        dialogConfirm(e){
            console.log(e.detail)
            this.setData({dialogShow:false })
        },

        

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