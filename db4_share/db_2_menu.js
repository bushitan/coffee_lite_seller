

var dbFather = require('db_1_base.js')
class dbSystem extends dbFather {


    constructor() {
        super()

    }
    shareStateByStore(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.WM_URL + "api/order/statbystore/",
                method: "POST",
            }).then(res => {
                console.log(res.data)
                resolve(res)
            }).catch(res => reject(res))
        })
    }

}


module.exports = dbSystem