// pages_manager/test/test.js
var app = getApp()
var utils = require("js/utils.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [
            { name: "店家", url: "/pages_manager/seller/seller", },
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       
    },
    onReady(){
        this.onInit()
    },

    toNav(e){
        var index = e.currentTarget.dataset.index
        wx.navigateTo({
            url: this.data.list[index].url,
        })
    },

    async onInit(){
        // var res = await wx.getAccountInfoSync()
        // console.log(res.miniProgram.appId)

        // console.log( await  app.dbm.admin.org.login() )


        // this.proLogin() //登录流程 

        // utils.proShop()  //门店信息
        // utils.proShopBind()  //品牌申请绑定流程
        // utils.proShopScanBind() //品牌扫码绑定流程
        // utils.proShopBrand() //分店增加流程
        // utils.proShopBrandBind() //分店员工绑定流程

        // utils.proPayment() //支付账户配置
        utils.proClient() //终端账户配置

        // utils.proClientPaymentBind() //支付 - 终端 绑定
        

    },
 




    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})