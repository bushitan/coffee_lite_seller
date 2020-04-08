// pages_shop/config/store.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[],
        userInfo: {},
        session:{},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onInit()
    },

    //查询店铺
    async onInit(){
        var res = await app.db.shopConfigStore()
        console.log(res)
        this.setData({
            list:res.data
            // session:s
        })
    },

    //登录
    async getuserinfo(e) {
        console.log(e.detail.userInfo)
        // var res = await this.db.customerUpdate()
        var userInfo = e.detail.userInfo
        var wxUserInfo = {
            WxAvatarUrl: userInfo.avatarUrl,
            WxCity: userInfo.city,
            WxCountry: userInfo.country,
            WxGender: userInfo.gender,
            WxLanguage: userInfo.language,
            WxNickName: userInfo.nickName,
            WxProvince: userInfo.province,
        }
        this.setData({
            userInfo: wxUserInfo
        })
        await this.db.customerSetInfo(wxUserInfo)

        uni.showToast({
            title: "更新成功"
        })
    },

    /**
     * @method 是否打样
     */
    setClose(e) {
        var shopId = e.currentTarget.dataset.shop_id
        var that = this
        wx.showActionSheet({
            itemList: ["营业中","已打烊"],
            success(e){
                console.log(e.tapIndex)
                if(e.tapIndex == 0){
                    that.updateShop(shopId,false)
                } else {
                    that.updateShop(shopId,true)
                }
            },
        })
    },
    // 修改店铺营业砖头盖
    async updateShop(shopId,isClose){
        var res = await app.db.shopUpdate({
            ShopId: shopId,
            IsClose: isClose,
        })
        // if (res.code == 0)
            wx.showModal({
                title: res.msg,
                // content: '',
            })
    },

    /**
     * @method 设置产品
     */
    setProduct(e) {
        var shopId = e.currentTarget.dataset.shop_id
        wx.navigateTo({
            url: '/pages_shop/config/product?shopId=' + shopId ,
        })
    },


})