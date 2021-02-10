/**
 * 组织机构扩展
 */



var base = require("base.js")


class Org extends base {
    constructor() {
        super()
    }

    /**********门店管理接口***********/
    /**
     *  1.0 门店操作分店
     */
    AddShopBranch(data) {
        return new Promise((reslove, reject) => {

            this.base({ url: "/Api/V5/OrgShopBranch/AddShopBranch", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))

        })
    }
    /**
     * 2.0更新分店信息
     */
    UpdateShopBranch(data) {
        return new Promise((reslove, reject) => {

            this.base({ url: "​/Api​/V5​/OrgShopBranch​/UpdateShopBranch", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))

        })
    }
    /**
     * 3.0、分页获取分店列表
     */
    SearchShopBranches(data) {
        return new Promise((reslove, reject) => {

            this.base({ url: "/Api/V5/OrgShopBranch/SearchShopBranches", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))

        })
    }

    /**
     *  4.0获取分店信息详情
     */
    GetShopBranch(data) {
        return new Promise((reslove, reject) => {

            this.base({ url: "/Api/V5/OrgShopBranch/GetShopBranch", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))

        })
    }
    /**
     *5.0 为分店绑定店员
     */
    BindShoper(data) {
        return new Promise((reslove, reject) => {

            this.base({ url: "​​/Api/V5​/OrgShopBranch​/BindShoper", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))

            // this.base({ url: "/Api/V5/OrgShopBranch/BindShoper", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))

            
        })
    }
   

    /**
     * 5.1 为分店绑定店员_由店员操作
     */
    BindShoperBySelfScan(data) {
        return new Promise((reslove, reject) => {

            this.base({ url: "/Api/V5/OrgShopBranch/BindShoperBySelfScan", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))

        })
    }
    /**
     *  6.0 移除分店店员
     */
    UnBindShoper(data) {
        return new Promise((reslove, reject) => {

            this.base({ url: "/Api/V5/OrgShopBranch/UnBindShoper", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))

        })
    }
    /**
     *  6.1 移除分店店员_店员自己操作
     */
    UnBindShoperBySelfScan(data) {
        return new Promise((reslove, reject) => {

            this.base({ url: "/Api/V5/OrgShopBranch/UnBindShoperBySelfScan", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))

        })
    }


    /**
     *  7.0 更新指定店员角色
     */
    UpdateShoperRoles(data) {
        return new Promise((reslove, reject) => {

            this.base({ url: "/Api/V5/OrgShopBranch/UpdateShoperRoles", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))

        })
    }

    /**
     * 8.0、获取分店人员列表
     */
    SearchShopers(data) {
        return new Promise((reslove, reject) => {

            this.base({ url: "/Api/V5/OrgShopBranch/SearchShopers", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))

        })
    }


