

// import dbFather from '../db/db_6_seller.js'
var dbFather = require('db_7_shop.js')
class db extends dbFather {


    constructor() {
        super()

    }

}


module.exports = new db()