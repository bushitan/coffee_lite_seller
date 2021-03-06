// pages_manager/seller/seller.js
var app = getApp()
var Utils = require("js/utils.js")
var ProductBehaviors = require("../lib/productBehaviors.js") //本地的
Component({

    properties: { 
    },
    data: {
        dialogShow:!true,
        node:{},
        tabMatrix: Utils.matrix,
        
        product: {
            "id": 143,
            "name": "澳白（8 OZ）",
            "is_work":true,
            "unit":"盒",

            "price": 25,
            "oldprice": 0,
            "cost": 0,
            "weight": 0,
            "stock": 9983,
            "tags": [
                "咖啡",
                "奶泡"
            ],
            "shortDescription": null,
            "fullDescription": null,
            "order_min_quantity": 1,
            "order_max_quantity": 10000,
            "published": true,
            "imgs": [
                {
                    "id": 165,
                    "picture_id": 193,
                    "position": 0,
                    "src": "https://wm.51zfgx.com/images/thumbs/0000193_8-oz.jpeg",
                    "isNew": false,
                    "title": "",
                    "alt": ""
                }
            ],
            "attributes": [
                {
                    "productAttributeID": 124,
                    "productAttributeName": "温度",
                    "isRequired": false,
                    "displayOrder": 1,
                    "attributeValues": []
                }
            ]
        },
        imgList: ["https://wm.51zfgx.com/images/thumbs/0000193_8-oz.jpeg"],
    },
    behaviors: [app.behaviors.configBehaviors, app.behaviors.listBehaviors, app.behaviors.dialogBehaviors, ProductBehaviors],

    methods:{

        onLoad(options){
            // this.setData({
            //     tabbarIndex: options.tabbarIndex || 0 ,
            //     tabIndex: options.tabIndex || 0,
            // })
            // this.onInit()
        },


        ChooseImage() {
            wx.chooseImage({
                count: 4, //默认9
                sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album'], //从相册选择
                success: (res) => {
                    if (this.data.imgList.length != 0) {
                        this.setData({
                            imgList: this.data.imgList.concat(res.tempFilePaths)
                        })
                    } else {
                        this.setData({
                            imgList: res.tempFilePaths
                        })
                    }
                }
            });
        },
        ViewImage(e) {
            wx.previewImage({
                urls: this.data.imgList,
                current: e.currentTarget.dataset.url
            });
        },
        DelImg(e) {
            wx.showModal({
                title: '召唤师',
                content: '确定要删除这段回忆吗？',
                cancelText: '再看看',
                confirmText: '再见',
                success: res => {
                    if (res.confirm) {
                        this.data.imgList.splice(e.currentTarget.dataset.index, 1);
                        this.setData({
                            imgList: this.data.imgList
                        })
                    }
                }
            })
        },



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
        //         var res = await Utils.mapQueryList[id](this.data.listPage, this.data.listRange , this.data.startTime,this.data.endTime) //获取相应的数组
        //     }
        //     catch (err) {
        //         wx.showModal({ title: '当前mapList不存在', showCancel: false })
        //         return
        //     }

        //     this.setData({ listResData: res.data}) // 将数据反馈至列表
        // },

        // toAdd(){
        //     wx.navigateTo({
        //         url: '/pages_manager/product/stock/stock?tabbarIndex=1',
        //     })
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