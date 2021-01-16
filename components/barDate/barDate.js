// components/bar/bar.js
var app = getApp()
var util = require("../../utils/util.js")
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
        scrollLeft:0,

        starttoday: util.today,
        startMonth: util.currentMonth,
        endtoday: util.today,
    },

    ready() { 
        // debugger
        // console.log(
        //     util.getMonthFirstTime("2021-1"),
        //     util.getMonthLastTime("2021-1"),
        //     util.getDayFirstTime("2021-1-17"),
        //     util.getDayLastTime("2021-1-17"),
        // )


        // getMonthFirstTime: getMonthFirstTime,
        //     getMonthLastTime: getMonthLastTime,
// getDayFirstTime: getDayFirstTime,
//     getDayLastTime: getDayLastTime,
// }

            //初始化
            this.getQuery({
                detail :{
                    value:{
                        startDate: util.today
                    }
                }
            })
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
            // this.triggerEvent('click', cur)
        },


        // 点击查询按钮
        getQuery(e){
            // console.log(e.detail.value)
            var start ,end
            var TabCur = this.data.TabCur 
            if (TabCur == 0){
                start = util.getDayFirstTime(e.detail.value.startDate)
                end = util.getDayLastTime(e.detail.value.startDate)
            }
            if (TabCur == 1) {
                start = util.getMonthFirstTime(e.detail.value.startMonth)
                end = util.getMonthLastTime(e.detail.value.startMonth)
            }
            if (TabCur == 2) {
                start = util.getDayFirstTime(e.detail.value.startDate)
                end = util.getDayLastTime(e.detail.value.endDate)
            }
            if (util.getDateRange(start, end) > 30){
                wx.showModal({ title: '查询范围不能大于31天', showCancel:false, })
                return 
            }

            this.triggerEvent('confirm', {
                startTime: start, endTime:end
            })

        },


        startDateEvent(e) { this.setData({ starttoday : e.detail.value}) },
        startMonthEvent(e) { this.setData({ startMonth: e.detail.value })},
        endDateEvent(e) { this.setData({ endtoday: e.detail.value })},

    }
})
