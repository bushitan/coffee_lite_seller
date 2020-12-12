// pages_shop/admin/admin.js
var app = getApp()

var pendingList 
var processingList
var completeList
var TAB_PENDING = 0
var TAB_PROCESSING = 1
var TAB_COMPLETE = 2
var TAB_COMPLETE = 2
var date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate() 
console.log()
var today = [year, month, day].join('-') 
var interval 
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPower:false,

        TabCur: TAB_PENDING,
        SortMenu: [
            { id: 0, name: "待使用", },
            { id: 1, name: "已完成",},
        ],
        // STATUS_PENDINGL:0,
        // STATUS_ACCESS:1,
        // STATUS_REFUND: 2,
        // STATUS_ALL: 3,
        STORE_TAKE_TYPE_WM : app.db.STORE_TAKE_TYPE_WM, // 外卖
        STORE_TAKE_TYPE_ZQ : app.db.STORE_TAKE_TYPE_ZQ, // 到店自取
        STORE_TAKE_TYPE_TS : app.db.STORE_TAKE_TYPE_TS, // 堂食

        SELLER_PENDING: app.db.SELLER_PENDING, // 商家待处理状态

        SHIP_STATUS_CANCEL: app.db.SHIP_STATUS_CANCEL,
        PAYMENT_STATUS_REFUND_APPLY: app.db.PAYMENT_STATUS_REFUND_APPLY,
        

        SHIP_STATUS_ING: app.db.SHIP_STATUS_ING,
        SHIP_STATUS_EXCEPTION: app.db.SHIP_STATUS_EXCEPTION,
        
        status: app.db.ORDER_STATUS_PENDING,

        list:[],
        preList: [],
        doneList: [],
        

        shopId:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // debugger
        this.setData({
            shopId: options.shopID || "",
            isScan: options.isScan || false,
        })

        // 设置ID
        app.db.shopLogin().then(res=>{
            wx.setNavigationBarTitle({
                title: '商户ID:' + res.data.sn  ,
            })
        })
      
        this.onInit() // 初始化

        // var that = this
        // interval = setInterval(function(){
        //     that.onInit()
        // },60000)
    },

    onShow(){
    },

    // 刷新
    async onInit(){
        this.tabSelect() //默认点击tab
    },

    // 检测是否有权限
    async checkPower(){
        var isPwoer = true
        this.setData({
            isPwoer: isPwoer,
        })
        return isPwoer
    },
    
    /**
     * @method 点击选项卡
     */
    async tabSelect(e) {
        console.log(e)
        var id = e ? e.currentTarget.dataset.tab_id  : this.data.TabCur
        this.setData({
            TabCur: id,
            list: [],
        })
        switch (id) {
            case 0: var res = await app.db.orderGetList({
                ShopId: this.data.shopId,
                Page: 1, Limit: 100, FilterStatus: app.db.SELLER_PENDING, //CreatedAtMin: today
            });break;
            case 1: var res = await app.db.orderGetList({
                ShopId: this.data.shopId,
                Page: 1, Limit: 100, FilterStatus: app.db.SELLER_COMLETE, //CreatedAtMin: today
            });break;
        }
        this.setData({
            list: res.data
        })
    },

 

    // 拨打用户号码
    takePhone(e){
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phonenumber,
        })
    },

    onShareAppMessage(){},
})


// /**
//  * @method 退款，取消订单
//  */
// async clickCancle(e) {
//     var orderID = e.currentTarget.dataset.order_id
//     var res = await app.db.orderConfirmrefund({
//         orderId: orderID,
//     })
//     wx.showModal({ title: res.msg, showCancel: false })

// },

// /**
//   * @method 顺风接单
//   */
// async orderShipSF(e) {
//     if (await app.showModal(e.currentTarget.dataset.name) == false) return

//     var orderID = e.currentTarget.dataset.order_id
//     var res = await app.db.orderShippingSF({
//         orderId: orderID,
//     })
//     wx.showToast({
//         title: res.msg,
//     })
//     if (res.code == 0) {
//         this.setData({ TabCur: 1 })
//         this.tabSelect()
//         // var res = await app.db.orderGetList({ Page: 1, Limit: 100, Status: app.db.ORDER_STATUS_PROCESSING, CreatedAtMin: today })
//         // this.setData({ 
//         //     TabCur: TAB_PROCESSING,
//         //     list: res.data
//         // })
//     }
// },

// /**
// * @method 到店自取 | 堂食接单
// */
// async orderShipStore(e) {

//     if (await app.showModal(e.currentTarget.dataset.name) == false) return

//     var orderID = e.currentTarget.dataset.order_id
//     var res = await app.db.orderShippingStore({
//         orderId: orderID,
//     })
//     wx.showToast({
//         title: res.msg,
//     })
//     if (res.code == 0) {

//         this.setData({ TabCur: 2 })
//         this.tabSelect()
//         // var res = await app.db.orderGetList({ Page: 1, Limit: 100, Status: app.db.ORDER_STATUS_PROCESSING, CreatedAtMin: today })
//         // this.setData({
//         //     TabCur: TAB_PROCESSING,
//         //     list: res.data
//         // })
//     }
// },


// /***********路由************/
// // 增加订单
// orderAdd(){
//     wx.navigateTo({
//         url: '/pages_shop/order_add/order_add',
//     })
// },
// // 查看订单详情
// toOrderDetail(e) {
//     var orderID = e.currentTarget.dataset.order_id
//     wx.navigateTo({
//         url: '/pages_shop/order/detail/detail?orderId=' + orderID,
//     })
// },
// // 查询订单
// toOrderList(){

//     wx.navigateTo({
//         url: '/pages_shop/order/list/list',
//     })
// },

// // 手动刷新
// refresh(){
//     this.onInit()
// },
// //　配置店铺信息
// setStore(){
//     wx.navigateTo({
//         url: '/pages_shop/config/store',
//     })
// },