// pages4/share/total.js
var app = getApp()
var util = require('../../../utils/util.js')
var dateBehaviors = require('../../../utils/date_behaviors.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // TabCur: 0,
        // SortMenu: [
        //     { id: 0, name: "收款", },
        //     { id: 1, name: "约定追回", },
        //     // { id: 2, name: "已处理", },
        // ],
        // CreatedAtMin: "" ,
        // CreatedAtMax: "",
        // yesterday:util.yesterday,
        // today:util.today,

        list: [],
        shopID: "",
        summary: {},
        bill: {},
    },
    behaviors:[dateBehaviors],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({
            shopID: options.shopID || "",
            type: options.type || "order",
            CreatedAtMin: options.type== "order"? util.today : util.yesterday,
            CreatedAtMax: options.type== "order"? util.today : util.yesterday,
        })
        this.onInit()
    },

    async onInit(){ 
        if (this.isOutDateRange())
            return 
        
        if( this.data.type == "order"){
            var res = await app.db4.shareGetOrderSummary({
                ShopId: this.data.shopID,
                StartDate: this.data.CreatedAtMin,
                EndDate: this.data.CreatedAtMax,
            })
            this.setData({
                summary:res.data
            })
        } else {
            var res = await app.db4.shareGetBillSummary({
                ShopId: this.data.shopID,   
                StartDate: this.data.CreatedAtMin,
                EndDate: this.data.CreatedAtMax,
            })
            this.setData({
                bill: res.data
            })   
        }
             
    },

 

   

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})