// pages3/total/total.js
var app = getApp()
var TAB_PAY = 0
var TAB_BACK = 1
var util = require('../../utils/util.js')
var dateBehaviors = require('../../utils/date_behaviors.js')
 
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // PAYMENT_STATUS_PAID: 30, // 已经支付


        shopID:"",

        // list:[],
        // showDetail:false,
        // order:{},

        summary:{},
    },
    behaviors:[dateBehaviors],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({
            shopID: options.shopID || "",            
            CreatedAtMin: util.today,
            CreatedAtMax: util.today,
        })
        this.onInit()
    },
    
    onInit(){
        this.getOrderSummary()
    },

    /**
     * @method 点单点总统计结果
     */
    async getOrderSummary(){
        var res = await app.db3.productGetOrderSummary({
            ShopId: this.data.shopID,
            PayMethod: -1
        })
        this.setData({
            summary:res.data
        })
        console.log(res)
    },


    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})



    // async getOrderList(){
    //     var res = await app.db3.productGetOrderList({
    //         Page:1,
    //         Limit:100,
    //         ShopId: this.data.shopID,
    //         PayMethod: -1
    //     })


    //     this.setData({
    //         list: res.data
    //     })
    // },

    // toDetail(e){
    //     var index = e.currentTarget.dataset.index
    //     this.setData({
    //         showDetail:true,
    //         order: this.data.list[index]
    //     })
    // },

    // closeDetail(){
    //     this.setData({
    //         showDetail: false
    //     })
    // },