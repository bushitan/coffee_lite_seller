/**
 * 获取查询列表具体的数据
 */


class Utils {
    constructor(){}

    // 菜单矩阵
    matrix = [
            {
                name: "盘点",
                select: "/images/icon/score.png",
                unSelect: "/images/icon/score_un.png",
                list: [
                    { name: "记录", id: 11 }, 
                ]
            },
          
        ]

    // 查询列表的哈希索引
    mapQueryList = {

        /****外卖*****/
        // 待处理
        11 : (page,range,startTime,endTime) =>{
            return new Promise((resolve, reject) => {
                var res = { 
                    data:  {
                        data: [
                            {
                                name: "订单1",
                                summary: "描述1",
                            },
                            {
                                name: "订单2",
                                summary: "描述2",
                            },
                        ],
                        page :page + 1,
                        range : 10,
                        count : 10
                    }
                }
                resolve(res)
            })
        },
       
    }
    
    // // 订单搜索的哈希索引
    // mapSearchNode = {
    //     // 外卖
    //     0:()=>{
    //         return new Promise((resolve, reject) => {
    //             var res = {
    //                 data: {
    //                    name:"订单",
    //                    summary:"描述",
    //                 }
    //             }
    //             resolve(res)
    //         })
    //     },

    //     // 小商店
    //     1: () => {

    //     }
    // }

}

module.exports = new Utils()