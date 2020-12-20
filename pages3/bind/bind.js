// pages3/bind/bind.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        src:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            src: 'https://sj.qskjad.top/Account/BindShops?shop_id=' + options.shop_id + '&u_id=' + options.u_id
        })
    },

})