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
const day = date.getDate() - 6
console.log()
var today = [year, month, day].join('-') 
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPower:false,

        TabCur: TAB_PENDING,
        SortMenu: [
            { id: 0, name: "待处理", status: app.db.ORDER_STATUS_PENDING },
            // { id: 1, name: "处理中", status: app.db.ORDER_STATUS_PROCESSING },
            { id: 1, name: "配送中", status: app.db.ORDER_STATUS_PROCESSING },
            { id: 2, name: "已处理", status: app.db.ORDER_STATUS_COMPLETE },
           
            // { id: 2, name: "退款" }, 
            // { id: 3, name: "全部订单" },
            // { id: 4, name: "自助下单" },
        ],
        // STATUS_PENDINGL:0,
        // STATUS_ACCESS:1,
        // STATUS_REFUND: 2,
        // STATUS_ALL: 3,

        status: app.db.ORDER_STATUS_PENDING,

        list:[],
        preList: [],
        doneList: [],
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onInit()

        // this.setData({
        //     preList: wx.getStorageSync('list')
        // })
        
    },
    // 刷新
    async onInit(){
        // 登录
        var res = await app.db.shopLogin()
    
        wx.setNavigationBarTitle({
            title: '点单管理后台（商户ID:' + res.data.sn + "）",
        })

        // debugger
        // if( this.checkPower() == false )
        //     return
        // debugger
       
        var pending = await app.db.orderGetList({
            Page: 1, Limit: 100, FilterStatus: app.db.SELLER_PENDING,       CreatedAtMin: today})

        var pendingList = pending.data
        // var processing = await app.db.orderGetList({ Page: 1, Limit: 100, Status: app.db.ORDER_STATUS_PROCESSING, CreatedAtMin: today })
        // var complete = await app.db.orderGetList({ Page: 1, Limit: 100, Status: app.db.ORDER_STATUS_COMPLETE, CreatedAtMin: today})
        // var pendingList = pending.data
        // var processingList = processing.data
        // var completeList = complete.data
        this.setData({
            TabCur: 0,
            list: pendingList,
            pendingList : pending.data,
            // processingList : processing.data,
            // completeList : complete.data,
        })
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
        var id = e.currentTarget.dataset.tab_id
        this.setData({
            TabCur: id,
        })
        switch (id) {
            case 0: var res = await app.db.orderGetList({
                Page: 1, Limit: 100, FilterStatus: app.db.SELLER_PENDING, CreatedAtMin: today
            });
                break;
            case 1: var res = await app.db.orderGetList({
                Page: 1, Limit: 100, FilterStatus: app.db.SELLER_RIDING, CreatedAtMin: today
            });
                break;
            case 2: var res = await app.db.orderGetList({
                Page: 1, Limit: 100, FilterStatus: app.db.SELLER_COMLETE, CreatedAtMin: today
            });
                break;

        }

        // debugger
        this.setData({
            list: res.data
        })
        // if(id == 0)
        //     this.setData({ list: this.data.pendingList })		
        // else if(id == 1)
        //     this.setData({ list: this.data.processingList })
        // else
        //     this.setData({ list: this.data.completeList })
// 
    },

    //  点击接单
    async orderShip(e) {
        var orderID = e.currentTarget.dataset.order_id
        // var res = await app.db.orderShippingStore({
        //     orderId: orderID, 
        // })
        var res = await app.db.orderShippingSF({
            orderId: orderID,
        })

        // debugger
        wx.showToast({
            title: res.msg,
        })
        if(res.code == 0 ){
            var res = await app.db.orderShipping({ Page: 1, Limit: 100, Status: app.db.ORDER_STATUS_PROCESSING, CreatedAtMin: today })
            this.setData({ 
                TabCur: TAB_PROCESSING,
                list: res.data
            })
        }
        

        // TODO 修改订单状态，刷新订单
        
    },

    /***********路由************/
    // 增加订单
    orderAdd(){
        wx.navigateTo({
            url: '/pages_shop/order_add/order_add',
        })
    },
    // 查看订单详情
    toOrderDetail(e) {
        var orderID = e.currentTarget.dataset.order_id
        wx.navigateTo({
            url: '/pages_shop/order/detail/detail?orderId=' + orderID,
        })
    },
    // 查询订单
    toOrderList(){

        wx.navigateTo({
            url: '/pages_shop/order/list/list',
        })
    },

    // 手动刷新
    refresh(){
        this.onInit()
    },

    onShareAppMessage(){},
})