// pages2/rule_edt/rule_edt.js
var app = getApp()
import Poster from '../../components2/poster/poster';
const CoverUtils = require("../../utils/cover_utils.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isMore:true,
        isLoading: false,
        list:[1,2,3,4],
        page:1,
        limit:10,

        showDialog:false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onInit()
    },

    // 上拉刷新
    onReachBottom() {
        this.getCoverList()

    },
    async onInit(){
        this.setData({
            isMore:true,
            isLoading: false,
            list: [], 
            page: 1,
            limit: 10,
        })
        this.getCoverList()
    },

    // 获取当前的海报
    async getCoverList(){
        if (this.data.isLoading)
            return 
        var oldList = this.data.list
        var newList =  await app.db.coverSellerGetCover({page: this.data.page, limit: this.data.limit})
        this.setData({
            isMore: newList.length < this.data.limit ? false : true , // 新的数组长度是否大于请求限制
            page:this.data.page + 1,
            list : oldList.concat(newList),
        })
    },

    async add(e) { 
        console.log(e)
        var personNum = e.detail.value.personNum
        var res = await app.db.coverSellerAddCover({
            personNum: personNum,
            score:1,
            liveTime:1,
        })
        wx.showToast({title: '添加成功'})
        this.onInit()
        this.switchDialog()
    },

    back() {
        wx.navigateBack({})
    },

    switchDialog() {
        this.setData({
            showDialog: !this.data.showDialog
        })
    },



    /**********获取海报***********/
    async getCover(e) {
        var coverUtils = new CoverUtils()
        // debugger
        coverUtils.start({
            qrUrl: e.currentTarget.dataset.qr_url , 
            x:10,
            y:10,
            width:300,
            height:300,
        })
        var data = coverUtils.getConfigData()
        console.log(data)
        wx.showToast({
            title: '生成中',
            duration:2500,
        })
        this.setData({ posterConfig: data }, () => {
            Poster.create(true);    // 入参：true为抹掉重新生成
        });
    },


    
    //合成成功
    onPosterSuccess(e) {
        const { detail } = e;
        console.log(e)
        wx.previewImage({
            current: detail,
            urls: [detail]
        })
    },
})