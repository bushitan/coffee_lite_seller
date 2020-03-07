// pages_shop/admin/admin.js
var app = getApp()

var pendingList 
var processingList
var completeList
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPower:false,

        TabCur: 0,
        SortMenu: [
            { id: 0, name: "未接单", status: app.db.ORDER_STATUS_PENDING },
            { id: 1, name: "今日处理中", status: app.db.ORDER_STATUS_PENDING },
            { id: 2, name: "今日已完成", status: app.db.ORDER_STATUS_PENDING }, 
            // { id: 2, name: "退款" }, 
            // { id: 3, name: "全部订单" },
            // { id: 4, name: "自助下单" },
        ],
        STATUS_PENDINGL:0,
        STATUS_ACCESS:1,
        STATUS_REFUND: 2,
        STATUS_ALL: 3,

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
        // debugger
        if( this.checkPower() == false )
            return

        var date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()-5
        console.log(   )
        var today = [year, month, day].join('-') 

        var pending = await app.db.orderGetList({ Page: 1, Limit: 100, Status: app.db.ORDER_STATUS_PENDING, CreatedAtMin: today})
        var processing = await app.db.orderGetList({ Page: 1, Limit: 100, Status: app.db.ORDER_STATUS_PROCESSING, CreatedAtMin: today })
        var complete = await app.db.orderGetList({ Page: 1, Limit: 100, Status: app.db.ORDER_STATUS_COMPLETE, CreatedAtMin: today})
        var pendingList = pending.data
        var processingList = processing.data
        var completeList = complete.data
        this.setData({
            TabCur: 0,
            list: pendingList,
            pendingList : pending.data,
            processingList : processing.data,
            completeList : complete.data,
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

    // // 获取待处理订单
    // async getPendingOrderList(status){
    //     var res = await app.db.orderGetList({
    //         Page: this.data.page,
    //         Limit: this.data.limit,
    //         Status: app.db.ORDER_STATUS_PENDING,
    //     })
    //     this.setData({
    //         list: res.data,
    //         preList:res.data
    //     })

    //     wx.setStorageSync('list', res.data)
    // },  
    // // 获取已经订单
    // async getDoneOrderList(status) {
    //     var res = await app.db.orderGetList({
    //         Page: this.data.page,
    //         Limit: this.data.limit,
    //         Status: app.db.ORDER_STATUS_PENDING,
    //     })
    //     this.setData({
    //         doneList:res.data
    //     })
    // },

    
    /**
     * @method 点击选项卡
     */
    tabSelect(e) {
        console.log(e)
        var id = e.currentTarget.dataset.tab_id
        this.setData({
            TabCur: id,
        })
        if(id == 0)
            this.setData({ list: this.data.pendingList })		
        else if(id == 1)
            this.setData({ list: this.data.processingList })
        else
            this.setData({ list: this.data.completeList })
// 
    },

    //  点击接单
    catchOrder() {
        wx.showModal({
            title: '接单成功',
            content: '',
        })

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
    toOrderDetail() {
        wx.navigateTo({
            url: '/pages_shop/order/detail/detail',
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
})