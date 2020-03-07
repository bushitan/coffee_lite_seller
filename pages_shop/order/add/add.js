// pages_shop/order_add/order_add.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index: 0,


        self: {
            address: "",
            name: "",
            phone: "",
        },

        address: "",
        name: "",
        phone: "",


        expressList: ['顺风专送', '自配送'],
        expressArray: [
            { id: 0, name: '顺风专送', },
            { id: 1, name: '自配送', }           
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    formSubmit(e){
        var formData = e.detail.value

        var obj = {
            address: formData.address,
            name: formData.name,
            phone: formData.phone,
            express: this.data.expressArray[formData.ex_index].id,
        }
        console.log(e.detail.value)
    },

    PickerChange(e) {
        console.log(e);
        this.setData({
            index: e.detail.value
        })
    },

    toAddAddress(){
        wx.navigateTo({
            url: '/pages_shop/order/address/address',
        })
    },
})