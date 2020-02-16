

// import dbFather from '../db/db_store.js'
var dbFather = require('db_3_store.js')
class dbActivity extends dbFather {


    constructor() {
        super()

    }

    /**
     * @method 1 获取海报数据
     * @param
     *      
     * @return 
     * 
     */
    coverSellerGetCover() {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/lite/cover/SellerGetCover/",
                // data: data,
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res.data)
            }).catch(res => reject(res))
        })
    }

    /**
     * @method 2 增加海报
     * @param
     *      
     * @return 
     * 
     */
    coverSellerAddCover(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/lite/cover/SellerAddCover/",
                data: data,
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res.data)
            }).catch(res => reject(res))
        })
    }

    /**
     * @method 3 更新海报
     * @param
     *      
     * @return 
     * 
     */
    coverSellerUpdateCover(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/lite/cover/SellerUpdateCover/",
                data: data,
                method: "POST",
            }).then(res => {
                // console.log(res)
                resolve(res.data)
            }).catch(res => reject(res))
        })
    }


}


module.exports = dbActivity