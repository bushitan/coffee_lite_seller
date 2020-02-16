// components2/notice/notice.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        text:{
            type:String,
            value:"",
        },
        imageNum: {
            type: Number,
            value: 0,
        }
    },

    options: {
        styleIsolation: 'apply-shared'
    },
    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {

        toNoticeEdt() {

            wx.navigateTo({
                url: '/pages2/notice_edt/notice_edt',
            })
        },
    }
})
