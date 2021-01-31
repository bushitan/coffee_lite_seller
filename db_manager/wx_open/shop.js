/**
 * https://developers.weixin.qq.com/doc/ministore/minishopopencomponent/API/register/register_shop.html
 * 小商店API网址
 * 
 */

var base = require("base.js")
var baseUrl = "https://api.weixin.qq.com/"
var hostUrl = baseUrl + "product/" 
function pack(url){
    return hostUrl + url + "?"
}


class WxShop extends base{
    constructor(){
        super()
    }



    /**获取 
     * componentAccessToken
     */
    componentAccessToken(data) {
        return new Promise((reslove, reject) => {
            wx.showLoading()          
            wx.request({
                url: "https://admin.51zfgx.com/Open/GetComponentVerifyTicket",
                data: data,
                method: "POST",
                success: res => {
                    wx.hideLoading();
                    reslove(res.data)
                },
                fail: res => {
                    wx.hideLoading();
                    reject(res.data)
                },

            })
        })
    }


    /**获取 
     * AuthorizerAccessToken
     */
    authorizerAccessToken(data) {
        return new Promise((reslove, reject) => {
            wx.showLoading()
            wx.request({
                url: "https://admin.51zfgx.com/OpenOAuth/RefreshAuthorizerAccessToken?authorizerId=" + data,
                data: data,
                method: "POST",
                success: res => {
                    wx.hideLoading();
                    reslove(res.data)
                },
                fail: res => {
                    wx.hideLoading();
                    reject(res.data)
                },

            })
        })
    }

    // 上传图片
    // wx.chooseImage({
    //     success(res) {
    //         const tempFilePaths = res.tempFilePaths
    //         wx.uploadFile({
    //             url: 'https://admin.51zfgx.com/OpenOAuth/UploadMedia', //仅为示例，非真实的接口地址
    //             filePath: tempFilePaths[0],
    //             name: 'mediaName',
    //             formData: {
    //                 'authorizerId': 'wx7837f7a217ea0809',
    //                 'url':"https://api.weixin.qq.com/product/img/upload?access_token={0}&height=108&width=108"
    //             },
    //             success(res) {
    //                 const data = res.data
    //                 //do something
    //             }
    //         })
    //     }
    // })



