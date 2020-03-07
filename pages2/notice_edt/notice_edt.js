// pages2/notice_edt/notice_edt.js
var app = getApp()
var pre
Page({

    /**
     * 页面的初始数据
     */
    data: {

        imgList: [],
        imageMax: 6,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.onInit()
    },

    
    async onInit() {
        pre = app.getPrePage()
        this.setData({ 
            store: pre.data.store,
            imgList:pre.data.store.noticeImageList
        })
    },

    async confirm(e){

        var form = e.detail.value

        var noticeImageList = []
        for (var i = 0; i < this.data.imgList.length; i++) {
            var filePath = this.data.imgList[i]
            var isLocal = /^https:\/\/content.qskjad.top/.test(filePath)
            if (isLocal) {
                noticeImageList.push(filePath)
            } else {
                var url = await this.uploadImage(filePath)
                noticeImageList.push(url)
            }
        }

        console.log(noticeImageList)

        // 

        var data = {
            noticeText: form.noticeText,
            noticeImageList: noticeImageList.join(","),
            storeUUID : pre.data.store.storeUUID
        }
        
        var msg = await app.db.storeUpdateStoreInfo(data)
        if (msg) {
            wx.showModal({
                title: msg,
                showCancel: false,
                success() {
                    pre.onInit()
                    wx.navigateBack({})
                },
            })
        }
    },

    async uploadImage(filePath) {
        var token = await app.db.baseQiniuToken()        
        var key = "coffee/notice/" + pre.data.store.storeUUID + "_" + new Date().getTime() + filePath.match(/\.[^.]+?$/)[0]
        var url = await app.db.baseUploadQIniu(filePath,key,token)
        return url
    },


    back() {
        wx.navigateBack({
            
        })
    },



    /****** 上传公告图片 ******/
    DelImg(e) {
        wx.showModal({
            title: '确定要删除这张图片?',
            // content: '？',
            success: res => {
                if (res.confirm) {
                    this.data.imgList.splice(e.currentTarget.dataset.index, 1);
                    this.setData({
                        imgList: this.data.imgList
                    })
                }
            }
        })
    },
    ViewImage(e) {
        wx.previewImage({
            urls: this.data.imgList,
            current: e.currentTarget.dataset.url
        });
    },

    async ChooseImage() {
        wx.chooseImage({
            count: this.data.imageMax, //默认9
            sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
            // sourceType: ['album'], //从相册选择
            success: (res) => {
                if (this.data.imgList.length != 0) {
                    this.setData({
                        imgList: this.data.imgList.concat(res.tempFilePaths)
                    })
                } else {
                    this.setData({
                        imgList: res.tempFilePaths
                    })
                }
            }
        });
    },

})