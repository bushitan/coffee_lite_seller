/**
 * 获取查询列表具体的数据
 */
var app = getApp()

class Utils {
    constructor(){}

    // 菜单矩阵
    matrix = [
            {
                name: "入库",
                select: "/images/icon/score.png",
                unSelect: "/images/icon/score_un.png",
                list: [
                    { name: "记录", id: 11 }, 
                ]
            },
          
        ]

        /**登录流程 */
        async proLogin(){

            // var res = await app.dbm.admin.org.login()
            // console.log(res.data)
    
            // var res = await app.dbm.admin.org.CheckIfFocusOn()
            // console.log(res.data)
    
            // var res = await app.dbm.admin.org.GetCustomerRoles()
            // console.log(res.data)
    
    
        }


        /**
         * 门店信息 ,
         * 1、 
         */
        async proShop(){
            var res = await app.dbm.admin.org.GetAllCustomerRoles()
            console.log(res.data)
            var res = await app.dbm.admin.org.SearchEAForms({
                "pageIndex": 0,
                "pageSize": 10,
            })
            console.log(res.data)
        }
        

        /**
         * 品牌申请绑定流程
         * 1、用户填写申请表单，
         * 2、运营人员添加品牌 
         * 3、将用户绑定至品牌 
         */
        async proShopBind (){ 

        //    // 用户填写申请表单，获取用户的userToken
        //    var res = await app.dbm.admin.org.EntryApplicationForm()
        //    console.log(res.data)
           
        //    // 运营人员添加品牌
        //    var res = await app.dbm.admin.org.AddShopInfoForm()
        //    console.log(res.data)
           


        //    // 将用户绑定至品牌 
        //    var res = await app.dbm.admin.org.BindShopInfoManager()
        //    console.log(res.data)



       }

        /**
         * 品牌扫码绑定流程
         * 1、运营人员添加品牌 
         * 2、用户扫码绑定 
         */
        async proShopScanBind(){       

            // 运营人员添加品牌
            var res = await app.dbm.admin.org.SearchEAForms()
            console.log(res.data)

            // // 运营人员添加品牌
            // var res = await app.dbm.admin.org.SearchEAForms({
            //     realName:"Seeking Coffee",
            //     companyName:"啡力马托",
            //     legalPerson:"罗鹏",
            //     contactsName:"熙熙",
            // })             
            // console.log(res.data)
            
           // 审核通过
           var res = await app.dbm.admin.org.ApprovedEAForm({
                shopGuid :"6def565071a84fdface49f2975288baf",
                statusId:7
           })
           console.log(res.data)
           

            // // 用户扫码绑定 品牌
            // var res = await app.dbm.admin.org.BindShopInfoManagerByUser()
            // console.log(res.data)
        }



        /**
         * 分店增加流程
         * 1、增加分店
         * 2、查询分店列表
         * 3、查询单家分店信息
         *
         */
        async proShopBrand(){ 
            // var res = await app.dbm.admin.org.AddShopBranch({
            //     "shopGuid": "6def565071a84fdface49f2975288baf",
            //     "shopBranchName": "Seeking 金湖店",
            // })
            // console.log(res.data)

            
            var res = await app.dbm.admin.org.SearchShopBranches({
                "shopGuid": "6def565071a84fdface49f2975288baf",
                "pageIndex": 0,
                "pageSize": 10,
            })
            console.log(res.data)
  
        } 

        
        /**
         * 分店员工绑定流程
         * 1、为分店绑定店员，由管理员操作
         * 2、为分店绑定店员_由店员操作
         * 3、移除分店店员
         * 4、获取分店人员列表
         * 
         * "LittleCupShoper"  门店管理者"
         * "LittleCupSaleShoper" 门店收银员
         */
        async proShopBrandBind(){ 


            // var res = await app.dbm.admin.org.BindShoper({
            //     "shopBranchGuid": "8a8a3def-eeff-459d-961d-a9fdcd76d69c",
            //     "shoperGuid": "cbacf6ee66724b658cf3c7c7078b36d0",
            //     "rolesSystemName":["LittleCupShoper","LittleCupSaleShoper"],
            // })
            // console.log(res.data)

            var res = await app.dbm.admin.org.BindShoperBySelfScan({
                // "shopBranchId": 3,
                "shopBranchGuid": "8a8a3def-eeff-459d-961d-a9fdcd76d69c",
                "timestamp":1612604982986,

            })
            console.log(res.data)
            
            // var res = await app.dbm.admin.org.UnBindShoper({
            //     "shopBranchGuid": "8a8a3def-eeff-459d-961d-a9fdcd76d69c",
            //     "shoperGuid": "cbacf6ee66724b658cf3c7c7078b36d0",
            // })
            // console.log(res.data)


            var res = await app.dbm.admin.org.SearchShopers({
                "shopBranchGuid": "8a8a3def-eeff-459d-961d-a9fdcd76d69c",
            })
            console.log(res.data)
  
        }

        /**
         * 支付账户配置
         * 1、添加支付账户
         * 2、查询支付账户列表
         */
        async proPayment(){ 

            // var res = await app.dbm.admin.org.SaveWxPaymentInfo({
            //     "shopInfoGuid": "6def565071a84fdface49f2975288baf",
            //     "name": "Seeking 支付账户",
            //     "remark": "",
            //     "appID": "",
            //     "appSecret": "",
            //     "mchId": "",
            //     "certPath": "",
            //     "serialNo": "",
            //     "certKey": "",
            //     "tenPayV3Key": "",
            //     "tenpayNotify":"",
            //     "tenPayV3WxOpenNotify": "",

            // })
            // console.log(res.data)
            var res = await app.dbm.admin.org.GetOrgWxPaymentInfos({
                "shopInfoGuid": "6def565071a84fdface49f2975288baf",
            })
            console.log(res.data)  
        }


        /**
         * 终端\小程序\支付宝\抖音账户配置
         * 1、新增商家终端载体
         * 2、获取所有终端信息
         */
        async proClient(){ 

            // var res = await app.dbm.admin.org.AddWxClientInfo({
            //     "shopId": 3,
            //     "remark": "Seeking 点单小程序",
            //     "appID": "string",
            //     "appSecret": "string",
            //     "encodingAESKey": "string",
            // })
            // console.log(res.data)
            var res = await app.dbm.admin.org.SearchOrgWxClientInfos({
                
            })
            console.log(res.data)  

        }

         /**
         * 终端\小程序\支付宝\抖音账户 -- 支付账户 绑定
         * 1、绑定
         * 2、解绑
         */
        async proClientPaymentBind(){ 
            var res = await app.dbm.admin.org.BindShopToWxClient({
                "clientId": 6,
                "shopBanchId": 3,
                "paymentId": 8,
            })
            console.log(res.data)  
            var res = await app.dbm.admin.org.UnBindShopToWxClient({
                
            })
            console.log(res.data)  


        }

}

module.exports = new Utils()