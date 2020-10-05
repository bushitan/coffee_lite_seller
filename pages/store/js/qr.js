
var app = getApp()


import Poster from '../../../components2/poster/poster';
const CoverUtils = require("../../../utils/cover_utils.js")
module.exports = Behavior({
    data: {
      
    },
    ready() {
        console.log("poi ready")
        this.qrInit()
        //  this.poiOnInit()
    },
    methods: {
        qrInit(){

            // this.getCover()
        },


        /**********获取海报***********/
        async qrGetCover(e) {

            const version = wx.getSystemInfoSync().SDKVersion
            console.log(version)

            if (this.compareVersion(version, '2.13.0') >= 0) {
            } else {
                wx.showModal({
                    title: '微信版本过低',
                    content: '请将微信更新至最新版本',
                })
                return
            }

            // var coverUtils = new CoverUtils()
            // // debugger
            // coverUtils.start({
            //     // qrUrl: e.currentTarget.dataset.qr_url ||
            //     qrUrl: "https://6375-cup-customer-release-1301587562.tcb.qcloud.la/store_qr/c2332634-0397-11eb-86fa-e95aa2c51b5d.jpg",
            //     x: 10,
            //     y: 10,
            //     width: 300,
            //     height: 300,
            // })
            // var data = coverUtils.getConfigData()

            // 获取二维码
            var res = await app.db5Customer.getStoreQR({
                store_uuid: this.data.store.uuid,
            })
            var qrUrl = res.data.tempFileURL


            var config = this.qrGetConfig(qrUrl)


            console.log(config)
            wx.showLoading({
                title: '生成中',
                duration: 4000,
            })
            this.setData({ posterConfig: config }, () => {
                Poster.create(true);    // 入参：true为抹掉重新生成
            });
        },

        compareVersion(v1, v2) {
                v1 = v1.split('.')
            v2 = v2.split('.')
            const len = Math.max(v1.length, v2.length)

            while(v1.length <len) {
                        v1.push('0')
                    }
            while(v2.length <len) {
                        v2.push('0')
                    }

            for(let i = 0; i<len; i++) {
                const num1 = parseInt(v1[i])
                const num2 = parseInt(v2[i])

                if (num1 > num2) {
                    return 1
                } else if (num1 < num2) {
                    return -1
                }
            }

            return 0
        },

        /**
         * @method 海报的配置
         */
        qrGetConfig(qrUrl){

          
            var store = this.data.store

            // 选择背景
            var exchange_value = store.exchange_value
            var bgUrl = "https://6375-cup-customer-release-1301587562.tcb.qcloud.la/sys/tk_10.png"
            switch (exchange_value) {
                case 5: bgUrl = "https://6375-cup-customer-release-1301587562.tcb.qcloud.la/sys/tk_5.png"; break;
                case 6: bgUrl = "https://6375-cup-customer-release-1301587562.tcb.qcloud.la/sys/tk_6.png"; break;
                case 8: bgUrl = "https://6375-cup-customer-release-1301587562.tcb.qcloud.la/sys/tk_8.png"; break;
                case 10: bgUrl = "https://6375-cup-customer-release-1301587562.tcb.qcloud.la/sys/tk_10.png"; break;
            }


            var config = {
                width: 2362,
                height: 3544,
                backgroundColor: "#ffffff",
                debug: false,
                pixelRatio: 1,
                blocks: [],
                texts: [
                    {

                        x: 1181,
                        y: 2650,
                        fontSize:80,
                        text: store.summary,
                        textAlign:'center',
                    }
                ],
                images: [
                    {  //背景图
                        width: 2362,
                        height: 3544,
                        x: 0,
                        y: 0,
                        url: bgUrl,
                    },
                    {  //背景图
                        width: 1100,
                        height: 1100,
                        x: 632,
                        y: 940,
                        url: qrUrl,
                    }
                ],
            }
            console.log(config)
            return config
        },


        //合成成功
        onPosterSuccess(e) {
            const { detail } = e;
            console.log(e)
            wx.previewImage({
                current: detail,
                urls: [detail]
            })
        },



    },

    // onLoad() {
    //     console.log("behavior onload")
    // },
    // created() {
    //     console.log("created")
    // },

    // attached() {
    //     debugger
    //     console.log("attached")
    // },

    // ready() {
    // },
    // moved() {
    //     console.log("moved")
    // },

    // detached() {
    //     console.log("detached")
    // },
})

