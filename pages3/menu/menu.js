// pages3/menu/menu.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        SpaceBottom: 0,
        CustomBar: app.globalData.CustomBar,
        showReLoad: false,

        list: [],
        tabCur: 0,
        mainCur: 0,
        verticalNavTop: 0,
        load: true,

        showChoice: false, //展示详情
        showOrder: false, // 展示账单
        // 当前选择的蟾皮								
        currentItem: {
            imgs: [
                { src: "" },
            ],
            tags: [],
            attributes: [
                {
                    isSelect: false,
                    productAttributeName: "",
                    attributeValues: [],
                },
            ],
        },

        categoryIndex: 0,  // 当前选择的目录
        itemIndex: 0, // 当前选择产品标志位
        attIndex: 0, //属性标志位
        valueIndex: 0,// 值标志位

        key: "", //订单对应的 标签序列号
        order: {
            // '0_0_0_0':{Quantity:0}
        }, //订单数据
        totalPrice: 0,
        totalQuantity: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onInit()
    },
    async onInit() {
        // var res = app.db3.customerGetToken()


        var res = await app.db3.productMenu({
            shopId:14
        })
        if (res.code == 0) {
            var temp = res.data
            for (var i = 0; i < temp.length; i++)
                temp[i].id = i
            this.setData({
                list: temp,
                showReLoad: false
            })
        } else {
            this.setData({ showReLoad: true })
        }
        console.log(res)
    },



    tabSelect(e) {
        this.setData({
            tabCur: e.currentTarget.dataset.id,
            mainCur: e.currentTarget.dataset.id,
            verticalNavTop: (e.currentTarget.dataset.id - 1) * 50
        })
    },
    VerticalMain(e) {
        let that = this;
        let list = this.data.list;
        let tabHeight = 0;
        if (this.data.load) {
            for (let i = 0; i < list.length; i++) {
                let view = wx.createSelectorQuery().select("#main-" + list[i].id);
                view.fields({
                    size: true
                }, data => {
                    list[i].top = tabHeight;
                    tabHeight = tabHeight + data.height;
                    list[i].bottom = tabHeight;
                }).exec();
            }
            that.setData({
                load: false,
                list: list
            })
        }
        let scrollTop = e.detail.scrollTop + 20;
        for (let i = 0; i < list.length; i++) {
            if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
                that.setData({
                    verticalNavTop: (list[i].id - 1) * 50,
                    tabCur: list[i].id
                })
                return false
            }
        }
    },

    // 点击事件
    // 展示产品详情
    async openDetail(e) {
        
        var categoryIndex = e.currentTarget.dataset.categoryindex
        var itemIndex = e.currentTarget.dataset.itemindex
        // var currentItem = this.data.list[categoryIndex].products[itemIndex] 
        // console.log(currentItem)
        // 初始化订单数据							
        this.setData({
            showChoice: true,
            categoryIndex: categoryIndex,
            itemIndex: itemIndex,
            // currentItem:currentItem
        })

        this.updateCurrentItem()
        this.initSelect()  // 点击窗口后，初始化选择框	
        this.updateKey() // 初始化key

    },

    // 确定订单
    confirmDetail() { this.setData({ showChoice: false, }) },
    // 展示订单
    openBill() { this.setData({ showOrder: true, }) },
    // 关闭模态框
    closeShow() { this.setData({ showChoice: false, showOrder: false, }) },

    // 切换SKU
    clickAtt(attIndex, valueIndex) {
        var categoryIndex = this.data.categoryIndex
        var itemIndex = this.data.itemIndex
        var currentItem = this.data.currentItem
        for (var i = 0; i < currentItem.attributes[attIndex].attributeValues.length; i++) { //将已经选择的置false
            currentItem.attributes[attIndex].attributeValues[i].isSelect = false
        }
        currentItem.attributes[attIndex].attributeValues[valueIndex].isSelect = true // 选择SKU
        this.data.currentItem = {}
        this.data.currentItem = currentItem // 更新当前SKU信息
        this.data.attIndex = attIndex		// 更新属性位置	
        this.data.valueIndex = valueIndex	// 更新值位置			
        this.updateKey() //设置当前key为SKU的序列号
    },
    // 增加数量
    addItem() {
        console.log("+")
        this.updateCurrentItem()
        this.updateKey()
        this.updateOrder(true)
        this.updateMenu(true)
        this.updateTotal()

        wx.setStorageSync("order", this.data.order)
    },
    // 减少数量
    cutItem() {
        console.log("-")
        this.updateCurrentItem()
        this.updateKey()
        this.updateOrder(false)
        this.updateMenu(false)
        this.updateTotal()

        wx.setStorageSync("order", this.data.order)
    },

    // 订单内的增删
    addOrder(categoryIndex, itemIndex, attIndex, valueIndex) {
        this.setData({
            categoryIndex: categoryIndex,  // 当前选择的目录
            itemIndex: itemIndex, // 当前选择产品标志位
            attIndex: attIndex, //属性标志位
            valueIndex: valueIndex,
        })
        this.addItem()

    },
    cutOrder(categoryIndex, itemIndex, attIndex, valueIndex) {
        this.setData({
            categoryIndex: categoryIndex,  // 当前选择的目录
            itemIndex: itemIndex, // 当前选择产品标志位
            attIndex: attIndex, //属性标志位
            valueIndex: valueIndex,
        })
        this.cutItem()
        if (Object.keys(this.data.order).length == 0)
            this.closeShow()
        // console.log(this.data.order.length)
    },

    /////////////////公共工具///////////////
    // 初始化选择框
    initSelect() {
        var currentItem = this.data.currentItem
        // 初始化订单数据
        for (var i = 0; i < currentItem.attributes.length; i++) {
            for (var j = 0; j < currentItem.attributes[i].attributeValues.length; j++) {
                if (j == 0)
                    currentItem.attributes[i].attributeValues[j].isSelect = true
                else
                    currentItem.attributes[i].attributeValues[j].isSelect = false
            }
        }
    },
    // 设置当前订单
    updateCurrentItem() {
        this.setData({ currentItem: this.data.list[this.data.categoryIndex].products[this.data.itemIndex], })
    },
    // 设置key
    updateKey() {
        var key = this.data.categoryIndex + "_" + this.data.itemIndex + "_"
        var currentItem = this.data.currentItem
        for (var i = 0; i < currentItem.attributes.length; i++) {
            for (var j = 0; j < currentItem.attributes[i].attributeValues.length; j++) {
                if (currentItem.attributes[i].attributeValues[j].isSelect == true) {
                    key = key + i + "_" + j + "_"
                }
            }
        }
        this.data.key = key
    },

    // 更新已选择订单order
    updateOrder(isAdd) {
        var order = this.data.order
        // var currentItem = this.data.list[this.data.categoryIndex].products[this.data.itemIndex] // 当前
        var currentItem = this.data.currentItem
        var Attributes = []	//上传属性列表		
        var attDes = "" // 属性描述
        for (var i = 0; i < currentItem.attributes.length; i++) {
            for (var j = 0; j < currentItem.attributes[i].attributeValues.length; j++) {
                if (currentItem.attributes[i].attributeValues[j].isSelect == true) {
                    Attributes.push({
                        "Id": currentItem.attributes[i].productAttributeID,
                        "Value": currentItem.attributes[i].attributeValues[j].id
                    })
                    attDes = attDes + currentItem.attributes[i].attributeValues[j].name + "、"
                }
            }
        }
        attDes = attDes.substr(0, attDes.length - 1);  // 删除最后一个字符
        var key = this.data.key
        if (order.hasOwnProperty(key) == false) {
            order[key] = {
                // 下单需要参数
                ProductId: currentItem.id,
                Quantity: 1,
                Attributes: Attributes,
                // 展示需要参数
                cover: currentItem.imgs ? currentItem.imgs[0] ? currentItem.imgs[0].src : "" : "",
                name: currentItem.name,
                price: currentItem.price,
                total: parseFloat(currentItem.price).toFixed(2),
                attDes: attDes,
                // 订单位置标记
                categoryIndex: this.data.categoryIndex,  // 当前选择的目录
                itemIndex: this.data.itemIndex, // 当前选择产品标志位
                attIndex: this.data.attIndex, //属性标志位
                valueIndex: this.data.valueIndex,// 值标志位

            }
        } else {
            if (isAdd)
                order[key].Quantity += 1
            else {
                order[key].Quantity -= 1
                order[key].Quantity < 0 ? 0 : order[key].Quantity
            }
            order[key].total = parseFloat(order[key].Quantity * order[key].price).toFixed(2)
        }

        // 删除key下的数据
        if (order[key].Quantity <= 0)
            delete order[key]
        this.data.order = []
        this.data.order = order


        // console.log(key,Attributes,attDes)

        // order[key] = OrderItems
    },

    // 更新menu，选项卡的数量
    updateMenu(isAdd) {
        var list = this.data.list
        // debugger
        if (list[this.data.categoryIndex].products[this.data.itemIndex].hasOwnProperty("num") == false)
            list[this.data.categoryIndex].products[this.data.itemIndex].num = 0

        if (isAdd)
            list[this.data.categoryIndex].products[this.data.itemIndex].num += 1
        else {

            list[this.data.categoryIndex].products[this.data.itemIndex].num -= 1
            list[this.data.categoryIndex].products[this.data.itemIndex].num < 0 ? 0 : list[this.data.categoryIndex].products[this.data.itemIndex].num
        }

        this.data.list = []
        this.data.list = list
    },

    updateTotal() {
        var totalPrice = 0
        var totalQuantity = 0
        var order = this.data.order
        for (var i in order) {
            totalPrice += order[i].Quantity * order[i].price
            totalQuantity += order[i].Quantity
        }
        console.log(totalPrice, totalQuantity)
        this.setData({
            totalPrice: parseFloat(totalPrice).toFixed(2),
            totalQuantity: parseInt(totalQuantity),
        })
    },




    /******路由******/
    toPay() {
        wx.navigateTo({
            url: "/pages/order/pay"
        })
    },






    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})