// pages4/share/total.js
var app = getApp()
var TAB_PAY = 0
var TAB_BACK = 1
Page({

    /**
     * 页面的初始数据
     */
    data: {
        TAB_PAY: TAB_PAY,
        TAB_BACK: TAB_BACK,
        TabCur: TAB_PAY,
        SortMenu: [
            { id: TAB_PAY, name: "收款", },
            { id: TAB_BACK, name: "约定追回", },
            // { id: 2, name: "已处理", },
        ],

        payList: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        backList: [1, 1, 1, 1, 1, 1, 1, 1, 1],


        card: {
            "Version": 2,
            "CardInfo": {
                "card_id": "20200905002828c5gCRN8Byz67008264",
                "card_template_id": "20200811184307oaWFh41qk272598831",
                "out_card_code": "b90f83164e464f54a44c4b02d4543a75",
                "sp_appid": "wxcd49aa99fd3d1f6a",
                "sp_mchid": "1512927361",
                "time_range": {
                    "begin_time": "2020-09-05T00:28:28+08:00",
                    "end_time": "2020-09-12T00:28:28+08:00"
                },
                "state": "ONGOING",
                "unfinished_reason": null,
                "total_amount": 0,
                "pay_information": null,
                "create_time": "2020-09-05T00:28:28+08:00",
                "objectives": [
                    {
                        "objective_id": "155002",
                        "name": "宸益堂门店消费",
                        "count": 2,
                        "unit": "次",
                        "description": "",
                        "objective_completion_records": [
                            {
                                "objective_completion_serial_no": "67f9b81908b24e18bda877758aa867ee",
                                "objective_id": "155002",
                                "completion_time": "2020-09-05T00:28:46+08:00",
                                "completion_type": "INCREASE",
                                "description": "您应付1.10元,实付0.88元",
                                "completion_count": 1,
                                "remark": "先享支付"
                            }
                        ]
                    }
                ],
                "rewards": [
                    {
                        "reward_id": "155003",
                        "name": "每次消费先享8折，优惠",
                        "count_type": "COUNT_UNLIMITED",
                        "count": 2,
                        "unit": "次",
                        "amount": 0,
                        "description": "每次消费满1元.",
                        "reward_usage_records": [
                            {
                                "reward_usage_serial_no": "67f9b81908b24e18bda877758aa867ee",
                                "reward_id": "155003",
                                "usage_time": "2020-09-05T00:28:46+08:00",
                                "usage_type": "INCREASE",
                                "description": "您应付1.10元,实付0.88元",
                                "usage_count": 1,
                                "amount": 22,
                                "remark": "先享支付"
                            }
                        ]
                    }
                ],
                "sp_sharer_openid": null,
                "sub_mchid": "1601791737",
                "sub_appid": "wxcd49aa99fd3d1f6a",
                "sub_openid": "ok6Wq5Rxw8sLwdo4U7XXUx4yhxgA",
                "sub_sharer_openid": null
            }
        },
    
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onInit()
    },

    async onInit(){

        var res = await app.db4.login({
            ShopId: 70
        })

        var res = await app.db4.shareStateByStore({
            ShopId:70
        })
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

    /**查看门店信息详情 */
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