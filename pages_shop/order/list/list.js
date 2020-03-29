// pages_shop/admin/admin.js
var app = getApp()

var date = new Date()  
const year = date.getFullYear()
const month = date.getMonth() + 1
const d = date.getDate()
const t = date.getDate() + 1
var today = [year, month, d].join('-')
var tomorrow = [year, month, t].join('-') 
console.log(today)


/**
 * 1、已退款， 查询支付状态 PAYMENT_STATUS_REFUND
 * 
 * 
 */
Page({

    /**
     * 页面的初始数据
     */
    data: {
        MenuTabCur: 0,
        scrollLeft: 0,
        tabber: ["订单列表", "订单查询"],

        CreatedAtMin: today,
        CreatedAtMax: tomorrow,

        TabCur: 0,
        SortMenu: [
            // { id: 0, name: "未接单", status: app.db.ORDER_STATUS_PENDING}, 
            // { id: 1, name: "已接单", status: app.db.ORDER_STATUS_PROCESSING },
            { id: 0, name: "待处理", status: app.db.SELLER_PENDING },
            { id: 1, name: "配送中", status: app.db.SELLER_RIDING },
            { id: 2, name: "已处理", status: app.db.SELLER_COMLETE },
            // { id: 3, name: "已完成", status: app.db.SELLER_COMLETE },
            { id: 3, name: "已退款", status: app.db.SELLER_REFUND },
            // { id: 4, name: "已取消", status: app.db.SELLER_CANCEL },
            // { id: 3, name: "已退款", status: app.db.ORDER_STATUS_COMPLETE },
            // { id: 2, name: "全部订单", status: ""}, 
            // { id: 4, name: "自助下单" },
        ],

        STORE_TAKE_TYPE_WM: app.db.STORE_TAKE_TYPE_WM, // 外卖
        STORE_TAKE_TYPE_ZQ: app.db.STORE_TAKE_TYPE_ZQ, // 到店自取
        STORE_TAKE_TYPE_TS: app.db.STORE_TAKE_TYPE_TS, // 堂食
        status: app.db.SELLER_PENDING,
        

        page: 1,
        limit: 10,
        lock: false,
        isMore: true,
        list: [1,2],
        

        inputKey:'', //  查询使用
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onInit()
    },

    async onInit(){
        // debugger
        if( this.checkPower() == false )
            return
        app.db.listInit(this)
        this.getOrderList( ) // 初始化订单列表
    },

    // 检测是否有权限
    async checkPower(){
        var isPwoer = true
        this.setData({
            isPwoer: isPwoer,
        })
        return isPwoer
    },

    // 初始化订单列表
    async getOrderList(){
        var res = await app.db.orderGetList({
            Page: this.data.page,
            Limit: this.data.limit,
            FilterStatus: this.data.status,
            CreatedAtMin: this.data.CreatedAtMin,
            CreatedAtMax: this.data.CreatedAtMax,
        })
        app.db.listUpdate(this, res)
    },
    

    /**
     * @method 点击选项卡
     */
    orderTabSelect(e) {
        console.log(e)
        var id = e.currentTarget.dataset.tab_id
        this.setData({
            TabCur: id,
            status: this.data.SortMenu[id].status
        })

        app.db.listInit(this)
        this.getOrderList() // 重新请求				
    },

    // 改变开始日期
    CreatedAtMinChange(e) {  
        this.setData({ CreatedAtMin: e.detail.value })
        this.onInit()
    },
    // 改变结束日期
    CreatedAtMaxChange(e) {
        this.setData({ CreatedAtMax: e.detail.value }) 
        this.onInit()
    },


    //  点击接单
    catchOrder() {
        wx.showModal({
            title: '接单成功',
            content: '',
        })
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
        wx.navigateTo({
            url: '/pages_shop/order/detail/detail?orderId=' + e.currentTarget.dataset.order_id,
        })

    },


    // 订单查询
    menuTabSelect(e) {
        this.setData({
            MenuTabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        })
    },

    // 输入搜索内容
    inputSearchText(e) {
        let key = e.detail.value.toLowerCase();
        this.setData({ inputKey: key })
    },
    // 搜索
    async search() {
        // 请求搜索结果
        var res = await app.db.orderGetDetail({
            orderId:this.data.inputKey
        })
        if(res.code == 0)
            wx.navigateTo({
                url: '/pages_shop/order/detail/detail?orderId=' + res.data.id,
            })
        else{
            wx.showModal({
                title: '该订单不存在',
            })
        }
    },


    onReachBottom(){
        console.log(11)
        if(this.data.isMore)
            this.getOrderList()
        
    },
})