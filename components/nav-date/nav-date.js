const app = getApp();
var util = require("../../utils/util.js")
Component({
    /**
     * 组件的一些选项
     */
    options: {
        styleIsolation: 'apply-shared',
        addGlobalClass: true,
        multipleSlots: true
    },
    behaviors: [app.configBehaviors],
    /**
     * 组件的对外属性
     */
    properties: {
        bgColor: {
        type: String,
            default: 'yellow'
        }, 
        isCustom: {
        type: [Boolean, String],
        default: false
        },
        isBack: {
        type: [Boolean, String],
        default: false
        },
        bgImage: {
        type: String,
        default: ''
        },
    },
    /**
     * 组件的初始数据
     */
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,

        showDialog:false,


        starttoday: util.today,
        endtoday: util.today,
    },
    /**
     * 组件的方法列表
     */
    methods: {
        BackPage() {
        //   wx.navigateBack({
        //     delta: 1
        //   });
            // console.log("back")
            // this.triggerEvent("back")
            wx.navigateBack({
                
            })
        },
        toHome(){
        wx.reLaunch({
            url: '/pages/index/index',
        })
        },


        clickDate(){
            this.setData({
                showDialog: true
            })
         
        },



        // 点击查询按钮
        dialogConfirm(e) {
            // console.log(e.detail.value)
            // var start, end
            // var start = util.getDayFirstTime(e.detail.value.startDate)
            // var end = util.getDayLastTime(e.detail.value.endDate)
            
            var start = util.getDayFirstTime(this.data.starttoday)
            var end = util.getDayLastTime(this.data.endtoday)


            if (util.getDateRange(start, end) > 30) {
                wx.showModal({ title: '查询范围不能大于31天', showCancel: false, })
                return
            }

            this.setData({ showDialog:false,})
            this.triggerEvent('choiseDate', {
                startTime: start, endTime: end
            })

        },

        startDateEvent(e) { this.setData({ starttoday: e.detail.value }) },
        endDateEvent(e) { this.setData({ endtoday: e.detail.value }) },

    }
})