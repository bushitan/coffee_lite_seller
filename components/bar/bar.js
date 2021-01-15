// components/bar/bar.js
var app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list:{
            type:Array,
            value:[],
        }
    },
    behaviors: [app.configBehaviors],
    options: { styleIsolation: 'apply-shared'},
    /**
     * 组件的初始数据
     */
    data: {

        TabCur: 0,
        scrollLeft:0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        tabSelect(e) {
            this.setData({
                TabCur: e.currentTarget.dataset.id,
                scrollLeft: (e.currentTarget.dataset.id-1)*60
            })
            this.triggerEvent('click', e.currentTarget.dataset.id)
        }
    }
})
