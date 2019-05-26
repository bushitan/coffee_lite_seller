
var API = require('api.js')
var IS_CUSTOMER = false
class db {
    constructor() {
    }
    // 封装基础的请求
    base(options){
        return new Promise((resolve, reject) => {
            var data = options.data || {}
            // data['customer_uuid'] = wx.getStorageSync(API.UUID)
            data['seller_uuid'] = wx.getStorageSync(API.UUID)
            wx.request({
                url: options.url,
                method: options.method || "POST",
                header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                data: data,
                success(res) {
                    resolve(res)
                },
                fail(res) {
                    reject(res)
                },
            })
        })
    }

    // 获取微信code
    getWXCode(){
        return new Promise((resolve, reject) => {
            wx.login({
                success(res) { resolve(res.code)},
            })
        })
    }

    /********/
    //用户登录认证
    login() {
        return new Promise((resolve, reject) => {
            // API 
            // var HOST = "https://www.51zfgx.com/"
            // var HOST = "https://www.51zfgx.com/"
            // var HOST = "https://www.51zfgx.com/dev/"
            // var HOST = "https://www.51zfgx.com/dev/"
            // var HOST = "https://www.51zfgx.com/dev/"
            // var HOST = "https://www.51zfgx.com/dev/"
            this.getWXCode().then( code => {
                //API 
                this.base({
                    url: API.ROUTE_USER_LOGIN,
                    data: {
                        code: code,
                        is_customer: IS_CUSTOMER,
                        uuid: wx.getStorageSync(API.UUID),
                    }
                }).then( res => resolve(res.data.data) )
            })
        })
    }

    //用户更新信息
    userUpdate(userInfo) {
        return new Promise((resolve, reject) => {
            var data = userInfo
            data['is_customer'] = IS_CUSTOMER
            data['uuid'] = wx.getStorageSync(API.UUID)       
            this.base({
                url: API.ROUTE_USER_UPDATE,
                data: data
            }).then(res => resolve(res.data.data))
        })
    }

    /**** 商户端 业务详情****/
    // 店铺信息更新
    storeUpdate(storeData) {
        return new Promise((resolve, reject) => {
            var data = storeData
            data['seller_uuid'] = wx.getStorageSync(API.UUID)
            this.base({
                url: API.STORE_UPDATE_SELLER,
                data: data
            }).then(res => resolve(res.data))
        })
    }

    // 查询核销数据
    storeDataSeller(storeData) {
        return new Promise((resolve, reject) => {
            var data = storeData
            data['seller_uuid'] = wx.getStorageSync(API.UUID)
            this.base({
                url: API.STORE_DATA_SELLER,
                data: data
            }).then(res => resolve(res.data.data))         
        })
    }

    // 店主查询数据
    storeHostDataSeller(storeData) {
        return new Promise((resolve, reject) => {
            var data = storeData
            data['seller_uuid'] = wx.getStorageSync(API.UUID)
            this.base({
                url: API.STORE_HOST_DATA_SELLER,
                data: data
            }).then(res => resolve(res.data.data))
        })
    }

    // 扫码核销
    scanSeller(storeData) {
        return new Promise((resolve, reject) => {
            var data = storeData
            data['seller_uuid'] = wx.getStorageSync(API.UUID)
            // API
            this.base({
                url: API.SCAN_SELLER,
                data: data
            }).then( res => {
                return resolve(res.data)
            })
          
        })
    }


    /**** 客户端 业务详情****/
    // 店铺自身信息
    storeInfo(store_uuid) {
        return new Promise((resolve, reject) => {
            // API
            this.base({
                url: API.STORE_INFO,
                data: {
                    store_uuid: store_uuid,
                }
            }).then(res => {
                return resolve(res.data.data)
            })
        })
    }


    // // 获取店铺列表
    // async storeList(){
    //     var res = await this.base({
    //         url: API.STORE_LIST_CUSTOMER,
    //     })
    //     return res.data.data
    // }

    // // 店铺单项详细数据
    // async storeData(store_uuid) {
    //     var res = await this.base({
    //         url: API.STORE_DATA_CUSTOMER,
    //         data: {
    //             // model:model,
    //             store_uuid: store_uuid,
    //         }
    //     })
    //     return res.data.data
    // }
    // // 店铺单项详细数据
    // async storeDetail(model,store_uuid) {
    //     var res = await this.base({
    //         url: API.STORE_DETAIL_CUSTOMER,
    //         data: {
    //             model:model,
    //             store_uuid: store_uuid,
    //         }
    //     })
    //     return res.data.data
    // }



    // // 获取更新数据
    // async refresh(model,store_uuid) {
    //     var res = await this.base({
    //         url: API.REFRESH_CUSTOMER,
    //         data: {
    //             model: model,
    //             store_uuid: store_uuid,
    //         }
    //     })
    //     return res.data.data
    // }
}

module.exports = db