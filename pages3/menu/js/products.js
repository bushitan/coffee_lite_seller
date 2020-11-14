
var app = getApp()
module.exports = Behavior({
    data: {
        list: [],
        tabCur: 0,
        mainCur: 0,
        verticalNavTop: 0,
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
            this.setData({
                tabCur: e.currentTarget.dataset.id,
                mainCur: e.currentTarget.dataset.id,
                verticalNavTop: (e.currentTarget.dataset.id - 1) * 50
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
    },
})