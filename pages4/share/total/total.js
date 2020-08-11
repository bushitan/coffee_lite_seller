// pages4/share/total.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        TabCur: 0,
        SortMenu: [
            { id: 0, name: "收款", },
            { id: 1, name: "约定追回", },
            // { id: 2, name: "已处理", },
        ],

        list:[1,1,1,1,1,1,1,1,1],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    async tabSelect(e) {
        console.log(e)
        var id = e ? e.currentTarget.dataset.tab_id : this.data.TabCur
        this.setData({
            TabCur: id,
            // list: [],
        })
        // switch (id) {
        //     case 0: var res = await app.db.orderGetList({
        //         Page: 1, Limit: 100, FilterStatus: app.db.SELLER_PENDING, CreatedAtMin: today
        //     }); break;
        //     case 1: var res = await app.db.orderGetList({
        //         Page: 1, Limit: 100, FilterStatus: app.db.SELLER_RIDING, CreatedAtMin: today
        //     }); break;
        //     case 2: var res = await app.db.orderGetList({
        //         Page: 1, Limit: 100, FilterStatus: app.db.SELLER_COMLETE, CreatedAtMin: today
        //     }); break;
        // }
        // this.setData({
        //     list: res.data
        // })
    },
    toStore(){
        wx.navigateTo({
            url: '/pages4/share/store/store',
        })
    },


    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log("bottom")
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})