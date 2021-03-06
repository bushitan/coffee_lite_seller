

var dbFather = require('db_1_base.js')
class dbSystem extends dbFather {


    constructor() {
        super()

    }

    /**
     * @method 1 用户登录
     * @return 
     *      session 
     *      sn 序列号
     */
    sysLogin() {
        return new Promise((resolve, reject) => {
            var that = this 
            wx.login({
                success(e) {
                    console.log(e)
                    that.base({
                        url: that.HOST_URL + "ajdm/syslogin/",
                        data: {
                            jscode:e.code,
                            appid: that.APP_ID,
                        },
                        method: "POST",
                    }).then(res => {
                        wx.setStorageSync(that.KEY_SESSION, res.data.session) //session
                        wx.setStorageSync(that.KEY_SN, "10" + res.data.sn)  //序列号
                        resolve(true)
                    })
                    .catch(res => reject(false))
                },
                fail(e) {
                    console.log(e)

                }
            })
        })
    }

    /**
     * @method 2 获取我的信息
     * @return
            allPrizeNum: 14
            allScoreNum: 126
            allStoreNum: 35
            bgImage: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKVkoe7Viae4llD4mw6pV1zBp67Qeq8tKibBZ8uBicxBqGOTekibaKwQt6IgI1g1zYnYrtBehiaQUT9ejQ/132"
            logo: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKVkoe7Viae4llD4mw6pV1zBp67Qeq8tKibBZ8uBicxBqGOTekibaKwQt6IgI1g1zYnYrtBehiaQUT9ejQ/132"
            name: "this.丰兄"
     *  
     */
    sysMyGetInfo() {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "ajdm/MyGetInfo/",
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res.data)
            }).catch(res => reject(res))
        })
    }

    /**
     * @method 更新用户信息
     * @param
     *      name
     *      logo
     *      city
     * @return
     * 
     */
    sysMyUpdateInfo(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "ajdm/MyUpdateInfo/",
                data: data,
                method: "POST",
            }).then(res => {
                wx.showModal({
                    title: res.data.msg,
                })
                console.log(res)
                resolve(res.data)
            }).catch(res => reject(res))
        })
    }

    /**
     * @method 商户端使用 验证所拥有的店铺
     * @return
     *      isSeller:true,  //是否这个点的人员
            isHost:true,    //是否店主
     */
    sysSellerCheckStoreOwner() {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "ajdm/SellerCheckStoreOwner/",
                method: "POST",
            }).then(res => {
                // console.log(res.data)
                resolve(res.data)
            }).catch(res => reject(res))
        })
    }


    /**
     * @method 绑定员工
     * @return
     *      empSession:true,  //员工session
     */
    sysSellerBindEmployee(data){
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "ajdm/bindemp/",
                data:data,
                method: "POST",
            }).then(res => {
                resolve(res)
            }).catch(res => reject(res))
        })
    }

    /**
     * @method 解除绑定员工
     * @return
     *      empUUID:true,  //员工uuid
     */
    sysSellerUnBindEmployee(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "ajdm/unbindemp/",
                data: data,
                method: "POST",
            }).then(res => {
                resolve(res)
            }).catch(res => reject(res))
        })
    }

}


module.exports = dbSystem