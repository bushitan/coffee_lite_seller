// pages_manager/seller/seller.js
var app = getApp()
var Utils = require("js/utils.js")
var ProductBehaviors = require("../lib/productBehaviors.js") //本地的
var StockList = require("../../../data/product.js") //本地的
var OrgProduct = require("../../../data/org_product.js") //本地的
Component({

    properties: { 
    },
    data: {
        dialogShow:!true,
        node:{},
        tabMatrix: Utils.matrix,
        list: StockList,
        StockList: StockList,
        OrgList: OrgProduct.orgList,
    },
    behaviors: [app.behaviors.configBehaviors,  app.behaviors.dialogBehaviors, ProductBehaviors],

    methods:{

        onLoad(options){
            this.setData({
                tabbarIndex: options.tabbarIndex || 0 ,
                tabIndex: options.tabIndex || 0,
            })
            this.onInit()
        },


        onInit() {
            this.changeTabbar()

            // this.listInit( 20 )            
            // this.getList( )
        },

        changeTabbar() {

            var list // = this.data.StockList
            if (this.data.tabbarIndex == 0)
                list = this.data.StockList
            else
                list = this.data.OrgList
            this.setData({ list: list })
        },


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
        //         var res = await Utils.mapQueryList[id](this.data.listPage, this.data.listRange , this.data.startTime,this.data.endTime) //获取相应的数组
        //     }
        //     catch (err) {
        //         wx.showModal({ title: '当前mapList不存在', showCancel: false })
        //         return
        //     }

        //     this.setData({ listResData: res.data}) // 将数据反馈至列表
        // },

        // toAdd(){},
        
        toProductEditor(e){
            var id = e.currentTarget.dataset.id
            console.log(id)
            wx.navigateTo({
                url: '/pages_manager/product/product/product',
            })
        },



        /**
         * @method 新增原材料
         */
        toAddOrgProduct() { 
            wx.navigateTo({
                url: '/pages_manager/product/add/add',
            })
        },


        /**
         * 
         */
        checkBtn(e){
            console.log(e.detail)
            wx.showModal({
                title: '提交成功',
                showCancel:false,
            })
        },



        // 点击tabbar
        clickTabbar(e) {
            // console.log('clickTabbar', e.detail, this.data.tabIndex)
            var tabbarIndex = e.detail  
            this.setData({ tabbarIndex: tabbarIndex})
            this.changeTabbar()
            // this.onInit()
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