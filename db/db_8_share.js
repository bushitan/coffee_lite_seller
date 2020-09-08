

// import dbFather from '../db/db_customer.js'
var dbFather = require('db_7_shop.js')
class dbStats extends dbFather {


    constructor() {
        super()
    }
    shareStateByStore(data) {
        return new Promise((resolve, reject) => {
            this.orderRequest({
                url: this.WM_URL + "api/order/statbystore/",
                method: "POST",
            }).then(res => {
                console.log(res.data)
                resolve(res)
            }).catch(res => reject(res))
        })
    }

    shareGetPayDiscount(data) {
        return new Promise((resolve, reject) => {
            this.orderRequest({
                url: this.WM_URL + "api/query/paywithwxdiscount/",
                method: "POST",
            }).then(res => {
                console.log(res.data)
                resolve(res)
            }).catch(res => reject(res))
        })
    }


}


module.exports = dbStats