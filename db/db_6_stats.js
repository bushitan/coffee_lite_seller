

// import dbFather from '../db/db_customer.js'
var dbFather = require('db_5_seller.js')
class dbStats extends dbFather {


    constructor() {
        super()
    }

    /**
     * @method 1 获取海报封面
     * @return
     *      isSeller:true,  //是否这个点的人员
            isHost:true,    //是否店主
     */
    sellerGetCover(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/lite/cover/SellerGetCover/",
                method: "POST",
            }).then(res => {
                console.log(res.data)
                resolve(res)
            }).catch(res => reject(res))
        })
    }

}


module.exports = dbStats