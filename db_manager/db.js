/**
 * Manage体系下，与后端API的util工厂接口。作为API的统一出口
 */


// var Shop = require("shop.js")
var Org = require("admin/org.js")
var wx_shop = require("wx_open/shop.js")
var wx_lite = require("wx_open/lite.js")

class db {

    constructor(){
        this.onInit()
    }

    async onInit(){
        this.wxShop = new wx_shop()
        this.shop = new wx_shop()

        this.admin = { }
        this.admin.org = new Org()
    }
}

var DB = new db()

module.exports = DB