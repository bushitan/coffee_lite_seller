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
        PAYMENT_STATUS_PAID: 30, // 已经支付

        TAB_PAY: TAB_PAY,
        TAB_BACK: TAB_BACK,
        TabCur: TAB_PAY,
        SortMenu: [
            { id: TAB_PAY, name: "收银", },
            { id: TAB_BACK, name: "作废", },
            // { id: 2, name: "已处理", },
        ],
        shopID:"",

        list:[],
        showDetail:false,
        order:{},

        summary:{},

        showVoide:false,
        reason:"",//作废备注
    },

    behaviors:[dateBehaviors],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({
            shopID: options.shopID || ""  ,   
            CreatedAtMin: util.today,  
            // CreatedAtMin: "2020-01-01",
            CreatedAtMax: util.today,
        })
        this.onInit()
    },
    
    onInit(){
        if(this.data.TabCur == 0)
            this.getOrderList(true)
        else
            this.getOrderList(false)
        // this.getOrderSummary()
    },
    
     // 点击tab
    async tabSelect(e) {
        console.log(e)
        var id = e ? e.currentTarget.dataset.tab_id : this.data.TabCur
        this.setData({
            TabCur: id,
            // list: [],
        })
        this.onInit()
    },

    async getOrderList(isComplete){
        var res = await app.db3.productGetOrderList({
            Page:1,
            Limit:100,
            ShopId: this.data.shopID,
            FilterStatus: isComplete ? 4 : 32,// 4已完成   32已取消（作废）
            StartDate: this.data.CreatedAtMin,
            EndDate: this.data.CreatedAtMax,
        })


        this.setData({
            list: res.data
        })
    },


    toDetail(e){
        var index = e.currentTarget.dataset.index
        this.setData({
            showDetail:true,
            order: this.data.list[index]
        })
    },

    closeDetail(){  this.setData({  showDetail: false })  },

    switchVoide(){ this.setData({ showVoide: !this.data.showVoide }) },

    // async setVoideOrder(e){
        
    // },

    // 输入作废信息
    inputReason(e){
        this.setData({
            reason: e.detail.value
        })
    },

    async confirmVoideOrder(e){
        if(this.data.reason.length == 0){
            wx.showToast({
              title: '请输入备注',
              icon:"loading",
              duration:1000,
            })
            return
        }
        var order_id = e.currentTarget.dataset.order_id
        wx.showModal({
            title:"是否作废该订单",
            success:()=>{
                app.db3.productVoideOrder({
                    orderId:order_id,
                    reason:this.data.reason,
                }).then(res=>{
                    if(res.code == -1){
                        wx.showModal({ title:res.msg })
                        return 
                    } 
                    
                    wx.showModal({ title:res.msg })
                    this.removeVoideOrder(order_id) //移除订单
                    this.closeDetail()
                    this.switchVoide()
                })
                
            }
        })
       
    },

    //TODO 移除该订单
    removeVoideOrder(order_id){
        var list = this.data.list
        for(var i=0;i<list.length ;i++)
            if(list[i].id == order_id){
                list.splice(i,1)
                break
            }
        this.setData({ list:list })
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