// pages_shop/admin/admin.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        TabCur: 4,
        SortMenu: [
            { id: 0, name: "未接单" }, 
            { id: 1, name: "已接单" }, 
            { id: 2, name: "退款" }, 
            { id: 3, name: "全部订单" },
            { id: 4, name: "自助下单" },],
        STATUS_PENDINGL:0,
        STATUS_ACCESS:1,
        STATUS_REFUND: 2,
        STATUS_ALL: 3,
        STATUS_SELF: 4,

        page: 1,
        limit: 10,
        lock: false,
        isMore: true,
        list: [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    onInit(){},

    // 接单
    catchOrder(){
         wx.showModal({
             title: '接单成功',
             content: '',
         })
        // wx.showActionSheet({
        //     itemList: ["顺风","自配送"],
        // })
    },

    /**
     * @method 点击选项卡
     */
    tabSelect(e) {
        console.log(e)
        var id = e.currentTarget.dataset.tab_id
        // var isRefund = false
        // if (id == 1) isRefund = true
        this.setData({
            TabCur: id,
            // scrollLeft: (id - 1) * 60,
            // isRefund: isRefund,
        })
        this.onInit() // 重新请求				
    },

    /***********路由************/
    // 增加订单
    orderAdd(){
        wx.navigateTo({
            url: '/pages_shop/order/add/add',
        })
    },
})