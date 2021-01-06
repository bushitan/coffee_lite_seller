// pages3/menu/menu.js

var ProductsBehaviors = require('../../../behaviors/sku/products.js')
var OrderBehaviors = require('../../../behaviors/sku/order.js')
var ItemBehaviors = require('../../../behaviors/sku/item.js')
var MirrorBehaviors = require('../../../behaviors/mirror.js') // 镜像控制
var EntryOrderBehaviors = require('behaviors/entry_order.js') // 镜像控制
var app = getApp()
console.log(ProductsBehaviors)
Page({

    /**
     * 页面的初始数据
     */
    data: {
        spaceXXL: "60rpx",
        spaceXL: "30rpx",

        SpaceBottom: 0,
        // CustomBar: app.globalData.CustomBar,
        CustomBar:40,
        showReLoad: false,
        swiperList:[
            "https://wm.51zfgx.com/images/thumbs/0001241_soe12oz.jpeg",
            "https://wm.51zfgx.com/images/thumbs/0003571.jpeg",
        ],

        // swiperHeight: '375rpx',
        swiperHeight: '0rpx',

        load: true,

        showChoice: false, //展示详情
        showOrder: false, // 展示账单
        shopID: "",
        

    },

    behaviors: [app.configBehaviors, ProductsBehaviors, OrderBehaviors, ItemBehaviors, MirrorBehaviors, EntryOrderBehaviors],






    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            shopID: options.shopID || ""
        })

        // this.setData({
        //     list: wx.getStorageSync("menu_test")
        // })
        // return

        this.getTest()

        this.onInit()
        this.getStore()

    },
    async onInit() {
        this.productInit()
        this.setData({
            order: wx.getStorageSync("order") || {}
        })
        this.orderTotalSet() // 计算总价
    },   
    // 获取门店信息
    async getStore() {

        var res = await app.db.product.productGetStoreInfo({
            ShopId: this.data.shopID
        })


        this.setData({
            store: res.data
        })
    },

    // 点击事件
    // 展示产品详情
    async openDetail(e) {
        
        var categoryIndex = e.currentTarget.dataset.categoryindex
        var itemIndex = e.currentTarget.dataset.itemindex
        
        // 初始化订单数据		
        // debugger					
        this.setData({
            showChoice: true,
            categoryIndex: categoryIndex,
            itemIndex: itemIndex,
        })

        this.itemSet()
        this.itemSKUInit() // 初始化sku选项
        this.itemGetSKUPrice() // 根据sku请求价格
        this.orderKeySet() // 初始化key

        // this.initSelect()  // 点击窗口后，初始化选择框	
        // this.orderKeySet() // 初始化key

    },

    // 确定订单
    confirmDetail() { this.setData({ showChoice: false, }) },
    // 展示订单
    openBill() { this.setData({ showOrder: true, }) },
    // 关闭模态框
    closeShow() { this.setData({ showChoice: false, showOrder: false, }) },

    // 清空收货栏
    clearOrder(){
        wx.showModal({
            title: '是否清空已点菜单',
            success:(res)=>{
                if(res.confirm){
                    this.orderClear()
                    this.closeShow()
                }
               
            }
        })       
       
    },

    // 切换SKU
    clickAtt(e) {
        this.itemSKUSet(e)
        this.itemGetSKUPrice()
        this.orderKeySet()

    },

    // 在sku增加数量
    addItem() {
        console.log("+")
        this.itemSet()
        this.productNumSet(true)
        this.orderKeySet()
        this.orderChange(true)
        this.orderTotalSet()

        wx.setStorageSync("order", this.data.order)
    },
    // 在sku减少数量
    cutItem() {
        console.log("-")
        this.itemSet()
        this.productNumSet(false)
        this.orderKeySet()
        this.orderChange(false)
        this.orderTotalSet()

        wx.setStorageSync("order", this.data.order)
    },

    // 订单内的增删
    addOrder(e) {
        var key = e.currentTarget.dataset.key
        this.indexSet(e)
        // this.addItem()
        this.itemSet()
        this.productNumSet(true)
        this.orderKeySet()
        this.orderBtnAdd(key)
        // this.orderChange(true)
        this.orderTotalSet()
        wx.setStorageSync("order", this.data.order)

    },
    // 在订单点点击增删按钮
    cutOrder(e) {
        var key = e.currentTarget.dataset.key
        if (Object.keys(this.data.order).length == 0) // 防止出现负数
            return
        this.indexSet(e)
        // this.cutItem()

        this.itemSet()
        this.productNumSet(false)
        this.orderKeySet()
        // this.orderChange(false)
        this.orderBtnCut(key)
        this.orderTotalSet()

        wx.setStorageSync("order", this.data.order)
        if (Object.keys(this.data.order).length == 0)
            this.closeShow()
        // console.log(this.data.order.length)
    },


    indexSet(e){

        var categoryIndex = e.currentTarget.dataset.categoryindex
        var itemIndex = e.currentTarget.dataset.itemindex
        var attIndex = e.currentTarget.dataset.attindex
        var valueIndex = e.currentTarget.dataset.valueindex
        console.log(categoryIndex, itemIndex, attIndex, valueIndex)
        this.setData({
            categoryIndex: categoryIndex,  // 当前选择的目录
            itemIndex: itemIndex, // 当前选择产品标志位
            attIndex: attIndex, //属性标志位
            valueIndex: valueIndex,
        })
    },


    /******路由******/
    toPay() {
        wx.navigateTo({
            url: "/pages_pad/pad/order/order?shopID=" + this.data.shopID
        })
    },

    toList(){
        wx.navigateTo({
            url: "/pages/list/list"
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },




})