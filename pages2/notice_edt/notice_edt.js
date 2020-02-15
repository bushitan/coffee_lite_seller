// pages2/notice_edt/notice_edt.js
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

    },

    back() {
        wx.redirectTo({
            url: '/pages2/self/self',
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