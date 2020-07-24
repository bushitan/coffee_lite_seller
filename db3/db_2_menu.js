

var dbFather = require('db_1_base.js')
class dbSystem extends dbFather {


    constructor() {
        super()

    }

    /**
     * @method 1 用户登录
     * @return 
     *      code
	  * 	session
	  * 	AppId
     */
    customerGetToken() {
        return new Promise((resolve, reject) => {
            var that = this
            wx.login({
                success(e) {

                    that.base({
                        url: that.HOST_URL + "api/gettoken/",
                        data: {
                            Code: e.code,
                            AppId: that.APP_ID,
                        },
                        method: "POST",
                    }).then(res => {
                        wx.setStorageSync(that.KEY_SESSION, res.data.data.session) //session
                        wx.setStorageSync(that.KEY_SN, res.data.data.sn)  //序列号			
                        wx.setStorageSync(that.KEY_UNION_KEY, res.data.data.unionKey)  //唯一值				

                        console.log("get customerGetToken success")
                        resolve(true)
                    })
                        .catch(res => {
                            console.log("get customerGetToken catch")
                            reject(false)
                        })
                },
                fail(res) {
                    console.log("login fail")
                    reject(false)
                },
            })
        })
    }


    /**
         * @method 3 获取该店铺的菜单
         * @param 
            id
            fields
         */
    productMenu(data) {
        return new Promise((resolve, reject) => {
            wx.showLoading()

            var startTime = new Date().getTime();
            this.base({ url: this.HOST_URL + "api/category/products", data: data, }).then(res => {
                wx.hideLoading()
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        })
    }

}


module.exports = dbSystem