// components/xx_cover_news/xx_cover_news.js
Component({
  /**
   * 组件的属性列表
   */
    properties: {
        score: {
            type: Number,
            value: 0,
        },
        logo: {
            type: String,
            value: "",
        },
        summary: {
            type: String,
            value: "",
        },
        color: {
            type: String,
            value: "#000",
        }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      // 改变
    _change(newVal, oldVal) {
    },

  }
})
