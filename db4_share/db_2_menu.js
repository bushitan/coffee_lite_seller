

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
     * @method 查询台卡支付情况
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


}


module.exports = dbSystem