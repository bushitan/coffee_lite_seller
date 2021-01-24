var wx_shop_server = require("wxshop/server.js")
class db {

    constructor(){
        this.wxShopServer = new wx_shop_server()
    }

}

var DB = new db()

module.exports = DB