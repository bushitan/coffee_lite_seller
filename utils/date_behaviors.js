/**
 * v1 版本先享卡，预支付计算
 */

var util = require('util.js')
var app = getApp()
module.exports = Behavior({
    data: {
        
        CreatedAtMin: "" ,
        CreatedAtMax: "",
        yesterday:util.yesterday,
        today:util.today,

    },
    ready() {
        console.log( 'coupon')
        // this.onInitCoupon()
    },

    methods: {
        // 改变开始日期
        CreatedAtMinChange(e) {
            this.setData({ CreatedAtMin: e.detail.value })
            this.onInit()
        },
        // 改变结束日期
        CreatedAtMaxChange(e) {
            this.setData({ CreatedAtMax: e.detail.value })
            this.onInit()
        },
        isOutDateRange(){
            var min = new Date( this.data.CreatedAtMin).getTime()
            var max =  new Date(this.data.CreatedAtMax).getTime()
            if(min > max ){
                wx.showModal({
                    title:"开始日期大于结束日期，请重新选择",
                })
                return true
            }
            else 
                return false
        },
    },




    // onLoad() {
    //     console.log("behavior onload")
    // },
    // created() {
    //     console.log("created")
    // },

    // attached() {
    //     console.log("attached")
    // },

    
    // moved() {
    //     console.log("moved")
    // },

    // detached() {
    //     console.log("detached")
    // },
})