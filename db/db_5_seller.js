

// import dbFather from '../db/db_customer.js'
var dbFather = require('db_4_cover.js')
class dbSeller extends dbFather {


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
                console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }

    /**
     * @method 2 增加海报封面
     * @return
     *      personNum:true,  //总领取人数
            score:true,    //默认每人1点
            liveTime:true,    //有效时间，默认1天
     */
    sellerAddCover(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/lite/cover/SellerAddCover/",
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }

    /**
     * @method 2 更新海报状态（删除）
     * @return
     *      isAlive:true,  //是否有效
            coverUUID:true,    //
     */
    sellerUpdateCover(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/lite/cover/SellerUpdateCover/",
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }





    /**
     * @method 4 扫码集点
     * @param
     *      customerUUID :""
     *      storeId :""
     *      timestamp :""
     * @return 
     *      []
     */
    sellerScanScore(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/QrCode/SellerScanScore/",
                data: data,
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }


    /**
     * @method 5 扫码核销
     * @param
     *      customerUUID :""
     *      storeId :""
     *      timestamp :""
     *      customerUUID :""
     * @return 
     *      []
     */
    sellerScanPrize(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/QrCode/SellerScanPrize/",
                data: data,
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }
}


module.exports = dbSeller