    /***********注册接口***********/
    // 注册小商店
    // 需要用到 component_access_token
    registerShop(data) {
        return new Promise((reslove, reject) => {
            this.ComponentVerifyTicket({ data: { url: pack("register/register_shop"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }




    // 查询注册入口
    registerCheckStatus(data) {
        wx.showLoading()
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("register/check_audit_status"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }

    // 提交支付资质
    registerMerchatInfo(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("register/submit_merchantinfo"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }

    // 提交小商店基础信息
    registerBaseInfo(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("register/submit_basicinfo"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }



    /***********服务商市场接口***********/
    // 登录验证
    serviceCheckAuth(data) {
        return new Promise((reslove, reject) => {
            this.ComponentVerifyTicket({ data: { url: pack("service/check_auth"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }
    // 获取用户购买的在有效期内的服务列表
    serviceGetList(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("service/get_list"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }
    // 获取用户购买的服务订单列表
    serviceGetOrderList(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("service/get_order_list"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }

    /***********接入商品前必需接口***********/

    // 获取类目详情
    categoryGet(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("category/get"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }

    // 获取品牌列表
    brandGet(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("brand/get"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }


    // 获取运费模板
    deliveryGetFreightTemplate(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("delivery/get_freight_template"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }

    // 获取店铺的商品分类
    storeGetShopcat(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("store/get_shopcat"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }


    /***********SPU接口（修改需重新上架商品）***********/
    // 添加商品
    spuAdd(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("spu/add"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }

    // 删除商品
    spuDel(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("spu/del"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }
    
    // 获取商品
    spuGet(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("spu/get"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }
    // 获取商品列表
    spuGetList(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("spu/get_list"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }

    // 搜索商品
    spuSearch(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("spu/search"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }

    // 更新商品
    spuUpdate(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("spu/update"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }

    // 上架商品
    spuListing(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("spu/listing"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }
    // 下架商品
    spuDelisting(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("spu/delisting"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }


    /***********SKU接口（修改需重新上架商品）***********/
    // 添加SKU
    skuAdd(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("sku/add"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }
    // 批量添加SKU
    skuBatchAdd(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("sku/batch_add"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }
    // 删除SKU
    skuDel(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("sku/del"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }
    // 获取SKU信息
    skuGet(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("sku/get"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }
    // 批量获取SKU信息
    skuGetList(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("sku/get_list"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }
    // 更新SKU
    skuUpdate(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("sku/update"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }
    // 更新SKU价格
    skuUpdatePrice(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("sku/update_price"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }

    /***********SKU 库存接口***********/
    // 更新库存
    stockUpdate(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("stock/update"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }
    // 获取库存
    stockGet(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("stock/get"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }

    /***********订单接口***********/
    // 获取订单列表
    orderGetList(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("order/get_list"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }
    // 获取订单详情
    orderGet(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("order/get"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }
    // 搜索订单
    orderSearch(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("order/search"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }


    /***********物流接口***********/
    // 获取快递公司列表
    deliveryGetCompanyList(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("delivery/get_company_list"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }

    // 订单发货
    deliverySend(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("delivery/send"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }

    /***********优惠券接口***********/
    // 创建优惠券
    couponCreate(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("coupon/create"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }
    // 获取优惠券列表
    couponGetList(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("coupon/get_list"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }
    // 发放优惠券
    couponPush(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("coupon/push"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }

    /***********店铺接口***********/
    // 获取基本信息
    storeGetInfo(data) {
        return new Promise((reslove, reject) => {
            this.AccessToken({ data: { url: pack("store/get_info"), data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }


    // /**产品接口 */
    // orderGetList(data){        
    //     return new Promise((reslove, reject) => { 
    //         wx.showLoading()
    //         var url = hostUrl + "order/get_list?"
    //         this.AccessToken({ data: { url: url, data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res) ) 
    //     })
    // }


    // brandGet(data) {

    //     return new Promise((reslove, reject) => { 
    //         var url = hostUrl + "product/brand/get?" 
    //         this.AccessToken({ data: { url: url, data: data } }).then(res => { wx.hideLoading(); reslove(res) }) .catch(res => reject(res) ) 
    //     })
    // }


    // spuGetList(data) {
    //     return new Promise((reslove, reject) => {
    //         wx.showLoading( )
    //         var url = hostUrl + "product/spu/get_list?"
    //         this.AccessToken({ data: { url: url, data: data } }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
    //     })
    // }

/**
    返回码	错误类型
    9401001	商品已存在
    9401002	商品不存在
    9401005	SKU已存在
    9401006	SKU不存在
    9401007	属性已存在
    9401008	属性不存在
    9401020	参数非法
    9401021	无该商品权限
    9401022	SPU不允许变动
    9401023	SPU不允许编辑
    9401024	SKU不允许变动
    9401025	SKU不允许编辑
    10005	传入的超管的身份证、姓名和注册的微信号不匹配
    100003	类目已存在
    100004	类目不存在
    100009	添加SPU后再添加SKU失败
    100010	类目和品牌不匹配
    100020	参数非法
    100050	优惠券状态非法
    101000	文件为空
    101001	非法格式
    101002	超过文件大小
    101003	参数高宽与实际图片不符
    101004	上传失败
    102000	已经注册
    1005	小程序昵称非法
    102001	渠道号非法
    102002	微信名非法
    200000	服务商登录appid非法
    200001	缺少第三方服务商信息
    200002	服务市场购买的服务过期
    260008	昵称不合法
    300000	超过频率限制
    -30000	能执行该操作，请检查审核状态后调用正确的接口
*/
}
module.exports = WxShop