// components/bar/bar.js
var app = getApp()
var util = require("../../utils/util.js")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        appId:{
            type:String,
            value:"",
        }
    },
    behaviors: [app.configBehaviors],
    options: { styleIsolation: 'apply-shared'},

    observers: {
        'appId': function (appId) {
            console.log("appid",appId)
            if(appId)
                this.onInit(appId)
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        list:[],
        bar:[
            { name: "上架中", id: 21 },
            { name: "未上架", id: 21 },
        ],
    },

    ready() { 
       
    },
    /**
     * 组件的方法列表
     */
    methods: {

        /**
         * @method 初始化小商店
         * 
         * wx7837f7a217ea0809 小杯子供应链
         * wx4b8c7fee50b901f6 小杯子便利店
         */
        async onInit(appId) { 
            console.log(appId)

            app.dbManager.wxShopServer.setAppId("wx7837f7a217ea0809")

            // this.test()
            // var res = await app.dbManager.wxShopServer.spuGetList({

            // })
            // this.clickBar()

            
            var res = await app.dbManager.wxShopServer.orderGet({
                "order_id":"1389747786857159"
            })
            var res = await app.dbManager.wxShopServer.orderSearch({
                // "start_pay_time": "2020-03-25 12:05:25",
                // "end_pay_time": "2020-04-25 12:05:25",
                // "start_create_time": "2020-01-1 12:05:25",
                // "end_create_time": "2021-01-25 12:05:25",

                "start_create_time": "2020-01-1 12:05:25",
                "end_create_time": "2021-02-25 12:05:25",
                // "title": "标题关键字",
                "sku_code": 1,
                // "user_name": "张三",
                // "tel_number": "15277126678",
                "on_aftersale_order_exist": 0,
                // "status": 20,
                "page": 1,
                "page_size": 100
            })



            1389747786857159

            // var res = await app.dbManager.wxShopServer.orderGetList({
            //     "start_create_time": "2020-01-1 12:05:25",
            //     "end_create_time": "2021-02-25 12:05:25",
            //     "status": 10,
            //     "page": 1,
            //     "page_size": 100
            // })


            // var res = await app.dbManager.wxShopServer.categoryGet({
            //     "f_cat_id": 0
            // })


            // var res = await app.dbManager.wxShopServer.brandGet({
            // })

            
            // var res = await app.dbManager.wxShopServer.skuGetList({
            //     "product_id": 1824002,
            //     "need_edit_sku": 0,     //	默认0:获取线上数据, 1:获取草稿数据
            //     "need_real_stock": 1    // 默认0:获取草稿库存, 1:获取线上真实库存
            // })
            
        },
       

        async clickBar(e){
            var index = e ? e.detail : 0 
            var need_edit_spu = 0
            if (index == 1) 
                need_edit_spu = 1
        
            var res = await app.dbManager.wxShopServer.spuGetList({
                "status": 5,
                "page": 1,
                "page_size": 1000,
                "need_edit_spu": need_edit_spu      // 默认0:获取线上数据, 1:获取草稿数据
            })

            this.setData({
                list: res.spus
            })
        },


        spuGetList(){

        },
        






        async test(){

            var res  = await app.dbManager.wxShopServer.componentAccessToken()




            var res = await app.dbManager.wxShopServer.spuGetList(
                {
                    "status": 5,
                    "page": 1,
                    "page_size": 10,
                    "need_edit_spu": 0      // 默认0:获取线上数据, 1:获取草稿数据
                }
            )
            this.setData({
                list: res.spus
            })

            console.log(this.data.list)
            // var res = await 
            app.dbManager.wxShopServer.orderGetList(
                {
                        "start_create_time": "2020-12-25 12:05:25",
                        "end_create_time": "2021-01-25 12:05:25",
                        "status": 23,
                        "page": 1,
                        "page_size": 10,
                    }
            ).then(res => {
                console.log(res)
            })

            // app.dbManager.wxShopServer.productBrandGet()
        },
    }
})





/**
 
 
https://api.weixin.qq.com/product/img/upload?access_token=41_kejLqoyrrV77h3OuEE7waOkg2mFUXOYYHR1udiVjnK5jGFdEqi1ppYYo6yRidmq8ZMWiWTacXLlUciotZXTHJttiSDkafutuTqgE5_atwDnHREMI1_x7-tHKEeGRzi5E3bJ-6FPYqqD5GA6aPVGaADDHNY&height=75&width=75

curl -F media=@test.jpg  "https://api.weixin.qq.com/product/img/upload?access_token=41_kejLqoyrrV77h3OuEE7waOkg2mFUXOYYHR1udiVjnK5jGFdEqi1ppYYo6yRidmq8ZMWiWTacXLlUciotZXTHJttiSDkafutuTqgE5_atwDnHREMI1_x7-tHKEeGRzi5E3bJ-6FPYqqD5GA6aPVGaADDHNY&height=75&width=75"

 */