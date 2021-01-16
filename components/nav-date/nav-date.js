const app = getApp();
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
            console.log("123")
            this.setData({
                showDialog: true
            })
         
        },
    }
})