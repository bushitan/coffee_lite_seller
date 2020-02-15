

// import dbFather from '../db/db_system.js'
// var dbFather = require('db_2_system.js')
var dbFather = require('db_2_system.js')
class dbStore extends dbFather {
    constructor() {
        super()

    }
    
    /**
     * @method 1 用户登录
     * @param
     *      
     * @return 
     * 
     */
    test(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/lite/store/MyGetStoreInfo/",
                data: data,
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }


    /**
     * @method 1 用户登录
     * @param
     *      
     * @return 
     * 
     */
    storeSellerGetData(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/lite/store/SellerGetData/",
                data: data,
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }



    /**
     * @method 2 获取seller名下的积分列表
     * @param
     *      page:1,
     *      limit:10,
     * @return 
     * 
     */
    storeSellerGetAllScoreList(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/lite/store/SellerGetAllScoreList/",
                data: data,
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }



    /**
     * @method 3 获取seller名下的兑换列表
     * @param
     *      page:1,
     *      limit:10,
     * @return 
     * 
     */
    storeSellerGetAllPrizeList(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/lite/store/SellerGetAllPrizeList/",
                data: data,
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }



    /**
     * @method 4 更新店铺信息
     * @param
     *      storeUUID:"3e5075ee-f2e5-11e9-8fd0-e95aa2c51b5d",
     *      storeName:"名字",
     *      storeLogo:"",
     *      storeLoadImage:"",
     *      storeDes:"",
     *      storeShopUrl:"",
     *      startTime:"",
     *      endTime:"",
     *      longitude:"",
     *      latitude:"",
     *      coverLimitTime:"",
     *      coverLiveTime:"",
     *      coverDefaultBgUrl:"",
     * @return 
     * 
     */
    storeSellerGetAllPrizeList(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/lite/store/UpdateStoreInfo/",
                data: data,
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }


    

}


module.exports = dbStore