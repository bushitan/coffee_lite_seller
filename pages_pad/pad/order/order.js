// pages3/order/order.js
var MirrorBehaviors = require('../../../behaviors/mirror.js') // 镜像控制
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order: { 
            // "0_2_": { "ProductId": 166, "Quantity": 5, "Attributes": [], "cover": "https://wm.51zfgx.com/images/thumbs/0001246_-8-oz.jpeg", "name": "冰博克 （热 8 OZ）", "price": 30, "total": "150.00", "attDes": "", "categoryIndex": 0, "itemIndex": 2, "attIndex": 0, "valueIndex": 0 }, "0_1_": { "ProductId": 146, "Quantity": 2, "Attributes": [], "cover": "https://wm.51zfgx.com/images/thumbs/0000192_12-oz.jpeg", "name": "热美式咖啡（12 OZ）", "price": 22, "total": "44.00", "attDes": "", "categoryIndex": 0, "itemIndex": 1, "attIndex": 0, "valueIndex": 0 }, "0_3_0_0_": { "ProductId": 174, "Quantity": 1, "Attributes": [{ "Id": 135, "Value": 220 }], "cover": "https://wm.51zfgx.com/images/thumbs/0001251_-12-oz.jpeg", "name": "热 伊丽莎白 招牌特调（12 OZ）", "price": 30, "total": "30.00", "attDes": "正常", "categoryIndex": 0, "itemIndex": 3, "attIndex": 0, "valueIndex": 0 } 
            },
        preOrder: {
            order_discount: 1,
            wm_cost: 1,
            order_total: 224,
            order_with_discount: 224,
        },

        store:{},
        shopID:97,
        OrderNote:"",
        noPowerPay: true,

        PayMethod:0, // 0微信支付 1支付宝 2零钱 3银联 4其他 5小杯子优惠GO

        showQR: false,

        machineModel:"phone",
    },

    behaviors: [app.configBehaviors,  MirrorBehaviors],


    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            shopID: options.shopID || ""
        })
        this.onInit()
    },

    onInit(){
        // var orderObj = wx.getStorageSync("order")
        // var order = []
        // for (var i in orderObj) {
        //     order.push(orderObj[i])
        //     // TODO  计算总价
        // }
        // this.setData({
        //     order: order,
        // })	
        
        wx.getSystemInfo().then(res => {
            console.log(res.windowHeight)
            if (res.windowHeight>1000){
                this.setData({ machineModel:"pad"})
            }
        })
        	
        // this.getStore()
        this.getOrder()
        // this.getOrderPrice()
    },

    

    // 获取门店信息
    async getStore(){
        var res = await app.db3.productGetStoreInfo({
            ShopId: this.data.shopID
        })
        this.setData({
            store:res.data
        })
    },
    // 1 获取已经选择的订单
    getOrder() {
        // 获取订单信息
        var orderObj = wx.getStorageSync("order")
        var order = []
        for (var i in orderObj) {
            order.push(orderObj[i])
            // TODO  计算总价
        }
        this.setData({
            order: order,
        })
    },

    // 获取订单点json
    getJson(){
        var jsondata = JSON.stringify({
            "OrderId": 0,//新建订单 默认为零I"				  
            "PaymentMethodSystemName": "Payments.WeixinPay",//支付方式 当前默认微信 硬编码
            "OrderItems": this.data.order,
            "OrderNote": this.data.OrderNote,//订单描述				  
            "ShopId": this.data.shopID,
            "CustomerTakeType": 4, // 默认为自取的方式
        })
        console.log(jsondata)
        return jsondata
    },

    /**
     * 获取订单价格
     *
        // var order = { "OrderId": 0, "PaymentMethodSystemName": "Payments.WeixinPay", "OrderItems": [{ "ProductId": 1337, "Quantity": 1, "Attributes": [], "cover": "https://wm.51zfgx.com/images/thumbs/0002509.jpeg", "name": "遇见好书推荐《章鱼先生卖雨伞》", "price": 28, "total": "28.00", "attDes": "", "categoryIndex": 0, "itemIndex": 1, "attIndex": 0, "valueIndex": 0 }], "OrderNote": "", "ShopId": 8, "CustomerTakeType": 4, "WishDateTime": "16:24", "ReceiverPhone": "123", "AddressId": 1302 }
        // var jsondata = JSON.stringify(order)
     */
    async getOrderPrice(){       
        var res = await app.db3.productGetPrice({ 
            jsondata: this.getJson() 
        })

        console.log(res)

        // 错误提示
        if (res.code == -1) {
            this.setData({ noPowerPay: true, })
            return
        }
        if (res.code == -2) {
            uni.showModal({
                title: res.msg,
                success() {
                    // uni.switchTab({
                    //     url: "/pages/live/live"
                    // })
                },
            })
            return
        }

        // 成功
        this.setData({
            preOrder:res.data,
            noPowerPay: false,
        })
        console.log(res)
    },

    /**
     * @method 下单
     */
    async getOrderGen(){
        var res = await app.db3.productGen({
            jsondata: this.getJson()
        })

        if (res.code == -2) {
            uni.showModal({
                title: res.msg,
                success() {
                    // uni.switchTab({
                    //     url: "/pages/live/live"
                    // })
                },
            })
            return
        }

        var OrderId = res.data.id
        console.log(res)

        var res = await app.db3.productFinish({
            OrderId: OrderId,
            PayMethod: this.data.PayMethod, // 0微信支付 1支付宝 2零钱 3银联 4其他
            Reason:"",
        })
        if(res.code == 0){
            wx.showModal({
                title:"下单成功",
                cancelText:"返回",
                confirmText:"继续点单",
                success:res=>{
                    if(res.confirm){
                        var page = getCurrentPages()
                        var prePage = page[page.length - 2]
                        prePage.orderClear()
                        wx.navigateBack()
                    }

                    else
                        wx.switchTab({
                            url: "/pages3/index/index"
                        })
                }
            })
            
        }
    },

    /**
     * @method  下单 pad版本
     */
    async genOrder(){
        if(this.data.PayMethod == 0){
            //TODO 请求微信订单
            //1 请求订单
            //2 显示二维码【订单id和安全验证码】
            //3 顾客扫码，拉取订单，支付
            //4 轮询顾客支付是否成功
            return 
        }
        if (this.data.PayMethod == 1) {
            //打开支付宝二维码
            this.openShowQR()
            return 
        }
        

        // 其他方式，直接落单
        var method = "零钱"
        if (this.data.PayMethod == 3) method = "银联"
        if (this.data.PayMethod == 4) method = "其他" 
        wx.showModal({
            title: '使用"' + method + '"付款'
        }).then(res=>{
            console.log(res)
            if(res.confirm)
                this.getOrderGen()
        })

        
    },

    confirmZFB(){
        this.getOrderGen()
    },


    /**
        @Method  选择结账方式
        0微信支付 1支付宝 2零钱 3银联 4其他 5小杯子优惠GO
     */
    switchPayMethod(){
      
        var itemList = [ "微信支付" , "支付宝","零钱","银联 ","其他"]
        wx.showActionSheet({
            itemList: itemList,
            success:res=>{
                // var PayMethod
                // switch (res.tapIndex) {
                //     case 0 : PayMethod = 5 ; break;                
                //     default : PayMethod = res.tapIndex - 1;break;
                // }
                var PayMethod = res.tapIndex 
                this.setData({
                    PayMethod:PayMethod
                })
            }
        })

        
    },

    openShowQR() { this.setData({ showQR: true, }) },
    closeShowQR() { this.setData({ showQR: false, }) },


 
    // 输入备注内容
    inputOrderNote(e){ this.setData({OrderNote:e.detail.value}) },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})