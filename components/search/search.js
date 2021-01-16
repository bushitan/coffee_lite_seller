// components/search/search.js
var app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        placeholder:{
            type: String,
            value: "请输入搜索内容"
        },
    },
    behaviors: [app.configBehaviors],

    options: { styleIsolation: 'apply-shared'},
    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {

        confirm(e){
            // console.log()

            var input = e.detail.value.input
            if(!input)
                wx.showToast({  title: '请输入搜索信息' ,icon:"loading" })
            else
                this.triggerEvent('confirm', input)
        },
    }
})
