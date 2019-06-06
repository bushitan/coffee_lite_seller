// components/xx_cover_news/xx_cover_news.js
Component({
  /**
   * 组件的属性列表
   */
    properties: {        
        // 改变颜色
        mode: {
            type: String,
            value: "",
        },
        isSpace: {
            type: Boolean,
            value: true,
        },

        summary: {
            type: String,
            value: "标题",
        },

        // 普通模式
        checkValue: {
            type: Number,
            value: 1,
        },

        // 分享模式
        shareCheckValue: {
            type: Number,
            value: 1,
        },
        shareNum: {
            type: Number,
            value: 1,
        },
        shareGiftValue: {
            type: Number,
            value: 1,
        },
        shareLimitTime: {
            type: Number,
            value: 1,
        },
        shareValidTime: {
            type: Number,
            value: 1,
        },
  },

  /**
   * 组件的初始数据
   */
    data: {
        MODE_SCORE: "score",
        MODE_SHARE: "share",
  },

    /**
     * 组件的方法列表
     */
    methods: {
        // 改变
        _changeMode(newVal, oldVal) {
            if (this.data.mode == "")
                this.setData({
                    mode: this.data.MODE_MENU
                })
        },
        _changeList(newVal, oldVal) { console.log(newVal, oldVal)},

        /**
         * return: 点击列表的index
         */
        click(e) {
            this.setData({
                initindex: e.currentTarget.dataset.index
            })
            this.triggerEvent('click', e.currentTarget.dataset.index);
        },

        scanScore(){

            this.triggerEvent('score');
        },
        scanShare(){

            this.triggerEvent('share');
        },

    }
})
