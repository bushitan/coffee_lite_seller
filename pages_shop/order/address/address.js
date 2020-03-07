// pages_shop/order/adress/adress.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        showEdt: false,
        list: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.onInit()
    },
    onInit() {
        var list = [
            { address: "2idsado", name: "我的", phone: "157778545" },
        ]
        this.setData({
            list: list
        })
    },
    select(e) {
        var index = e.currentTarget.dataset.index
        var currentAdd = this.data.list[index]
        var prePage = getCurrentPages()[getCurrentPages().length - 2]
        var order = prePage.data.order
        order.ShipAddress = currentAdd.address
        order.ReciveName = currentAdd.name
        order.RecivePhone = currentAdd.phone
        prePage.setData({
            order: order
        })
        uni.navigateBack({})
    },

    add() {

        this.show()
    },

    // confirm(e){
    // 	console.log(e)
    // 	this.close()
    // },

    formSubmit(e) {
        var formData = e.detail.value
        // console.log(e)

        var info = {
            address: formData.address,
            name: formData.name,
            phone: formData.phone,
        }
        // TODO  上传地址


        this.close()
    },

    // 打开模态框
    show() {
        this.setData({
            showEdt: true,
        })
    },

    // 关闭模态框
    close() {
        this.setData({
            showEdt: false,
        })
    },
})