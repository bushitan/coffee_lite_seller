// components2/employee/employee.js
var app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },
    options:{
        styleIsolation:"apply-shared"
    },
    /**
     * 组件的初始数据
     */
    data: {
        list:[
            // { name: "丰丰", logo: "/images/2013/swiper.jpg", employeeUUID:"12312"},
        ]        
    },
    attached(){
        this.getEmployeeList()
    },
    /**
     * 组件的方法列表
     */
    methods: {

        /**
         * 查询员工列表
         */
        async getEmployeeList(){
            var list = await app.db.storeQueryStoreSeller()
            this.setData({
                list: list
            })
        },

        addEmployee() {
            var that = this
            wx.scanCode({
                success(res){
                    var list = res.result.split(",")
                    if (list[0] != 'seller'){
                        wx.showModal({
                            title: '您扫的不是员工二维码',
                            showCancel: false,
                        })
                        return 
                    }
                    var empSession = list[1]
                    app.db.sysSellerBindEmployee({
                        empSession: empSession
                    }).then(res=>{
                        wx.showModal({
                            title: res.msg,
                            showCancel:false,
                        })
                        if(res.code == 0){
                            that.getEmployeeList()                            
                        }
                        console.log(res.msg)
                    })
                },
            })    
        },
        deleteEmployee(e) {
            var that = this
            var employeeUUID = e.currentTarget.dataset.uuid
            console.log(employeeUUID)
            wx.showModal({
                title: '是否删除此员工',
                success(res){
                    if(res.confirm){
                        that.deleteSuccess(employeeUUID)
                    }
                }
            })
        },

        async deleteSuccess(employeeUUID){
            // TODO delete
            var res = await app.db.sysSellerUnBindEmployee({
                empUUID: employeeUUID
            })
            wx.showModal({
                title: res.msg,
                showCancel: false,
            })
            if (res == 0) {
                this.getEmployeeList()                  
            }

        },

        onHelp(){
            // debugger
            wx.previewImage({
                urls: ["../../images/help/help.png"],
            })
        },
    }
})
