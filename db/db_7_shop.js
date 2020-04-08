

// import dbFather from '../db/db_customer.js'
var dbFather = require('db_6_stats.js')
class dbStats extends dbFather {

    KEY_SHOP_SESSION = "shop_session"
    constructor() {
        super()
    }

    WM_URL = "https://wm.51zfgx.com/"

    STORE_TAKE_TYPE_WM = 1 // 外卖
    STORE_TAKE_TYPE_ZQ = 2 // 到店自取
    STORE_TAKE_TYPE_TS = 4 // 堂食
    
    PAYMENT_STATUS_PENDING = 10 // 待支付
    PAYMENT_STATUS_AUTHORIZED = 20 // 待支付
    PAYMENT_STATUS_PAID = 30 // 已经支付
    PAYMENT_STATUS_REFUND = 40 // 退款
    PAYMENT_STATUS_CANCEL = 50 // 取消支付
    PAYMENT_STATUS_REFUND_APPLY = 60 // 申请退款

    ORDER_STATUS_PENDING = 10 // 订单待处理
    ORDER_STATUS_PROCESSING = 20 // 订单处理中
    ORDER_STATUS_COMPLETE = 30 // 订单已完成
    ORDER_STATUS_CANCEL = 40 // 订单已取消
    // ORDER_STATUS_CANCEL = 50 // 订单拒单

    SELLER_PENDING = 1 // 商家未处理  使用
    SELLER_PROCESSING = 2 // 商家处理中
    SELLER_COMLETE = 4 // 商家已完成   使用
    SELLER_RIDING = 8 // 配送中   使用
    SELLER_REFUND = 16 // 商家已退款
    SELLER_CANCEL = 32 // 商家已取消

    SHIP_STATUS_NOT_REQUIRED = 10 //不需要配送
    SHIP_STATUS_NOT_YET = 20 //未配送
    SHIP_STATUS_PARTIALLY = 25 //部分已配送
    SHIP_STATUS_ING = 30 //配送中
    SHIP_STATUS_DELIVER = 40 //已送达
    SHIP_STATUS_CANCEL = 50 //已取消
    SHIP_STATUS_EXCEPTION = 60 //顺丰报错


    // 封装基础的请求
    orderRequest(options) {
        return new Promise((resolve, reject) => {
            var data = options.data || {}
            data['Session'] = wx.getStorageSync(this.KEY_SHOP_SESSION)
            data['AppId'] = "7016db59b1e84bd1a84f4e974074fa78"
            // data['Session'] = "5IRWgui7bOjkYGlrvi766K9mKd2tRwIgC4WzmK+7X+CZp7kSGSmJSIqltssQ/OrB9p2lDvRpvUin0yjie7GJ7mZb5PXUZTTlx8w737wzdRzwrePHmYWLj4bUvFUrzWCjB6YaLiWte5+/W7YZrm6CzseU4jAvZ3vckhY+T+qfdrCrtig+LpW4XNwmw3sWuotpQehImOyje4aK2zIQ/8UF6PoM/EgItRoOGfplfX0FuESN4z+Fd6vjxAcxHrhuzJ6RLOCiL+0gTCka+kRdZERzxXl262keOsnn1X6CvwZfFKeFckWkF4NYPw1ES5ELF0q2+aiznxXSXzUzatU5xirc1XcySPMCSzLbjd+8DTaWs4l11GTOXxqxIQTecC857+rCBHOjFB3lI8g="
            

            var startTime = new Date().getTime();
            // console.log('startTime', startTime)

            wx.showLoading({ title: "" ,mask:true})
            wx.request({
                url: options.url,
                method: options.method || "POST",
                header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                data: data,
                success(res) {
                    wx.hideLoading()
                    var completeTime = new Date().getTime();
                    console.log(options.url, ":", completeTime - startTime)
                    resolve(res.data)
                },
                fail(res) {
                    wx.hideLoading()
                    console.log("请求错误：" + options.url, res)
                    reject(res)
                },
            })
        })
    }

