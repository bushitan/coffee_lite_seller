// pages2/stats_edt/stats_edt.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

        TabCur: 0,
        scrollLeft: 0,
        tabber:["数据统计","顾客查询"],

        scoreList: [
            { name: "集点卡", },
            { name: "海报", },
            { name: "面对面扫码", },
            { name: "总计", },
        ]  ,
        
        prizeList: [
            { name: "集点卡", },
            { name: "海报", },
            { name: "面对面扫码", },
            { name: "总计", },
        ] , 

        userInfo:{
            name:"丰丰",
            logo:"/images/2013/swiper.jpg",
        },
        userScoreList:[
            { name: "扫码集点", createTime: "2020-2-15" },
            { name: "海报集点", createTime: "2020-2-15" },
        ],

        userPrizeCount:2,
        userPrizeList: [
            { name: "兑换", createTime: "2020-2-15" },
            { name: "兑换", createTime: "2020-2-15" },
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        })
    },
    back() {
        wx.redirectTo({
            url: '/pages2/self/self',
        })
    },

    // 搜索
    searchIcon(e) {
        let key = e.detail.value.toLowerCase();
        let list = this.data.icon;
        for (let i = 0; i < list.length; i++) {
            let a = key;
            let b = list[i].name.toLowerCase();
            if (b.search(a) != -1) {
                list[i].isShow = true
            } else {
                list[i].isShow = false
            }
        }
        this.setData({
            icon: list
        })
    }
})