// pages_manager/seller/seller.js
var app = getApp()

Component({

    properties: { 
    },
    data: {
        dialogShow:!true,

        tabbarIndex:0,
        tabIndex:0,
        tabMatrix:[
            {
                name:"小商店", 
                select:"/images/icon/mall.png",
                unSelect:"/images/icon/mall_un.png",
                list:[
                    { name:"待处理" },{ name:"处理中" },{ name:"已完成" },{ name:"已取消" },
                ]
            }
        ]
    },
    behaviors: [app.behaviors.configBehaviors,app.behaviors.listBehaviors ,app.behaviors.dialogBehaviors],


    observers:{

    },
    methods:{

        // 点击搜索框
        async search(e){
            console.log(e.detail)
            
            this.setData({dialogShow:true })

        },

        // 点击bar
        clickBar(e){
            console.log('clickBar',this.data.tabbarIndex,e.detail)
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