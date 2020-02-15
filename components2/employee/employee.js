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
            { name: "丰丰", logo: "/images/2013/swiper.jpg", employeeUUID:"12312"},
        ]        
    },
    created(){

    },
    /**
     * 组件的方法列表
     */
    methods: {
        addEmployee() {
            wx.scanCode({
                
            })    
        },
        deleteEmployee(e) {
            var employeeUUID = e.currentTarget.dataset.uuid
            console.log(employeeUUID)
            wx.showModal({
                title: '是否删除此员工',
                success(res){
                    if(res.confirm){
                        // TODO delete
                    }
                }
            })
         },
    }
})
