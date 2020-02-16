
class CoverUtils {
    config = {}   // 配置表
    stepList = [] // 步骤列表
    color = "#1d2a6d"
    constructor() {
        this.config = {
            width: 1920,
            height: 1080, 
            backgroundColor:"#ffffff",
            debug: false,
            pixelRatio: 1,
            blocks: [],
            texts: [],
            images: [{  //背景图
                width: 1920,
                height: 1080, 
                x: 0,
                y: 0,
                url: '/images/2013/swiper.jpg',
            }],
        }
    }
    
    /**
     * @method 获取最后的配置结果
     */
    getConfigData() {
        return this.config
    }

    downCloudImage(fileID){
        return new Promise((resolve, reject) => {
            if (fileID) {
                wx.showLoading({})
                wx.cloud.downloadFile({
                    fileID: fileID,
                    success: res => {
                        wx.hideLoading()
                        console.log(res)
                        resolve(res.tempFilePath)
                    },
                    fail: err => {
                        console.log(err)
                        wx.showModal({
                            title: "下载文件失败",
                        })
                    }
                })
            } else
                resolve("")
        })
    }

    async start(obj) {
        this._addQR(obj.qrUrl, obj.x, obj.y, obj.width, obj.height)
        // var qr = await this.downCloudImage(obj.qrUrl)
        // var logo = await this.downCloudImage(obj.logo)
        // var name = obj.name
        // var tel = obj.tel
        // this._addQR(qr, logo)
        // this._addTitle(name)
        // this._addTel(tel)
    }

    _addQR(url, x, y, width, height){
        // var qr = qrUrl || '../../images/cover/template_qr.png'
        // var logo = logo || '../../images/cover/template_logo.jpg'
        // var baseX = 445, baseY = 458
        // this.config.images.push({ x: baseX, y: baseY, width: 350, height: 350, url: qr, })
        this.config.images.push({ 
            x: x, 
            y: y, 
            width: width, 
            height: height, 
            url: url 
        })
    }
}

module.exports = CoverUtils