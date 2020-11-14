// pages3/menu/menu.js

// "navigationStyle": "custom",
var ProductsBehaviors = require('js/products.js')
var OrderBehaviors = require('js/order.js')
var ItemBehaviors = require('js/item.js')
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        SpaceBottom: 0,
        // CustomBar: app.globalData.CustomBar,
        CustomBar:40,
        showReLoad: false,

        // swiperHeight: '375rpx',
        swiperHeight: '0rpx',

        // list: [],
        // tabCur: 0,
        // mainCur: 0,
        // verticalNavTop: 0,
        load: true,

        showChoice: false, //展示详情
        showOrder: false, // 展示账单
        // 当前选择的蟾皮								
        // currentItem: {
        // },

        shopID: "",
        categoryIndex: 0,  // 当前选择的目录
        itemIndex: 0, // 当前选择产品标志位
        attIndex: 0, //属性标志位
        valueIndex: 0,// 值标志位

        // key: "123", //订单对应的 标签序列号
        // order: {
        //     // '0_0_0_0':{Quantity:0}
        // }, //订单数据
        // totalPrice: 0,
        // totalQuantity: 0,
    },

    behaviors: [ProductsBehaviors, OrderBehaviors, ItemBehaviors],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            shopID: options.shopID || ""
        })
        this.onInit()
    },
    async onInit() {
        this.productInit()
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
        this.itemSKUInit()
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

        this.indexSet(e)
        this.addItem()

    },
    // 在订单点点击增删按钮
    cutOrder(e) {
        if (Object.keys(this.data.order).length == 0) // 防止出现负数
            return 
        this.indexSet(e)
        this.cutItem()
        if (Object.keys(this.data.order).length == 0)
            this.closeShow()
        // console.log(this.data.order.length)
    },

    indexSet(e){

        var categoryIndex = e.currentTarget.dataset.categoryindex
        var itemIndex = e.currentTarget.dataset.itemindex
        var attIndex = e.currentTarget.dataset.attindex
        var valueIndex = e.currentTarget.dataset.valueindex
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
            url: "/pages3/order/order"
        })
    },



    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }











    /////////////////公共工具///////////////
    // // 初始化选择框
    // initSelect() {
    //     var currentItem = this.data.currentItem
    //     // 初始化订单数据
    //     for (var i = 0; i < currentItem.attributes.length; i++) {
    //         for (var j = 0; j < currentItem.attributes[i].attributeValues.length; j++) {
    //             if (j == 0)
    //                 currentItem.attributes[i].attributeValues[j].isSelect = true
    //             else
    //                 currentItem.attributes[i].attributeValues[j].isSelect = false
    //         }
    //     }
    // },
    // // 设置当前订单
    // itemSet() {
    //     console.log(this.data.categoryIndex, this.data.itemIndex, this.data.list[this.data.categoryIndex].products[this.data.itemIndex])

    //     this.setData({ currentItem: {} })
    //     this.setData({ currentItem: this.data.list[this.data.categoryIndex].products[this.data.itemIndex]})
    // },
    // 设置key
    // orderKeySet() {
    //     var key = this.data.categoryIndex + "_" + this.data.itemIndex + "_"
    //     var currentItem = this.data.currentItem
    //     for (var i = 0; i < currentItem.attributes.length; i++) {
    //         for (var j = 0; j < currentItem.attributes[i].attributeValues.length; j++) {
    //             if (currentItem.attributes[i].attributeValues[j].isSelect == true) {
    //                 key = key + i + "_" + j + "_"
    //             }
    //         }
    //     }
    //     // this.data.key = key
    //     this.setData({
    //         key: key
    //     })
    // },

    // // 更新已选择订单order
    // orderChange(isAdd) {
    //     var order = this.data.order
    //     // var currentItem = this.data.list[this.data.categoryIndex].products[this.data.itemIndex] // 当前
    //     var currentItem = this.data.currentItem
    //     var Attributes = []	//上传属性列表		
    //     var attDes = "" // 属性描述
    //     for (var i = 0; i < currentItem.attributes.length; i++) {
    //         for (var j = 0; j < currentItem.attributes[i].attributeValues.length; j++) {
    //             if (currentItem.attributes[i].attributeValues[j].isSelect == true) {
    //                 Attributes.push({
    //                     "Id": currentItem.attributes[i].productAttributeID,
    //                     "Value": currentItem.attributes[i].attributeValues[j].id
    //                 })
    //                 attDes = attDes + currentItem.attributes[i].attributeValues[j].name + "、"
    //             }
    //         }
    //     }
    //     attDes = attDes.substr(0, attDes.length - 1);  // 删除最后一个字符
    //     var key = this.data.key
    //     if (order.hasOwnProperty(key) == false) {
    //         order[key] = {
    //             // 下单需要参数
    //             ProductId: currentItem.id,
    //             Quantity: 1,
    //             Attributes: Attributes,
    //             // 展示需要参数
    //             cover: currentItem.imgs ? currentItem.imgs[0] ? currentItem.imgs[0].src : "" : "",
    //             name: currentItem.name,
    //             price: currentItem.price,
    //             total: parseFloat(currentItem.price).toFixed(2),
    //             attDes: attDes,
    //             // 订单位置标记
    //             categoryIndex: this.data.categoryIndex,  // 当前选择的目录
    //             itemIndex: this.data.itemIndex, // 当前选择产品标志位
    //             attIndex: this.data.attIndex, //属性标志位
    //             valueIndex: this.data.valueIndex,// 值标志位

    //         }
    //     } else {
    //         if (isAdd)
    //             order[key].Quantity += 1
    //         else {
    //             order[key].Quantity -= 1
    //             order[key].Quantity < 0 ? 0 : order[key].Quantity
    //         }
    //         order[key].total = parseFloat(order[key].Quantity * order[key].price).toFixed(2)
    //     }

    //     // 删除key下的数据
    //     if (order[key].Quantity <= 0)
    //         delete order[key]
    //     // this.data.order = []
    //     // this.data.order = order

    //     this.setData({
    //         order: order
    //     })


    //     // console.log(key,Attributes,attDes)

    //     // order[key] = OrderItems
    // },

    // // 更新menu，选项卡的数量
    // productNumSet(isAdd) {
    //     var list = this.data.list
    //     // debugger
    //     if (list[this.data.categoryIndex].products[this.data.itemIndex].hasOwnProperty("num") == false)
    //         list[this.data.categoryIndex].products[this.data.itemIndex].num = 0

    //     if (isAdd)
    //         list[this.data.categoryIndex].products[this.data.itemIndex].num += 1
    //     else {

    //         list[this.data.categoryIndex].products[this.data.itemIndex].num -= 1
    //         list[this.data.categoryIndex].products[this.data.itemIndex].num < 0 ? 0 : list[this.data.categoryIndex].products[this.data.itemIndex].num
    //     }

    //     // this.data.list = []
    //     // this.data.list = list
    //     this.setData({
    //         list: list
    //     })
    // },

    // orderTotalSet() {
    //     var totalPrice = 0
    //     var totalQuantity = 0
    //     var order = this.data.order
    //     for (var i in order) {
    //         totalPrice += order[i].Quantity * order[i].price
    //         totalQuantity += order[i].Quantity
    //     }
    //     console.log(totalPrice, totalQuantity)
    //     this.setData({
    //         totalPrice: parseFloat(totalPrice).toFixed(2),
    //         totalQuantity: parseInt(totalQuantity),
    //     })
    // },



})