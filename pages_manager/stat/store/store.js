// pages_manager/seller/seller.js
var app = getApp()
var Utils = require("js/utils.js")
var StatBehaviors = require("../lib/statBehaviors.js") //本地的
// var util = require("../../../utils/util.js")
var StoreList = require("../../../data/store.js")
var SummaryList = require("../../../data/summary.js")
Component({

    properties: { 
    },
    data: {
        dialogShow:!true,
        node:{},
        // tabbarIndex:0,
        // tabIndex:0,
        tabMatrix: Utils.matrix,
        StoreList: StoreList,
        bill: SummaryList,
    },
    behaviors: [app.behaviors.configBehaviors, app.behaviors.listBehaviors, app.behaviors.dialogBehaviors, StatBehaviors],


    observers:{

    },
    methods:{

        onLoad(){
            this.onInit()
        },

        /**
         * 默认按当天查询
         */
        onInit(){
            // console.log(util.today)

            if (this.data.tabbarIndex == 0) {
                //TODO
                console.log(11)
            }
            if (this.data.tabbarIndex == 1) {
                //TODO
                console.log(22)
            }
        },


        confirm(e){
            console.log(e.detail)
        },



        // onLoad(options){
        //     this.setData({
        //         tabbarIndex: options.tabbarIndex || 0 ,
        //         tabIndex: options.tabIndex || 0,
        //     })
        //     this.onInit()
        // },


        // onInit() {
        //     this.listInit( 20 )            
        //     this.getList( )
        // },

        // // 底部刷新
        // onReachBottom: function () {
        //     this.getList()
        // },

        // // 获取数组列表 
        // async getList(){
        //     var id
        //     try {
        //         id = this.data.tabMatrix[this.data.tabbarIndex].list[this.data.tabIndex].id
        //         if(!id)
        //             throw "id为空"
        //     }
        //     catch (err) {
        //         wx.showModal({title: '当前栏目不存在', showCancel:false})
        //         return 
        //     }


        //     try {
        //         var res = await Utils.mapQueryList[id](this.data.listPage, this.data.listRange) //获取相应的数组
        //     }
        //     catch (err) {
        //         wx.showModal({ title: '当前mapList不存在', showCancel: false })
        //         return
        //     }




        //     console.log(res.data)
        //     this.setData({ listResData: res.data}) // 将数据反馈至列表
        // },







        // // 操作事件

        // /**
        //  * @method 点击搜索框 
        //  */
        // async search(e){
        //     console.log(e.detail)
        //     var input = e.detail // 输入框的项目
        //     //TODO 查询结果
        //     try {
        //         var res = await Utils.mapSearchNode[this.data.tabbarIndex](input) //获取相应的Node
        //     }
        //     catch (err) {
        //         wx.showModal({ title: '当前mapNode不存在', showCancel: false })
        //         return
        //     }

            
        //     this.setData({ 
        //         dialogShow: true,
        //         node:res.data
        //      })

        // },

        // // 点击bar
        // clickBar(e){
        //     console.log('clickBar',this.data.tabbarIndex,e.detail)
        //     this.setData({ tabIndex : e.detail})
        //     this.onInit()
        // },

        // // 点击bar
        // clickTabbar(e) {
        //     console.log('clickTabbar', e.detail, this.data.tabIndex)
        //     this.setData({ tabbarIndex: e.detail , tabIndex:0 })
        //     this.onInit()
        // },


        // // 点击confirm
        // dialogConfirm(e){
        //     console.log(e.detail)
        //     this.setData({dialogShow:false })
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