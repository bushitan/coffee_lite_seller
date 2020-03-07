// pages2/rule_edt/rule_edt.js
var app = getApp()
var pre
Page({

    /**
     * 页面的初始数据
     */
    data: {
        store: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.onInit()
    },
    async onInit(){

        pre = app.getPrePage()
        this.setData({ store: pre.data.store})

        // var store = await app.db.storeSellerGetData()
        // store.startTime = store.startTime.split(" ")[0]
        // store.endTime = store.endTime.split(" ")[0]
        // this.setData({ store: store })
    },

    async confirm(e) { 
        console.log(e.detail.value)
        // var form = e.detail.value
        var form = {}
        form.storeMinScore = 7
        form.storeMaxScore = 6
        form.storeUUID = this.data.store.storeUUID
        var msg = await app.db.storeUpdateStoreInfo(form)
        if (msg){
            wx.showModal({
                title: msg,
                showCancel:false,
                success(){
                    pre.onInit()
                    wx.navigateBack({})
                },
            })
        }
    },
    
    back() {
        wx.navigateBack({
            
        })
     },
})