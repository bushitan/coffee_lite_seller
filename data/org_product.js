
var inList = [
    { date: "2021-1-16 15:45:23", name: "OATLY", num: 30 },
    { date: "2021-1-16 15:41:12", name: "雪兰牛奶", num: 12 },
    { date: "2021-1-14 07:09:45", name: "洪都拉斯", num: 5 },
]



var checkList = [
    { date: "2021-1-16 15:45:23", name: "冰冰", num: 10 },
    { date: "2021-1-16 15:41:12", name: "小何", num: 5 },
    { date: "2021-1-14 07:09:45", name: "啊文", num: 12 },
]

var orgList = [
    {
        "category": {
            "cate_id": 31,
            "cate_name": "热咖啡"
        },
        "products": [
        {
            "id": 143,
            "name": "OATLY燕麦奶",
            "price": 25,
            "oldprice": 0,
            "cost": 0,
            "weight": 0,
            "stock": 9983,
            "tags": [
                "咖啡",
                "奶泡"
            ],
            "shortDescription": null,
            "fullDescription": null,
            "order_min_quantity": 1,
            "order_max_quantity": 10000,
            "published": true,
            "imgs": [
                {
                    "id": 165,
                    "picture_id": 193,
                    "position": 0,
                    "src": "",
                    "isNew": false,
                    "title": "",
                    "alt": ""
                }
            ],
            "attributes": [
                {
                    "productAttributeID": 124,
                    "productAttributeName": "温度",
                    "isRequired": false,
                    "displayOrder": 1,
                    "attributeValues": []
                }
            ]
        },
        {
            "id": 146,
            "name": "洪都拉斯咖啡豆",
            "price": 22,
            "oldprice": 0,
            "cost": 0,
            "weight": 0,
            "stock": 9997,
            "tags": [
                "咖啡",
                "美式"
            ],
            "shortDescription": null,
            "fullDescription": null,
            "order_min_quantity": 1,
            "order_max_quantity": 10000,
            "published": true,
            "imgs": [
                {
                    "id": 164,
                    "picture_id": 192,
                    "position": 0,
                    "src": "",
                    "isNew": false,
                    "title": "",
                    "alt": ""
                }
            ],
            "attributes": [],
            "num": 4
            },
        ]
    }
]

module.exports = {
    inList: inList,
    checkList:checkList,
    orgList: orgList
}