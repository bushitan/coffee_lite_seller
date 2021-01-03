
var app = getApp()
module.exports = Behavior({
    data: {
        list: [],
        tabCur: 0,
        mainCur: 0,
        verticalNavTop: 0,
        load: true,

        productViewList:[], // 各个产品目录的view 宽度、高度参数
        productScrollTop:0, // 产品页面距离顶部scroll的高度

        categoryIndex: 0,  // 当前选择的目录
        itemIndex: 0, // 当前选择产品标志位
        attIndex: 0, //属性标志位
        valueIndex: 0,// 值标志位
    },
   
    created() {
        console.log("created")
    },
    attached() {
        // console.log("attached")
    },
    detached() {
        console.log("detached")

    },


    // 监听器
    observers: {
        // 监听list， 生成产品菜单的高度信息
        'list': function (list) {
            // var productViewList = []
            for (let i = 0; i < list.length; i++) {
                let view = wx.createSelectorQuery().select("#main-" + list[i].id);
                this.setData({ productViewList: [] })
                view.fields({
                    size: true
                }, data => {
                    if (data) {
                        console.log(data)
                        var productViewList = this.data.productViewList
                        if (productViewList.length == 0)   
                            data.top = 0
                        else
                            data.top = productViewList[productViewList.length - 1].top + productViewList[productViewList.length - 1].height
                        productViewList.push(data)
                        this.setData({ productViewList: productViewList })
                    }
                }).exec();
            }
        }

    },
    
    methods: {



        /**
         * @method list初始化
         */
        async productInit(){
            var showReLoad = false
            var res = await app.db3.productMenu({
                shopId: this.data.shopID
            })
            
            // 获取失败，重新加载
            if (res.code != 0)  
                showReLoad = true
                
            var temp = res.data
            for (var i = 0; i < temp.length; i++)
                temp[i].id = i

            this.setData({
                list: temp,
                showReLoad: showReLoad
            })

            this.orderInitNum()

            // wx.setStorageSync("menu_test", temp)
        },

        getTest(){
            var list = [{ "category": { "cate_id": 31, "cate_name": "热咖啡" }, "products": [{ "id": 143, "name": "澳白（8 OZ）", "price": 25, "oldprice": 0, "cost": 0, "weight": 0, "stock": 9983, "tags": ["咖啡", "奶泡"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 165, "picture_id": 193, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0000193_8-oz.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [{ "productAttributeID": 124, "productAttributeName": "温度", "isRequired": false, "displayOrder": 1, "attributeValues": [] }], "num": 8 }, { "id": 146, "name": "热美式咖啡（12 OZ）", "price": 22, "oldprice": 0, "cost": 0, "weight": 0, "stock": 9997, "tags": ["咖啡", "美式"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 164, "picture_id": 192, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0000192_12-oz.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [], "num": 1 }, { "id": 166, "name": "冰博克 （热 8 OZ）", "price": 30, "oldprice": 0, "cost": 0, "weight": 0, "stock": 9998, "tags": ["无糖", "提纯鲜奶", "甜度高", "100％阿拉比卡咖啡"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 1209, "picture_id": 1246, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0001246_-8-oz.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [] }, { "id": 174, "name": "热 伊丽莎白 招牌特调（12 OZ）", "price": 30, "oldprice": 0, "cost": 0, "weight": 0, "stock": 9998, "tags": ["咖啡", "拿铁", "隐藏菜单中的特调"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 1214, "picture_id": 1251, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0001251_-12-oz.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [{ "productAttributeID": 135, "productAttributeName": "甜度", "isRequired": false, "displayOrder": 0, "attributeValues": [{ "typeID": 0, "associatedProductID": 0, "name": "正常", "colorSquaresRgb": null, "imageSquaresImage": 0, "priceAdjustment": 0, "weightAdjustment": 0, "cost": 0, "quantity": 1, "is_pre_selected": false, "display_order": 0, "product_image_id": 0, "type": 0, "id": 220 }, { "typeID": 0, "associatedProductID": 0, "name": "半糖", "colorSquaresRgb": null, "imageSquaresImage": 0, "priceAdjustment": 0, "weightAdjustment": 0, "cost": 0, "quantity": 1, "is_pre_selected": false, "display_order": 0, "product_image_id": 0, "type": 0, "id": 221 }, { "typeID": 0, "associatedProductID": 0, "name": "无糖", "colorSquaresRgb": null, "imageSquaresImage": 0, "priceAdjustment": 0, "weightAdjustment": 0, "cost": 0, "quantity": 1, "is_pre_selected": false, "display_order": 0, "product_image_id": 0, "type": 0, "id": 222 }] }] }, { "id": 176, "name": "热海盐焦糖拿铁（12 OZ）", "price": 30, "oldprice": 0, "cost": 0, "weight": 0, "stock": 9998, "tags": ["咖啡", "焦糖", "拿铁"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 181, "picture_id": 210, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0000210_12-oz.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [] }, { "id": 177, "name": "热海盐焦糖拿铁（16 OZ）", "price": 38, "oldprice": 0, "cost": 0, "weight": 0, "stock": 10000, "tags": ["咖啡", "焦糖", "拿铁"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 182, "picture_id": 211, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0000211_16-oz.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [] }, { "id": 178, "name": "热低脂燕麦拿铁（12 OZ）", "price": 33, "oldprice": 0, "cost": 0, "weight": 0, "stock": 9999, "tags": ["oatly低脂燕麦奶"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 183, "picture_id": 212, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0000212_12-oz.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [{ "productAttributeID": 137, "productAttributeName": "甜度", "isRequired": false, "displayOrder": 0, "attributeValues": [{ "typeID": 0, "associatedProductID": 0, "name": "无糖", "colorSquaresRgb": null, "imageSquaresImage": 0, "priceAdjustment": 0, "weightAdjustment": 0, "cost": 0, "quantity": 1, "is_pre_selected": false, "display_order": 0, "product_image_id": 0, "type": 0, "id": 225 }, { "typeID": 0, "associatedProductID": 0, "name": "加糖", "colorSquaresRgb": null, "imageSquaresImage": 0, "priceAdjustment": 0, "weightAdjustment": 0, "cost": 0, "quantity": 1, "is_pre_selected": false, "display_order": 0, "product_image_id": 0, "type": 0, "id": 226 }] }] }, { "id": 180, "name": "热SOE拿铁（8OZ）", "price": 28, "oldprice": 0, "cost": 0, "weight": 0, "stock": 10000, "tags": ["咖啡", "拿铁", "soe"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 1217, "picture_id": 1254, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0001254_soe8oz.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [] }, { "id": 181, "name": "热SOE拿铁（12OZ）", "price": 32, "oldprice": 0, "cost": 0, "weight": 0, "stock": 10000, "tags": ["咖啡", "拿铁", "soe"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 1215, "picture_id": 1252, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0001252_soe12oz.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [] }, { "id": 187, "name": "热拿铁（12 OZ）", "price": 28, "oldprice": 0, "cost": 0, "weight": 0, "stock": 10000, "tags": ["咖啡", "拿铁"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 188, "picture_id": 220, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0000220_12-oz.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [] }, { "id": 190, "name": "热香草拿铁（12 OZ）", "price": 30, "oldprice": 0, "cost": 0, "weight": 0, "stock": 10000, "tags": ["咖啡", "拿铁", "香草浆"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 190, "picture_id": 222, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0000222_12-oz.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [] }, { "id": 192, "name": "热焦糖玛奇朵（12 OZ）", "price": 30, "oldprice": 0, "cost": 0, "weight": 0, "stock": 10000, "tags": ["咖啡", "焦糖"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 192, "picture_id": 224, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0000224_12-oz.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [] }, { "id": 194, "name": "热摩卡奇诺（12 OZ）", "price": 30, "oldprice": 0, "cost": 0, "weight": 0, "stock": 10000, "tags": ["咖啡", "摩卡"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 194, "picture_id": 226, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0000226_12-oz.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [] }], "id": 0 }, { "category": { "cate_id": 32, "cate_name": "冰咖啡" }, "products": [{ "id": 145, "name": "小棕瓶", "price": 32, "oldprice": 0, "cost": 0, "weight": 0, "stock": 10000, "tags": ["咖啡", "入门级", "冷藏保存"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 163, "picture_id": 190, "position": 1, "src": "https://wm.51zfgx.com/images/thumbs/0000190.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [] }, { "id": 147, "name": "冰伊丽莎白 招牌特调（12 OZ）", "price": 30, "oldprice": 0, "cost": 0, "weight": 0, "stock": 9993, "tags": ["隐藏菜单", "特调咖啡"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 1207, "picture_id": 1243, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0001243_-12-oz.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [{ "productAttributeID": 127, "productAttributeName": "糖量", "isRequired": false, "displayOrder": 0, "attributeValues": [{ "typeID": 0, "associatedProductID": 0, "name": "正常", "colorSquaresRgb": null, "imageSquaresImage": 0, "priceAdjustment": 0, "weightAdjustment": 0, "cost": 0, "quantity": 1, "is_pre_selected": false, "display_order": 0, "product_image_id": 0, "type": 0, "id": 227 }, { "typeID": 0, "associatedProductID": 0, "name": "半糖", "colorSquaresRgb": null, "imageSquaresImage": 0, "priceAdjustment": 0, "weightAdjustment": 0, "cost": 0, "quantity": 1, "is_pre_selected": false, "display_order": 0, "product_image_id": 0, "type": 0, "id": 228 }, { "typeID": 0, "associatedProductID": 0, "name": "无糖", "colorSquaresRgb": null, "imageSquaresImage": 0, "priceAdjustment": 0, "weightAdjustment": 0, "cost": 0, "quantity": 1, "is_pre_selected": false, "display_order": 0, "product_image_id": 0, "type": 0, "id": 229 }] }] }, { "id": 148, "name": "冰博克（冰 8 OZ）", "price": 30, "oldprice": 0, "cost": 0, "weight": 0, "stock": 9997, "tags": ["无糖", "提纯鲜奶", "甜度高", "无冰块", "100％阿拉比卡咖啡"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 1210, "picture_id": 1247, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0001247_-8-oz.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [{ "productAttributeID": 128, "productAttributeName": "规格", "isRequired": false, "displayOrder": 0, "attributeValues": [] }] }, { "id": 149, "name": "冰椰青美式（12OZ）", "price": 28, "oldprice": 0, "cost": 0, "weight": 0, "stock": 9995, "tags": ["咖啡", "美式"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 1211, "picture_id": 1248, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0001248_12oz.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [] }, { "id": 152, "name": "冰海盐焦糖拿铁 （12OZ）", "price": 30, "oldprice": 0, "cost": 0, "weight": 0, "stock": 9997, "tags": ["咖啡", "焦糖", "拿铁"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 170, "picture_id": 198, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0000198_-12oz.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [] }, { "id": 155, "name": "冰拿铁 （12OZ）", "price": 28, "oldprice": 0, "cost": 0, "weight": 0, "stock": 9996, "tags": ["咖啡", "拿铁"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 173, "picture_id": 201, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0000201_-12oz.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [] }, { "id": 156, "name": "冰美式 （12OZ）", "price": 22, "oldprice": 0, "cost": 0, "weight": 0, "stock": 10000, "tags": ["咖啡", "美式"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 174, "picture_id": 202, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0000202_-12oz.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [] }, { "id": 157, "name": "冰SOE拿铁（12OZ）", "price": 32, "oldprice": 0, "cost": 0, "weight": 0, "stock": 9998, "tags": ["咖啡", "牛奶", "拿铁"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 1205, "picture_id": 1241, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0001241_soe12oz.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [] }, { "id": 161, "name": "冰低脂燕麦拿铁 中杯（12OZ）", "price": 33, "oldprice": 0, "cost": 0, "weight": 0, "stock": 10000, "tags": ["咖啡", "拿铁", "oatly低脂燕麦奶"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 175, "picture_id": 203, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0000203_-12oz.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [{ "productAttributeID": 132, "productAttributeName": "甜度", "isRequired": false, "displayOrder": 0, "attributeValues": [{ "typeID": 0, "associatedProductID": 0, "name": "加糖", "colorSquaresRgb": null, "imageSquaresImage": 0, "priceAdjustment": 0, "weightAdjustment": 0, "cost": 0, "quantity": 1, "is_pre_selected": false, "display_order": 1, "product_image_id": 0, "type": 0, "id": 213 }, { "typeID": 0, "associatedProductID": 0, "name": "无糖", "colorSquaresRgb": null, "imageSquaresImage": 0, "priceAdjustment": 0, "weightAdjustment": 0, "cost": 0, "quantity": 1, "is_pre_selected": false, "display_order": 2, "product_image_id": 0, "type": 0, "id": 214 }] }] }, { "id": 163, "name": "冰香草拿铁 中杯（12OZ）", "price": 30, "oldprice": 0, "cost": 0, "weight": 0, "stock": 9998, "tags": ["咖啡", "拿铁", "香草浆"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 177, "picture_id": 206, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0000206_-12oz.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [] }, { "id": 165, "name": "小黑瓶（180ml）", "price": 35, "oldprice": 0, "cost": 0, "weight": 0, "stock": 10000, "tags": ["12小时的慢节奏，180ml的幸福感", "精品冰滴", "每日限量", "冷藏保存5天"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 179, "picture_id": 208, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0000208_180ml.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [] }], "id": 1 }, { "category": { "cate_id": 34, "cate_name": "无咖啡因饮品" }, "products": [{ "id": 196, "name": "海盐焦糖牛奶（热）", "price": 22, "oldprice": 0, "cost": 0, "weight": 0, "stock": 10000, "tags": ["焦糖", "海盐", "巴氏杀菌鲜奶"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 196, "picture_id": 228, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0000228.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [] }], "id": 2 }, { "category": { "cate_id": 35, "cate_name": "加浓缩" }, "products": [{ "id": 199, "name": "SOE浓缩（单份）", "price": 0.01, "oldprice": 0, "cost": 0, "weight": 0, "stock": 9995, "tags": ["不单点", "只添加到soe的咖啡里噢"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 1218, "picture_id": 1255, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0001255_soe.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [] }, { "id": 198, "name": "意式浓缩（单份）", "price": 3, "oldprice": 0, "cost": 0, "weight": 0, "stock": 9998, "tags": ["不单点", "只添加到意式咖啡里噢"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 1219, "picture_id": 1256, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0001256.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [] }], "id": 3 }]


            var currentItem = { "id": 143, "name": "澳白（8 OZ）", "price": 25, "oldprice": 0, "cost": 0, "weight": 0, "stock": 9983, "tags": ["咖啡", "奶泡"], "shortDescription": null, "fullDescription": null, "order_min_quantity": 1, "order_max_quantity": 10000, "published": true, "imgs": [{ "id": 165, "picture_id": 193, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0000193_8-oz.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [{ "productAttributeID": 124, "productAttributeName": "温度", "isRequired": false, "displayOrder": 1, "attributeValues": [] }], "num": 8 }

            var currentItem = { "id": 2444, "name": "小杯子点单", "price": 0.01, "oldprice": 200, "cost": 0, "weight": 20, "stock": 3, "tags": ["测试"], "shortDescription": "去抢购下单-wx12dbd7b90d1260a8-pages/route/route?shop_id=73", "fullDescription": "<section data-tplid=\"97677\" data-tools=\"135编辑器\">\r\n<section class=\"_135editor\" style=\"font-size: 16px;\">\r\n<section style=\"background-repeat: repeat; background-position: left top; width: 100%; box-sizing: border-box;\">\r\n<section class=\"_135editor\">\r\n<section style=\"width: 100%; margin: 10px auto;\" data-width=\"100%\">\r\n<section style=\"text-align: center;\"></section>\r\n<section style=\"width: 100%; margin-top: 1em;\" data-width=\"100%\"><img style=\"display: block; margin: 0px; width: 100%;\" title=\"1.jpg\" src=\"https://135editor.cdn.bcebos.com/uploadword/1068903/202010/5f98301a-8b30-454e-8ab9-2424ac10006a.jpg\" alt=\"1.jpg\" width=\"100%\" height=\"\" border=\"0\" data-width=\"100%\" data-op=\"change\" data-ratio=\"1.4976851851851851\" data-w=\"750\" /><img style=\"display: block; margin: 0px; width: 100%;\" title=\"2.jpg\" src=\"https://135editor.cdn.bcebos.com/files/users/106/1068903/202010/0XT6S95WF_Gh4C.jpg\" alt=\"2.jpg\" width=\"100%\" height=\"\" border=\"0\" data-width=\"100%\" data-op=\"change\" data-ratio=\"1.4973333333333334\" data-w=\"750\" /><img style=\"display: block; margin: 0px; width: 100%;\" title=\"3.jpg\" src=\"https://135editor.cdn.bcebos.com/files/users/106/1068903/202010/0tMWgcRAm_yIze.jpg\" alt=\"3.jpg\" width=\"100%\" height=\"\" border=\"0\" data-width=\"100%\" data-op=\"change\" data-ratio=\"0.6388888888888888\" data-w=\"750\" /><img style=\"display: block; margin: 0px; width: 100%;\" title=\"4.jpg\" src=\"https://135editor.cdn.bcebos.com/files/users/106/1068903/202010/0wtJXqSwf_JpRx.jpg\" alt=\"4.jpg\" width=\"100%\" height=\"\" border=\"0\" data-width=\"100%\" data-op=\"change\" data-ratio=\"2.7053333333333334\" data-w=\"750\" /><img style=\"display: block; margin: 0px; width: 100%;\" title=\"5.jpg\" src=\"https://135editor.cdn.bcebos.com/files/users/106/1068903/202010/0nEVy6cvS_XANU.jpg\" alt=\"5.jpg\" width=\"100%\" height=\"\" border=\"0\" data-width=\"100%\" data-op=\"change\" data-ratio=\"2.7053333333333334\" data-w=\"750\" /></section>\r\n<section style=\"text-align: center; color: #63707e; font-size: 14px; margin-top: 1em;\"></section>\r\n</section>\r\n</section>\r\n<section>\r\n<p> </p>\r\n</section>\r\n</section>\r\n</section>\r\n</section>\r\n<p><audio style=\"display: none;\" controls=\"controls\"></audio></p>\r\n<p><audio style=\"display: none;\" controls=\"controls\"></audio></p>\r\n<p><audio style=\"display: none;\" controls=\"controls\"></audio></p>\r\n<p><audio style=\"display: none;\" controls=\"controls\"></audio></p>", "order_min_quantity": 1, "order_max_quantity": 10, "published": true, "imgs": [{ "id": 3574, "picture_id": 3770, "position": 0, "src": "https://wm.51zfgx.com/images/thumbs/0003770.jpeg", "isNew": false, "title": "", "alt": "" }], "attributes": [{ "productAttributeID": 1298, "productAttributeName": "套装1", "isRequired": false, "displayOrder": 0, "attributeValues": [{ "typeID": 0, "associatedProductID": 0, "name": "套装产品1", "colorSquaresRgb": null, "imageSquaresImage": 0, "priceAdjustment": 0, "weightAdjustment": 0, "cost": 0, "quantity": 1, "is_pre_selected": false, "display_order": 0, "product_image_id": 0, "type": 0, "id": 1778, "isSelect": true }, { "typeID": 0, "associatedProductID": 0, "name": "套装产品2", "colorSquaresRgb": null, "imageSquaresImage": 0, "priceAdjustment": 2, "weightAdjustment": 0, "cost": 0, "quantity": 1, "is_pre_selected": false, "display_order": 0, "product_image_id": 0, "type": 0, "id": 1779, "isSelect": false }] }, { "productAttributeID": 1299, "productAttributeName": "冰量", "isRequired": false, "displayOrder": 0, "attributeValues": [{ "typeID": 0, "associatedProductID": 0, "name": "少冰", "colorSquaresRgb": null, "imageSquaresImage": 0, "priceAdjustment": 0, "weightAdjustment": 0, "cost": 0, "quantity": 1, "is_pre_selected": false, "display_order": 0, "product_image_id": 0, "type": 0, "id": 1780, "isSelect": true }, { "typeID": 0, "associatedProductID": 0, "name": "去冰", "colorSquaresRgb": null, "imageSquaresImage": 0, "priceAdjustment": 0, "weightAdjustment": 0, "cost": 0, "quantity": 1, "is_pre_selected": false, "display_order": 0, "product_image_id": 0, "type": 0, "id": 1781, "isSelect": false }] }] }
            // this.setData({ 
            //     list: list, 
            //     currentItem: currentItem,
            // })


        },
        


        /**
         * @method 更新产品已经点单总数量
         */
        productNumSet(isAdd) {
            var list = this.data.list
            // debugger
            if (list[this.data.categoryIndex].products[this.data.itemIndex].hasOwnProperty("num") == false)
                list[this.data.categoryIndex].products[this.data.itemIndex].num = 0

            if (isAdd)
                list[this.data.categoryIndex].products[this.data.itemIndex].num += 1
            else {

                list[this.data.categoryIndex].products[this.data.itemIndex].num -= 1
                list[this.data.categoryIndex].products[this.data.itemIndex].num < 0 ? 0 : list[this.data.categoryIndex].products[this.data.itemIndex].num
            }

            // this.data.list = []
            // this.data.list = list
            this.setData({
                list: list
            })
        },

        /**
         * @method 点击category，滑动右侧product列表
         */
        TabSelect(e) {
            
            var index = e.currentTarget.dataset.id
            this.setData({
                tabCur: index,
                mainCur: index,
                verticalNavTop: (index - 1) * 50,
                productScrollTop: this.data.productViewList[index].top 
            })
        },
        /**
         * @method 滑动设置【暂时不修改】
         */
        VerticalMain(e) {
            let that = this;
            let list = this.data.list;
            let tabHeight = 0;
            if (this.data.load) {
                for (let i = 0; i < list.length; i++) {
                    let view = wx.createSelectorQuery().select("#main-" + list[i].id);
                    view.fields({
                        size: true
                    }, data => {
                        list[i].top = tabHeight;
                        tabHeight = tabHeight + data.height;
                        list[i].bottom = tabHeight;
                    }).exec();
                }
                that.setData({
                    load: false,
                    list: list
                })
            }
            let scrollTop = e.detail.scrollTop + 20;
            for (let i = 0; i < list.length; i++) {
                if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
                    that.setData({
                        verticalNavTop: (list[i].id - 1) * 50,
                        tabCur: list[i].id
                    })
                    return false
                }
            }
        },

        /**
         * @method  计算每个模块的距离
         */
        productMathTop(e){
            // console.log(e.detail.scrollTop)
            // var top = e.detail.scrollTop
            // var productViewList = this.data.productViewList 
            // for (var i = 0; i < productViewList.length ; i++){
            //     if()
            //     if (top > productViewList[i].top && top < productViewList[i].height )    
            //         this.setData({
            //             tabCur: i,
            //             mainCur: i,
            //         })
            // }

            // productViewList
        },
    },
})