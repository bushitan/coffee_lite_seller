
var app = getApp()
module.exports = Behavior({
    data: {
        order: {},
        key:"",
        total:{},
    },

    created() {    },
    attached() {    },
    detached() {    },
    methods: {

        /**
         * @method  清空order
         */
        orderClear(){
            // 消除选规格的数字
            var list = this.data.list
            console.log(list)
            for (var i = 0; i < list.length ; i++)
                for (var j = 0; j < list[i].products.length ; j++) {
                    console.log(list[i].products[j], i, j)
                    list[i].products[j].num = 0
                }

            console.log(list)

            this.setData({
                order: {},
                list: list,
                totalPrice: 0,
                totalQuantity: 0,
            })
            wx.setStorageSync("order", {})
        },

        /**
         * @method  更新key
         */
        orderKeySet() {
            var key = this.data.categoryIndex + "_" + this.data.itemIndex + "_"
            var currentItem = this.data.currentItem
            for (var i = 0; i < currentItem.attributes.length; i++) {
                for (var j = 0; j < currentItem.attributes[i].attributeValues.length; j++) {
                    if (currentItem.attributes[i].attributeValues[j].isSelect == true) {
                        key = key + i + "_" + j + "_"
                    }
                }
            }
            // this.data.key = key
            this.setData({
                key: key
            })
        },

        // 更新已选择订单order
        orderChange(isAdd) {
            var order = this.data.order
            // var currentItem = this.data.list[this.data.categoryIndex].products[this.data.itemIndex] // 当前
            var currentItem = this.data.currentItem
            var Attributes = []	//上传属性列表		
            var attDes = "" // 属性描述
            for (var i = 0; i < currentItem.attributes.length; i++) {
                for (var j = 0; j < currentItem.attributes[i].attributeValues.length; j++) {
                    if (currentItem.attributes[i].attributeValues[j].isSelect == true) {
                        Attributes.push({
                            "Id": currentItem.attributes[i].productAttributeID,
                            "Value": currentItem.attributes[i].attributeValues[j].id
                        })
                        attDes = attDes + currentItem.attributes[i].attributeValues[j].name + "、"
                    }
                }
            }
            attDes = attDes.substr(0, attDes.length - 1);  // 删除最后一个字符
            var key = this.data.key
            if (order.hasOwnProperty(key) == false) {
                order[key] = {
                    // 下单需要参数
                    ProductId: currentItem.id,
                    Quantity: 1,
                    Attributes: Attributes,
                    // 展示需要参数
                    cover: currentItem.imgs ? currentItem.imgs[0] ? currentItem.imgs[0].src : "" : "",
                    name: currentItem.name,
                    price: currentItem.price,
                    total: parseFloat(currentItem.price).toFixed(2),
                    attDes: attDes,
                    // 订单位置标记
                    categoryIndex: this.data.categoryIndex,  // 当前选择的目录
                    itemIndex: this.data.itemIndex, // 当前选择产品标志位
                    attIndex: this.data.attIndex, //属性标志位
                    valueIndex: this.data.valueIndex,// 值标志位

                }
            } else {
                if (isAdd)
                    order[key].Quantity += 1
                else {
                    order[key].Quantity -= 1
                    order[key].Quantity < 0 ? 0 : order[key].Quantity
                }
                order[key].total = parseFloat(order[key].Quantity * order[key].price).toFixed(2)
            }

            // 删除key下的数据
            if (order[key].Quantity <= 0)
                delete order[key]
            // this.data.order = []
            // this.data.order = order

            this.setData({
                order: order
            })


            // console.log(key,Attributes,attDes)

            // order[key] = OrderItems
        },


        orderTotalSet() {
            var total = this.data.total
            var totalPrice = 0
            var totalQuantity = 0
            var order = this.data.order
            for (var i in order) {
                totalPrice += order[i].Quantity * order[i].price
                totalQuantity += order[i].Quantity
            }
            console.log(totalPrice, totalQuantity)
            total.totalPrice = parseFloat(totalPrice).toFixed(2)
            total.totalQuantity = parseInt(totalQuantity)
            this.setData({
                total: total
                // totalPrice: parseFloat(totalPrice).toFixed(2),
                // totalQuantity: parseInt(totalQuantity),
            })
        },

    },
})