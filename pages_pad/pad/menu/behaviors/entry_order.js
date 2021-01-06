
var app
var ENTRY_ORDER_LIST = "entry_order_list"
module.exports = Behavior({
    data: { 
        // config: {}, // 全局配置
        showEntryOrder: false,
        showEntryOrderAdd: false,
        showEntryOrderDetail:false,
        entryOrderList:[], //挂单列表
        entryOrderCurrent:{} // 当前挂的单
    },



    // // 监听器
    // observers: {
    //     // 全局生成config配置参数
    //     'configBase': function (config) {
    //         console.log(config)
    //         // TODO 检查配置文件是否完整，不完整，在这里补充
    //         this.setData({
    //             config: config
    //         })

    //     }

    // },

    //准备完成
    ready() {
        this.entryOrderInit()
    },
    methods: {
       
        entryOrderInit(){

          
            this.setData({
                entryOrderList: wx.getStorageSync(ENTRY_ORDER_LIST)
            })
        },

        // 添加挂单的单品
        entryOrderAdd(e){
            console.log(e.detail.value.remark)
            var remark = e.detail.value.remark
            if(remark == ""){
                wx.showModal({ title: '请添加挂单备注',  showCancel:false})
                return 
            }
            this.entryOrderAddDialogClose() // 关闭挂单页面

            var obj = {
                remark : remark,
                order: JSON.parse(JSON.stringify(this.data.order)) 
            }

            var entryOrderList = this.data.entryOrderList || []
            entryOrderList.push(obj)
            this.setData({
                entryOrderList: entryOrderList
            })
            wx.setStorageSync(ENTRY_ORDER_LIST, entryOrderList)
            wx.showToast({ title: '挂单成功', })
        },

        // method  调出之前的订单，继续点单
        entryOrderContinue(e){
            // console.log(Object.keys(this.data.order).length)
            // return 
            var index = e.currentTarget.dataset.index
            // var order = this.data.entryOrderList[index].order
            if (Object.keys(this.data.order).length > 0){
                wx.showModal({
                    title: '使用"' + this.data.entryOrderList[index].remark +'"覆盖？',
                    content: '当前已点商品，确定后覆盖当前已选商品',
                }).then(res=>{
                    if(res.confirm){
                        this.entryOrderReSetOrder(index)
                        this.entryOrderDialogClose()
                    }                       
                })
                return 
            }
            this.entryOrderReSetOrder(index)
                
        },

        // 重新设置挂单
        entryOrderReSetOrder(index) {
            // // console.log(this.data.entryOrderList[index].order)
            // var index = e.currentTarget.dataset.index
            var entryOrderCurrent = this.data.entryOrderList[index]
            var order = JSON.parse(JSON.stringify(this.data.entryOrderList[index].order)) 


            this.setData({ entryOrderCurrent: entryOrderCurrent})
            wx.setStorageSync("order", order)
            this.onInit()  
        },

        // 替换当前的挂单
        entryOrderCurrentReplace(e){
            var index = e.currentTarget.dataset.index
            var entryOrderList = this.data.entryOrderList 

            wx.showModal({
                title: '是否替换：' + this.data.entryOrderList[index].remark,
                success: res => {
                    if (res.confirm) {
                        entryOrderList[index].order = JSON.parse(JSON.stringify(this.data.order))
                        this.setData({
                            entryOrderList: entryOrderList
                        })
                        wx.setStorageSync(ENTRY_ORDER_LIST, entryOrderList)
                        wx.showToast({ title: '替换成功', })
                    }
                }
            })

            
        },

        // 清除当前订单
        entryOrderClear(e) {
            var index = e.currentTarget.dataset.index
            var entryOrderList = this.data.entryOrderList 
            wx.showModal({
                title: '是否删除：' + this.data.entryOrderList[index].remark  ,
                success:res=>{
                    if(res.confirm){
                        entryOrderList.splice(index, 1)
                        this.setData({
                            entryOrderList: entryOrderList
                        })
                        wx.setStorageSync(ENTRY_ORDER_LIST, entryOrderList)
                        wx.showToast({ title: '删除成功', })
                    }
                }
            })

        },


        // 挂单列表开关
        entryOrderDialogOpen() { this.setData({ showEntryOrder: true, }) },
        entryOrderDialogClose(){ this.setData( {showEntryOrder:false,})},


        // 挂单编辑开关
        entryOrderAddDialogOpen() { this.setData({ showEntryOrderAdd: true, }) },
        entryOrderAddDialogClose() { this.setData({ showEntryOrderAdd: false, }) },
        // 挂单查看详情开关
        entryOrderDetailDialogOpen() { this.setData({ showEntryOrderDetail: true, }) },
        entryOrderDetailDialogClose() { this.setData({ showEntryOrderDetail: false, }) },
        




        // onLoad: function (options) {
        //     // 页面创建时执行 组件内不触发
        //     console.log("onLoad")
        // },
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
    },


    // created() {
    //     console.log("created")
    // },
    // attached() {

    // },
    // detached() {
    //     console.log("detached")
    // },
    // moved() {
    //     console.log("moved")
    // },


    // // 可以不用
    // pageLifetimes: {
    //     // 组件所在页面的生命周期函数
    //     show: function () { console.log("show") },
    //     hide: function () { console.log("hide") },
    //     resize: function () { console.log("resize") },
    // },

    // // 可以不用
    // lifetimes: {
    //     // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    //     attached: function () { },
    //     moved: function () { },
    //     detached: function () { },
    // },
})