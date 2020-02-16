

// import dbFather from '../db/db_system.js'
// var dbFather = require('db_2_system.js')
var dbFather = require('db_2_system.js')
class dbStore extends dbFather {
    constructor() {
        super()

    }
    


    /**
     * @method 1 获取店铺数据
     * @param
     *      
     * @return 
     * 
     */
    storeSellerGetData() {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/lite/store/SellerGetData/",
                // data: data,
                method: "POST",
            }).then(res => {
                // console.log(res)
                resolve(res.data)
            }).catch(res => reject(res))
        })
    }

    /**
     * @method 2 更新店铺信息
     * @param
     *      noticImageList
            storeUUID
            storeName
            storeLogo
            storeLoadImage
            storeDes
            storeShopUrl
            startTime
            endTime
            longitude
            latitude
            coverLimitTime
            coverLiveTime
            coverLimitTimes
            coverDefaultBgUrl
            storeMaxScore
            storeMinScore
            session
     * @return 
     *      {}
     * 
     */
    storeUpdateStoreInfo(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/lite/store/SellerUpdateStore/",
                data: data,
                method: "POST",
            }).then(res => {
                if(res.code == 0 ){
                    resolve(res.msg)
                } else {
                    wx.showModal({
                        title: res.msg,
                        showCancel:false,
                    })
                    resolve(false)
                }
                }).catch(res => reject(false))
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
                resolve(res.data)
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
                resolve(res.data)
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
                resolve(res.data)
            }).catch(res => reject(res))
        })
    }

    /**
     * @method 每日统计
      * @param
            storeUUID:""
     * @return
     *      totalPrize: 0
            totalScore: 0  
            scoreList:[{ longitude:23, latitude:108, createTime:"" }]
     */
    storeDaystat(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/lite/store/sellerdaystat/",
                data: data,
                method: "POST",
            }).then(res => {
                resolve(res.data)
            }).catch(res => reject(res))
        })
    }

    // /**
    //   * @method 集点统计
    //   * @param
    //         storeUUID:""
    //   * @return
    //         "totalScore": 0,
    //         "totalPrize": 0,
    //         "totalMonthScore": 0,
    //         "totalMonthPrize": 0,
    //         "totalYearScore": 0,
    //         "totalYearPrize": 0
    //   */
    // storeStat(data) {
    //     return new Promise((resolve, reject) => {
    //         this.base({
    //             url: this.HOST_URL + "api/lite/store/stat/",
    //             data: data,
    //             method: "POST",
    //         }).then(res => {
    //             resolve(res.data)
    //         }).catch(res => reject(res))
    //     })
    // }

    /**
  * @method 兑换统计
  * @param
        storeUUID:""
  * @return
  *     "totalDateWmScore": 0,
        "totalDateShareScore": 0,
        "totalDateCoverScore": 0,
        "totalDateFaceScore": 0,
        "totalMonthWmScore": 0,
        "totalMonthShareScore": 0,
        "totalMonthCoverScore": 0,
        "totalMonthFaceScore": 0,
        "totalPrize": 0,
        "totalMonthPrize": 0,
        "totalYearPrize": 0
  */
    storeStatcate(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/lite/store/sellerstatcate/",
                data: data,
                method: "POST",
            }).then(res => {
                resolve(res.data)
            }).catch(res => reject(res))
        })
    }


    /**
     * @method 兑换统计
    * @param
    * @return
    */
    storeQueryStoreSeller(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/lite/store/queryStoreSeller/",
                data: data,
                method: "POST",
            }).then(res => {
                resolve(res.data)
            }).catch(res => reject(res))
        })
    }

}


module.exports = dbStore