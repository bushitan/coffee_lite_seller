
var app = getApp()
module.exports = Behavior({
    data: {
        currentItem:{

            // imgs: [
            //     { src: "" },
            // ],
            // tags: [],
            // attributes: [
            //     {
            //         isSelect: false,
            //         productAttributeName: "",
            //         attributeValues: [],
            //     },
            // ],
        },

    },

    created() {    },
    attached() {    },
    detached() {    },
    methods: {
        /**
         * @method 设置当前订单
         */
        itemSet() {
            console.log(this.data.categoryIndex, this.data.itemIndex, this.data.list[this.data.categoryIndex].products[this.data.itemIndex])

            // this.setData({ currentItem: {} })
            this.setData({ currentItem: this.data.list[this.data.categoryIndex].products[this.data.itemIndex] })
        },

        itemSKUInit(){
            var currentItem = this.data.currentItem

            for (var i = 0; i < currentItem.attributes.length; i++) {
                for (var j = 0; j < currentItem.attributes[i].attributeValues.length; j++) {
                    if (j == 0)
                        currentItem.attributes[i].attributeValues[j].isSelect = true
                    else
                        currentItem.attributes[i].attributeValues[j].isSelect = false
                }
            }
            this.setData({ currentItem: currentItem})
        },
        /**
         * @method 点击sku
         */
        itemSKUSet(e) {
            // 初始化订单数据

            // 默认为0
            var attIndex = e ? e.currentTarget.dataset.attindex : 0
            var valueIndex = e ? e.currentTarget.dataset.valueindex : 0

            var categoryIndex = this.data.categoryIndex
            var itemIndex = this.data.itemIndex
            var currentItem = this.data.currentItem
            //将已经选择的置false
            for (var i = 0; i < currentItem.attributes[attIndex].attributeValues.length; i++) 
                currentItem.attributes[attIndex].attributeValues[i].isSelect = false   
            // 选择SKU
            currentItem.attributes[attIndex].attributeValues[valueIndex].isSelect = true 
            // this.data.currentItem = {}
            // this.data.currentItem = currentItem // 更新当前SKU信息
            // this.data.attIndex = attIndex		// 更新属性位置	
            // this.data.valueIndex = valueIndex	// 更新值位置	
            this.setData({
                currentItem: currentItem,
                attIndex: attIndex,
                valueIndex: valueIndex,
            })
            // var currentItem = this.data.currentItem
            // // 初始化订单数据
            // for (var i = 0; i < currentItem.attributes.length; i++) {
            //     for (var j = 0; j < currentItem.attributes[i].attributeValues.length; j++) {
            //         if (j == 0)
            //             currentItem.attributes[i].attributeValues[j].isSelect = true
            //         else
            //             currentItem.attributes[i].attributeValues[j].isSelect = false
            //     }
            // }
            
        },





        
    },
})