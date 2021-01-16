// components/bar/bar.js
var app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        theme: {
            type: String ,
            value: '',
        },
        list:{
            type:Array,
            value: [
                {
                    name: "按日"
                },
                {
                    name: "按月"
                },
                {
                    name: "自定义"
                },
            ],
        },

        index: {
            type: Number,
            value: 0,
            observer: function (newVal, oldVal) {
                console.log(newVal)
                this.setData({ TabCur: newVal })
            }
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
            var cur = e.currentTarget.dataset.cur
            this.setData({
                TabCur: cur,
                scrollLeft: (e.currentTarget.dataset.id-1)*60
            })
            this.triggerEvent('click', cur)
        }
    }
})
