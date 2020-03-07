

// import dbFather from '../db/db_customer.js'
var dbFather = require('db_6_stats.js')
class dbStats extends dbFather {

    constructor() {
        super()
    }

    WM_URL = "https://wm.51zfgx.com/"
    PAYMENT_STATUS_PENDING = 10 // 待支付
    PAYMENT_STATUS_AUTHORIZED = 20 // 待支付
    PAYMENT_STATUS_PAID = 30 // 已经支付
    PAYMENT_STATUS_REFUND = 40 // 退款
    PAYMENT_STATUS_CANCEL = 50 // 取消支付

    ORDER_STATUS_PENDING = 10 // 订单待处理
    ORDER_STATUS_PROCESSING = 20 // 订单处理中
    ORDER_STATUS_COMPLETE = 30 // 订单已完成
    ORDER_STATUS_CANCEL = 40 // 订单已取消
    // 封装基础的请求
    orderRequest(options) {
        return new Promise((resolve, reject) => {
            var data = options.data || {}
            // data['customer_uuid'] = wx.getStorageSync(this.KEY_UUID)
            data['AppId'] = "5099f520489646d28ce9df352237c059"
            data['Session'] = "5IRWgui7bOjkYGlrvi766K9mKd2tRwIgC4WzmK+7X+CZp7kSGSmJSIqltssQ/OrB9p2lDvRpvUin0yjie7GJ7mZb5PXUZTTlx8w737wzdRzwrePHmYWLj4bUvFUrzWCjB6YaLiWte5+/W7YZrm6CzseU4jAvZ3vckhY+T+qfdrCrtig+LpW4XNwmw3sWuotpQehImOyje4aK2zIQ/8UF6PoM/EgItRoOGfplfX0FuESN4z+Fd6vjxAcxHrhuzJ6RLOCiL+0gTCka+kRdZERzxXl262keOsnn1X6CvwZfFKeFckWkF4NYPw1ES5ELF0q2+aiznxXSXzUzatU5xirc1XcySPMCSzLbjd+8DTaWs4l11GTOXxqxIQTecC857+rCBHOjFB3lI8g="
            wx.request({
                url: options.url,
                method: options.method || "POST",
                header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                data: data,
                success(res) {
                    resolve(res.data)
                },
                fail(res) {
                    console.log("请求错误：" + options.url, res)
                    reject(res)
                },
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
		  "Ids": [0],
		  "Limit": 0,
		  "Page": 0,
		  "SinceId": 0,
		  "Fields": "string",
		  "CreatedAtMin": "2020-02-23T12:51:12.015Z",
		  "CreatedAtMax": "2020-02-23T12:51:12.015Z",
		  "Status": 10,
		  "PaymentStatus": 10,
		  "ShippingStatus": 10,
		  "CustomerId": 0,
		  "AppId": "string",
		  "Session": "string"
	 */
    orderGetList(data) {
        return new Promise((resolve, reject) => {
            wx.showLoading({ title: "加载中" })
            this.orderRequest({ url: this.WM_URL + "api/orders/getlist/", data: data, })
                .then(res => {
                    wx.hideLoading()
                    resolve(res)
                })
                .catch(res => {
                    wx.hideLoading()
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
}


module.exports = dbStats