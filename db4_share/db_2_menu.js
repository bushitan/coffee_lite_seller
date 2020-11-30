

var dbFather = require('db_1_base.js')
class dbSystem extends dbFather {


    constructor() {
        super()

    }

    /**
     * @method 获取门店消费情况
     */
    shareStateByStore(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.WM_URL + "api/order/statbystore/",
                // url: this.HOST_URL + "api/sp/storeslist/",
                method: "POST",
            }).then(res => {
                console.log(res.data)
            }).catch(res => reject(res))
        })
    }
    /**
     * @method 查找可查看订单统计的门店列表
     */
    shareGetStoreList(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/sp/storeslist/",
                method: "POST",
            }).then(res => {
                console.log(res.data)
                resolve(res)
            }).catch(res => reject(res))
        })
    }


    /**
     * @method 查询台卡支付情况
     */
    shareGetPayList(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/query/paywithwxdiscount/",
                method: "POST",
                data: data,
            }).then(res => {
                console.log(res.data)
                resolve(res)
            }).catch(res => reject(res))
        })
    }  

    /**
     * @method 小杯子优惠Go__先享卡未履约退款 统计
     * @param 
     *  ShopId
     *  StartDate
     *  EndDate
     */
    shareGetBackTotal(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/littlecup/refundwithwxdiscount/",
                method: "POST",
                data: data,
            }).then(res => {
                console.log(res.data)
                resolve(res)
            }).catch(res => reject(res))
        })
    }
    /**
       * @method 小杯子优惠Go__先享卡未履约退款 统计
       * @param 
       *  ShopId
       *  StartDate
       *  EndDate
       */
    shareGetBackList(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/query/refumdwxOrderList/",
                method: "POST",
                data: data,
            }).then(res => {
                console.log(res.data)
                resolve(res)
            }).catch(res => reject(res))
        })
    }

    /**
     * @method 获取微信先享卡使用进度详情
     * @param
     *  out_order_no 先享卡的订单号
     *  ShopId 可不填
     */
    shareGetPayDetail(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/query/wxdiscountCardDetail/",
                method: "POST",
                data: data,
            }).then(res => {
                console.log(res.data)
                resolve(res)
            }).catch(res => reject(res))
        })
    }
    

    /**
     * @method 微信订单汇总
     */
    shareGetOrderSummary(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/order/summary/",
                method: "POST",
                data: data,
            }).then(res => {
                console.log(res.data)
                resolve(res)
            }).catch(res => reject(res))
        })
    }


    /**
     * @method 微信对账单汇总
     */
    shareGetBillSummary(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/bill/summary/",
                method: "POST",
                data: data,
            }).then(res => {
                console.log(res.data)
                resolve(res)
            }).catch(res => reject(res))
        })
    }
}


module.exports = dbSystem