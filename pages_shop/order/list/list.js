// pages_shop/admin/admin.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPower:false,

        TabCur: 0,
        SortMenu: [
            { id: 0, name: "未接单", status: app.db.ORDER_STATUS_PENDING}, 
            { id: 1, name: "已接单", status: app.db.ORDER_STATUS_PROCESSING },
            { id: 2, name: "已完成", status: app.db.ORDER_STATUS_COMPLETE },
            { id: 3, name: "已取消", status: app.db.ORDER_STATUS_CANCEL }, 
            { id: 4, name: "全部订单", status: ""},
            // { id: 4, name: "自助下单" },
        ],
        status: app.db.ORDER_STATUS_PENDING,

        page: 1,
        limit: 10,
        lock: false,
        isMore: true,
        list: [1,2],
        
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
        this.getOrderList(app.db.PAYMENT_STATUS_REFUND ) // 初始化订单列表
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
    async getOrderList(status){
        var res = await app.db.orderGetList({
            Page: this.data.page,
            Limit: this.data.limit,
            Status: this.data.status
        })
        app.db.listUpdate(this, res)
    },
    

    /**
     * @method 点击选项卡
     */
    tabSelect(e) {
        console.log(e)
        var id = e.currentTarget.dataset.tab_id
        this.setData({
            TabCur: id,
            status: this.data.SortMenu[id].status
        })

        app.db.listInit(this)
        this.getOrderList() // 重新请求				
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
    toOrderDetail() {
        wx.navigateTo({
            url: '/pages_shop/order/detail/detail',
        })

    },

    onReachBottom(){
        console.log(11)
        this.getOrderList()
    },
})