


var APP_ID = "wxeb9623bdc85a64f4"
// var host_url = 'https://xcx.308308.com/huaxun_2/api/';
// var API_308_URL = 'https://api.308308.com/';
// var XCX_308_URL = 'http://127.0.0.1:8000/live/';
// var XCX_308_URL = 'http://192.168.199.203:8000/live/';
// var XCX_308_URL = 'https://www.12xiong.top/live/';
// request.init(XCX_308_URL + 'lite/login/', APP_ID)

// var HOST = "https://www.51zfgx.com/"
var HOST = "https://www.51zfgx.com/dev/"
var URL = HOST + "lite/"

module.exports = {
    URL_WXA_CODE_UNLIMIT: "https://www.51zfgx.com/wxacodeunlimit/",
    UUID: "uuid",
    USER_ID: "user_id",
    USER_INFO: "user_info",
    OPEN_ID: "open_id",
    APP_ID: "app_id",
    UNION_ID: "union_id",
    ROUTE_USER_LOGIN: `${URL}route/user/login/`,
    ROUTE_USER_UPDATE: `${URL}route/user/update/`,

    STORE_INFO: `${URL}store/info/`,

    STORE_LIST_CUSTOMER: `${URL}store/list/customer/`,
    STORE_DATA_CUSTOMER: `${URL}store/data/customer/`,
    STORE_DETAIL_CUSTOMER: `${URL}store/detail/customer/`,
    REFRESH_CUSTOMER: `${URL}refresh/customer/`,

    STORE_UPDATE_SELLER: `${URL}store/update/seller/`,
    STORE_DATA_SELLER: `${URL}store/data/seller/`,
    STORE_HOST_DATA_SELLER: `${URL}store/host/data/seller/`,
    STORE_AUTO_SHARE_QR_SELLER: `${URL}store/auto_share/qr/seller/`,

    SCAN_SCORE_SELLER: `${URL}scan/score/seller/`,
    SCAN_SHARE_SELLER: `${URL}scan/share/seller/`,
    SCAN_PRIZE_SELLER: `${URL}scan/prize/seller/`,
    
}

