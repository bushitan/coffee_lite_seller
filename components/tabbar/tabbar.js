// components/tabbar/tabbar.js
var app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    behaviors: [app.configBehaviors],
    options: { styleIsolation: 'apply-shared',},
    /**
     * 组件的初始数据
     */
    data: {
        PageCur: 'basics'
    },

    /**
     * 组件的方法列表
     */
    methods: {

        NavChange(e) {
            this.setData({
              PageCur: e.currentTarget.dataset.cur
            })
          },
    }
})
