// components2/notice/notice.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

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

            wx.redirectTo({
                url: '/pages2/notice_edt/notice_edt',
            })
        },
    }
})
