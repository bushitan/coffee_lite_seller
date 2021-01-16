// components/tabbar/tabbar.js

var app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        /**
        tabMatrix:[
            {
                name: "外卖",
                select: "/images/icon/score.png",
                unSelect: "/images/icon/score_un.png",
                list: [
                    { name: "待处理", id:11  }, { name: "处理中" ,id:12 }, { name: "已完成" ,id:13 }, { name: "已取消" ,id:14 },
                ]
            },
            {
                name:"小商店",
                select:"/images/icon/mall.png",
                unSelect:"/images/icon/mall_un.png",
                list:[
                    { name: "待处理", id:21}, { name: "处理中", id:22}, { name: "已完成", id:23}, { name: "已取消", id:24},
                ]
            }
        ]
         */
        theme: {
            type: String,
            value: '',
        },
        matrix:{
            type:Array,
            value:[],
        },

        index: {
            type: Number,
            value: 0,
            observer: function (newVal, oldVal) {
                this.setData({ TabCur: newVal})
            }
        }
    },

    behaviors: [app.configBehaviors],
    options: { styleIsolation: 'apply-shared',},
    /**
     * 组件的初始数据
     */
    data: {
        TabCur: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {

        NavChange(e) {
            var cur = e.currentTarget.dataset.cur
            this.setData({
                TabCur: cur
            })

            this.triggerEvent("click", cur)
        },
    }
})
