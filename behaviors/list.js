
var app = getApp()
module.exports = Behavior({
    data: {
        list: [],
        listResData:{},
        listPage:1,
        listRange:20,
        listCount:100,
        isLoading:true,
    },



    // 监听器
    observers: {
        // 全局生成config配置参数
        'listResData': function (listResData) { 
            
            // console.log("listResData", listResData)
            if (listResData.hasOwnProperty("data") == false)
                return 

            // 不存在数据
            if (  listResData.data.length == 0){
                this.setData({ isLoading: false, })
                return
            }
            
            var temp = this.data.list.concat(listResData.data)
            this.setData({
                list: temp,
                listPage: listResData.page,
            })

            if (this.data.listPage * this.data.listRange >= this.data.listCount) {
                this.setData({ isLoading: false, })
                return
            }
            
        }

    },

    //准备完成
    ready() {
    },
    methods: {

        /**
         * @method list初始化
         */
        listInit(listRange){
            
            this.setData({
                listPage:1,
                listRange: listRange || 20,
                listCount: 0,
                list: [],
                listResData: {},
                isLoading:true,
            })
        },

        // /**
        //  * @method list刷新增加
        //  */
        // listUpdate(){
        //     if (this.data.listPage * this.data.listRange >= this.data.listCount) {
        //         this.setData({ isLoading:false,})
        //         return 
        //     }
        //     //TODO 请求
        // },





        







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