    /**
     * @method 1 商户端登陆
     * @return
     */
    shopLogin(data) {
        return new Promise((resolve, reject) => {
            var that = this
            wx.login({
                success(res){
                    console.log(res.code)
                    that.orderRequest({
                        url: that.WM_URL + "api/gettoken/",
                        data: { Code:res.code},
                        method: "POST",
                    }).then(res => {
                        console.log("shopLogin:",res.data)
                        // resolve(res)
                        if(res.code == 0 ){
                            wx.setStorageSync(that.KEY_SHOP_SESSION,res.data.session)
                        }
                        resolve(res)
                        }).catch(res => reject(false))
                }
            })
            
        })
    }


    /**
     * @method 1 获取海报封面
     * @return
     *      isSeller:true,  //是否这个点的人员
            isHost:true,    //是否店主
     */
    shopAdmin(data) {
        return new Promise((resolve, reject) => {
            this.orderRequest({
                url: this.WM_URL + "api/lite/cover/SellerGetCover/",
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }


	/**
	 * @method 1 获取订单列表
	 * @param  
		  "Limit": 0,
		  "Page": 0,
          FilterStatus
        
	 */
    orderGetList(data) {
        return new Promise((resolve, reject) => {
            // wx.showLoading({ title: "加载中" })
            this.orderRequest({ url: this.WM_URL + "api/seller/getorderslist/", data: data, })
                .then(res => {
                    // wx.hideLoading()
                    resolve(res)
                })
                .catch(res => {
                    // wx.hideLoading()
                    reject(res)
                })
        })
    }


	/**
	 * @method 2 获取订单数
	 * @param 
		CreatedAtMin
		CreatedAtMax
		Status
		PaymentStatus
		ShippingStatus
		CustomerId
		AppId
		Session

	 */
    orderGetCount(data) {
        return new Promise((resolve, reject) => {
            this.orderRequest({ url: this.WM_URL + "api/orders/count/", data: data, }).then(res => { resolve(res) }).catch(res => reject(res))
        })
    }


	/**
	 * @method 3  获取具体订单项
	 * @param 
	 * 		orderId
			Limit
			Page
			SinceId
			Fields
			AppId
			Session
	 */
    orderGetDetail(data) {
        return new Promise((resolve, reject) => {
            this.orderRequest({ url: this.WM_URL + "api/orders/getdetail/", data: data, }).then(res => { resolve(res) }).catch(res => reject(res))
        })
    }
	/**
	 * @method 4  更新某一订单项状态
	 * @param 
	 	orderId
		orderItemId
		orderItemDelta
	 */
    orderItemUpdate(data) {
        return new Promise((resolve, reject) => {
            this.orderRequest({ url: this.WM_URL + "api/orders/updateitem/", data: data, }).then(res => { resolve(res) }).catch(res => reject(res))
        })
    }

    /**
     * @method 5 订单发货 堂食下下单
     * @param 
         orderId
    */
    orderShippingStore(data) {
        return new Promise((resolve, reject) => {
            this.orderRequest({ url: this.WM_URL + "api/orders/shipping/", data: data, }).then(res => { resolve(res) }).catch(res => reject(res))
        })
    }


    /**
     * @method 6 订单发货 顺丰下单
     * @param 
         orderId
    */
    orderShippingSF(data) {
        return new Promise((resolve, reject) => {
            this.orderRequest({ url: this.WM_URL + "api/sfship/createorder/", data: data, }).then(res => { resolve(res) }).catch(res => reject(res))
        })
    }


    /**
     * @method 7.1 确认退款
     * @param 
         orderId
    */
    orderConfirmrefund(data) {
        return new Promise((resolve, reject) => {
            this.orderRequest({ url: this.WM_URL + "api/orders/confirmrefund/", data: data, }).then(res => { resolve(res) }).catch(res => reject(res))
        })
    }

    /**
     * @method 7.2 拒单 【商户专用】
     * @param 
         orderId
    */
    orderSellerReject(data) {
        return new Promise((resolve, reject) => {
            this.orderRequest({ url: this.WM_URL + "api/seller/rejectorder/", data: data, }).then(res => { resolve(res) }).catch(res => reject(res))
        })
    }


    /**
     * @method 8.1 订单信息
     * @param 
         orderId
    */
    orderRiderInfo(data) {
        return new Promise((resolve, reject) => {
            this.orderRequest({ url: this.WM_URL + "api/ship/getcallbackinfo/", data: data, }).then(res => { resolve(res) }).catch(res => reject(res))
        })
    }

    /**
   * @method 8.2 骑手位置
   * @param 
       orderId
  */
    orderRiderPosition(data) {
        return new Promise((resolve, reject) => {
            this.orderRequest({ url: this.WM_URL + "api/ship/riderlatestposition/", data: data, }).then(res => { resolve(res) }).catch(res => reject(res))
        })
    }
    /**
     * @method 8.3 骑手 H5
     * @param 
         orderId
    */
    orderRiderH5(data) {
        return new Promise((resolve, reject) => {
            this.orderRequest({ url: this.WM_URL + "api/ship/riderviewv2/", data: data, }).then(res => { resolve(res) }).catch(res => reject(res))
        })
    }

    /**
      * @method 9.1 取消顺风订单
      * @param 
          orderId
     */
    orderSFCancel(data) {
        return new Promise((resolve, reject) => {
            this.orderRequest({ url: this.WM_URL + "api/ship/cancelorder/", data: data, }).then(res => { resolve(res) }).catch(res => reject(res))
        })
    }

    /**
      * @method 9.2 强制退款
      * @param 
          orderId
     */
    orderForcerFund(data) {
        return new Promise((resolve, reject) => {
            this.orderRequest({ url: this.WM_URL + "api/orders/forcerefund/", data: data, }).then(res => { resolve(res) }).catch(res => reject(res))
        })
    }
    /**
      * @method 9.3 强制订单作废
      * @param 
          orderId
     */
    orderVoide(data) {
        return new Promise((resolve, reject) => {
            this.orderRequest({ url: this.WM_URL + "api/orders/voidedorder/", data: data, }).then(res => { resolve(res) }).catch(res => reject(res))
        })
    }
    /**
      * @method 9.4 强制完成订单
      * @param 
          orderId
     */
    orderOver(data) {
        return new Promise((resolve, reject) => {
            this.orderRequest({ url: this.WM_URL + "api/orders/overorder/", data: data, }).then(res => { resolve(res) }).catch(res => reject(res))
        })
    }

    /************门店配置、产品配置*************/
    /**
      * @method 10.1  查询店铺
     */
    shopConfigStore(data) {
        return new Promise((resolve, reject) => {
            this.orderRequest({ url: this.WM_URL + "api/stores/", data: data, }).then(res => { resolve(res) }).catch(res => reject(res))
        })
    }
    /**
     * @method 10.2  修改营业状态
    */
    shopUpdate(data) {
        return new Promise((resolve, reject) => {
            this.orderRequest({ url: this.WM_URL + "api/store/update/", data: data, }).then(res => { resolve(res) }).catch(res => reject(res))
        })
    }
    /**
      * @method 10.3  查询店铺的产品
     */
    shopGetProduct(data) {
        return new Promise((resolve, reject) => {
            this.orderRequest({ url: this.WM_URL + "api/category/products/", data: data, }).then(res => { resolve(res) }).catch(res => reject(res))
        })
    }


    /**
     * @method 2.2 上传客户信息
     * @param 
     */
    customerSetInfo(data) {
        return new Promise((resolve, reject) => {
            this.base({ url: this.HOST_URL + "api/customer/updatewxinfo/", data: data, }).then(res => { resolve(res.data) }).catch(res => reject(res))
        })
    }
    
}


module.exports = dbStats