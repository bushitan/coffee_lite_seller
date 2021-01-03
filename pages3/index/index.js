// pages4/share/index/index.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[],
        currentIndex:0,
        userInfo:{},
        roles:[],

        ROLE_SELLER: 10,//门店核销员
        ROLE_MANAGER: 6,//门店核销员
        ROLE_MENU: 11,//门店核销员
        // ROLE_CUSTOMER_PAY:3,// 普通会员   用户支付
        isSeller:!false,
        isManager:!false,
        isMenu:!false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({ bind_shop_id: options.bind_shop_id })
        this.onInit()
    },

    async onInit(){
        wx.showLoading({mask:true})
        var res = await app.db3.productSellerGetToken()

        var res =  app.db4.login() //登录ii


        var res = await app.db3.productGetStoreList()
        this.setData({
            list : res.data
        })


        this.getSellerRole()
        this.getSellerUserInfo()
        wx.hideLoading()
    },

    // 获取店员权限
    async getSellerRole(){

        var res = await app.db3.productGetSellerRoles()
        var roles = res.data
        this.setData({
            roles: roles
        })

        for (var i = 0; i < roles.length;i++){
            if (roles[i].id == this.data.ROLE_SELLER) this.setData({ isSeller: true, })
            if (roles[i].id == this.data.ROLE_MANAGER) this.setData({ isManager: true, })
            if (roles[i].id == this.data.ROLE_MENU) this.setData({ isMenu: true, })            
        }

    },

    // 获取店员信息
    async getSellerUserInfo() {
        var res = await app.db3.productGetSellerUserInfo()
        this.setData({
            userInfo: res.data
        })
        // console.log(res)
    },

    // 获取门店的数据
    getShopData(){},

    changeShop(e){
        this.setData({
            currentIndex : parseInt(e.detail.value)
        })
        this.getShopData()
    },

    // 去绑定
    toBind(){
        wx.navigateTo({
            url: '/pages3/bind/bind?shop_id=' + this.data.bind_shop_id + '&u_id=' + this.data.userInfo.id,
        })
    },

    // to点单列表
    toTotal(e) {  wx.navigateTo({ url: '/pages3/order_list/order_list?shopID=' + this.data.list[ this.data.currentIndex].Id }) },


    /***************店员下单收银*************/
    // 点单
    toMenu(e) { wx.navigateTo({ url: '/pages3/menu/menu?shopID=' + this.data.list[this.data.currentIndex].Id }) },
    // 收银下单列表
    toCashList(e) { wx.navigateTo({ url: '/pages3/cash_list/cash_list?shopID=' + this.data.list[this.data.currentIndex].Id }) },

    // 收银下单统计
    toCashStat(e) { wx.navigateTo({ url: '/pages3/cash_stat/cash_stat?shopID=' + this.data.list[this.data.currentIndex].Id }) },

    /***************嗨翻节核销订单*************/
    // 嗨翻节扫码
    toHiScan(){
        wx.scanCode({
            success:res=>{
                console.log(res.result)
                this.checkHiOrder(res.result)
            },
        })

        // this.checkHiOrder("07429dbe-7e36-4166-a0ad-65711596ae4b")
    },
    // 核销
    async checkHiOrder(orderId){
        var res = await app.db3.productScanOrderID({
            orderId: orderId,
        })

        wx.showModal({ title: res.msg, showCancel: false, })
    },

    // 嗨翻节扫码
    toHiOrderList(e) { wx.navigateTo({ url: '/pages3/hi_order/hi_order?shopID=' + this.data.list[this.data.currentIndex].Id }) },

    /***************顾客自助点单*************/
    // 小程序接单
    toLiteOrder(e) { wx.navigateTo({ url: '/pages_shop/admin/admin?shopID=' + this.data.list[this.data.currentIndex].Id }) },
    // 查询订单
    toLiteOrderList() { wx.navigateTo({ url: '/pages_shop/order/list/list?shopID=' + this.data.list[this.data.currentIndex].Id }) },

    /***************顾客扫码支付*************/
    //支付列表
    toPayList(e) { wx.navigateTo({ url: '/pages4/share/pay/pay?shopID=' + this.data.list[this.data.currentIndex].Id }) },
    // 支付统计
    toPayOrderStat(e) { wx.navigateTo({ url: '/pages4/share/total/total?type=order&shopID=' + this.data.list[this.data.currentIndex].Id }) },

    /***************汇总统计*************/

    // 支付对账单
    toBillStat(e) {   wx.navigateTo({ url: '/pages4/share/total/total?type=bill&shopID=' + this.data.list[this.data.currentIndex].Id   }) },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})