    /*********OrgPaymentInfo 组织机构商家微信主体API信息***********/ 
    /*********支付账号信息表***********/  
    /**
     *  1.0新增支付信息
     */
    SaveWxPaymentInfo(data) {
        return new Promise((reslove, reject) => {          
            this.base({ url: "/Api/V5/OrgPaymentInfo/SaveWxPaymentInfo", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }
    /**
     *  2.0分页获取支付信息
     */
    GetOrgWxPaymentInfos(data) {
        return new Promise((reslove, reject) => {          
            this.base({ url: "/Api/V5/OrgPaymentInfo/GetOrgWxPaymentInfos", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }

    /*********OrgWxClientInfo  组织机构商家微信主体API信息***********/ 
    /*********小程序账号信息表***********/   
    /**
     *  1.0 新增商家终端载体
     */
    AddWxClientInfo(data) {
        return new Promise((reslove, reject) => {          
            this.base({ url: "/Api/V5/OrgWxClientInfo/AddWxClientInfo", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }
    /**
     *  2.0获取所有终端信息
     */
    SearchOrgWxClientInfos(data) {
        return new Promise((reslove, reject) => {          
            this.base({ url: "/Api/V5/OrgWxClientInfo/SearchOrgWxClientInfos", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    } 
    /**
    *  绑定门店到指定微信载体【暂时仅支持小杯子管理员操作】
    */
    BindShopToWxClient(data) {
        return new Promise((reslove, reject) => {          
            this.base({ url: "/Api/V5/OrgWxClientInfo/BindShopToWxClient", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }
    /**
    *  解绑微信载体中指定门店【暂时仅支持小杯子管理员操作】
    */
    UnBindShopToWxClient(data) {
        return new Promise((reslove, reject) => {          
            this.base({ url: "/Api/V5/OrgWxClientInfo/UnBindShopToWxClient", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
        })
    }



    /***********组织管理机构、权限接口***********/
    /*********OrgWxShoper组织机构商家API信息 ********/

    /**
     * 2.0 校验该用户是否已经关注小杯子便利店公众号
     */
    CheckIfFocusOn(data) {
        return new Promise((reslove, reject) => {

            this.base({ url: "/Api/V5/OrgWxShoper/CheckIfFocusOn", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))

        })
    }

    /**
     *  3.0 获取当前人员拥有的角色信息
     */
    GetCustomerRoles(data) {
        return new Promise((reslove, reject) => {

            this.base({ url: "/Api/V5/OrgWxShoper/GetCustomerRoles", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))

        })
    }

    /**
     *  4.0 获取系统拥有的角色信息[仅超级管理员或入驻商家管理员有权获取]
     */
    GetAllCustomerRoles(data) {
        return new Promise((reslove, reject) => {

            this.base({ url: "/Api/V5/OrgWxShoper/GetAllCustomerRoles", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))

        })
    }



    /**********品牌商家管理接口***********/
    /**ShopInfoOrg 商家入驻相关信息相关相关API信息 */

    /**
     *  1.0 申请商家入驻信息
     */
    EntryApplicationForm(data) {
        return new Promise((reslove, reject) => {
            this.base({ url: "/Api/V5/ShopInfoOrg/EntryApplicationForm", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))

        })
    }
    /**
     *  2.0 审核申请表信息
     */
    ApprovedEAForm(data) {
        return new Promise((reslove, reject) => {
            this.base({ url: "/Api/V5/ShopInfoOrg/ApprovedEAForm", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))

        })
    }
    /**
     *  3.0 获取申请表信息
     */
    GetEAForm(data) {
        return new Promise((reslove, reject) => {
            this.base({ url: "/Api/V5/ShopInfoOrg/GetEAForm", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))

        })
    }

    /**
     *  4.0、获取申请单列表
     */
    SearchEAForms(data) {
        return new Promise((reslove, reject) => {          
            this.base({ url: "/Api/V5/ShopInfoOrg/SearchEAForms", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
         
        })
    }

    /**
     *  5.0 品牌商家入驻_【由管理员操作】
     */
    AddShopInfoForm(data) {
        return new Promise((reslove, reject) => {          
            this.base({ url: "​/Api​/V5​/ShopInfoOrg​/AddShopInfoForm", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
         
        })
    }
    /**
     *  6.0 绑定品牌管理人员商家_【由管理员操作】
     */
    BindShopInfoManager(data) {
        return new Promise((reslove, reject) => {          
            this.base({ url: "/Api/V5/ShopInfoOrg/BindShopInfoManager", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
         
        })
    }
    /**
     *  7.0 绑定品牌商家管理人员_【由品牌主扫码申请】
     */
    BindShopInfoManagerByUser(data) {
        return new Promise((reslove, reject) => {          
            this.base({ url: "/Api/V5/ShopInfoOrg/BindShopInfoManagerByUser", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
         
        })
    }





    /**
     *  
     */
    test(data) {
        return new Promise((reslove, reject) => {          
            this.base({ url: "", data: data }).then(res => { wx.hideLoading(); reslove(res) }).catch(res => reject(res))
         
        })
    }
}


module.exports = Org