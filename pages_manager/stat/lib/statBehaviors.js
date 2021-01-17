
/**
 * 为action目录下，共用的behaviors，为这几个类目提供公共服务
 */


var app = getApp()
var util = require("../../../utils/util.js")
module.exports = Behavior({
    data: {

        // tabbar 和bar 的定位
        tabbarIndex: 0,
        tabIndex: 0,


        startTime: util.getDayFirstTime(new Date()) ,//util.today,
        endTime: util.getDayLastTime(new Date()),//util.today,
    },



    // // 监听器
    // observers: {
    //     // 全局生成config配置参数
    //     'isMirror': function (isMirror) {
    //         console.log(isMirror)
    //         if(isMirror){
    //             this.setData({mirrorScroll : 10000})
    //         } else {
    //             this.setData({ mirrorScroll: 0 })
    //         }
    //         // TODO 检查配置文件是否完整，不完整，在这里补充
    //         // this.setData({
    //         //     config: config
    //         // })

    //     }

    // },

    //准备完成
    // ready() {
        
    // },
    methods: {
        /**
        * @method 更改日期
        * @from 插件nav-dat ，事件bindchoiseDate
        */
        choiseDate(e) {
            // debugger
            console.log(e)
            this.setData({
                startTime: e.detail.startTime,
                endTime: e.detail.endTime
            })
            this.onInit()
        },


        // 点击bar
        clickBar(e) {
            console.log('clickBar', this.data.tabbarIndex, e.detail)
            this.setData({ tabIndex: e.detail })
            this.onInit()
        },

        // 点击bar
        clickTabbar(e) {
            console.log('clickTabbar', e.detail, this.data.tabIndex)
            this.setData({ tabbarIndex: e.detail, tabIndex: 0 })
            this.onInit()
        },



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