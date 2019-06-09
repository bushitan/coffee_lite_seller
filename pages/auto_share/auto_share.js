// pages/exchange/exchange.js
var GP
var API = require('../../api/api.js')
var DB = require('../../api/db.js')
var db = new DB()
const BASE64 = require('../../utils/base64.js')

var STORE_MODE_NORMAL = 1 //普通
var STORE_MODE_SHARE = 2 //分享
var VALID_RANGE = 60000  //二维码存活时间，30秒
var interval
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isLoading: true,
        // 二维码信息
        qrBase64:"",
        qrContent:"",

        // 分享券
        detailList:[], 
        pageNum:0,
        range:5,
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log("onUnload")
        clearInterval(interval)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this

        GP.onInit()
    },

    // 初始化
    onInit() {
        GP.getLog("share")
        GP.updateQR()
        var i = 0
        interval = setInterval(function () {
            GP.getLog("share") // 10秒刷新一次数据

            i++
            if (i % 6 == 0)  // 60秒刷新一次二维码，
                GP.updateQR()
        }, 10000) 

        // GP.createQR()
    },

    // 更新菊花码二维码
    updateQR(){
        db.storeAutoShareQR().then(res=>{
            GP.setData({
                qrContent: API.URL_WXA_CODE_UNLIMIT + res.qr
            })
        })
    },


    // 创建二维码
    createQR(){

        var userInfo = wx.getStorageSync(API.USER_INFO)
        var sellerUUID = wx.getStorageSync(API.UUID)
        var storeUUID = userInfo.store_uuid

        var obj = { 
            "mode": "auto_share", 
            "store_uuid": storeUUID, 
            "seller_uuid": sellerUUID, 
            "dead_time": new Date().getTime() + VALID_RANGE
        }

        console.log(JSON.stringify(obj))
        console.log(BASE64.encode(JSON.stringify(obj)))

        GP.setData({
            qrBase64: BASE64.encode(JSON.stringify(obj))
        })
    },

    getLog(model) {
        db.storeDataSeller({
            model: model,
            page_num: GP.data.pageNum,
            range: GP.data.range,
        }).then(dataList => {
            GP.setData({
                isLoading: false,
                detailList: dataList,
            })
        })
    },




})


var a = "FFD8FFE000104A46494600010100000100010000FFDB00430001010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101FFDB00430101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101FFC000110801AE01AE03012200021101031101FFC4001F0000010501010101010100000000000000000102030405060708090A0BFFC400B5100002010303020403050504040000017D01020300041105122131410613516107227114328191A1082342B1C11552D1F02433627282090A161718191A25262728292A3435363738393A434445464748494A535455565758595A636465666768696A737475767778797A838485868788898A92939495969798999AA2A3A4A5A6A7A8A9AAB2B3B4B5B6B7B8B9BAC2C3C4C5C6C7C8C9CAD2D3D4D5D6D7D8D9DAE1E2E3E4E5E6E7E8E9EAF1F2F3F4F5F6F7F8F9FAFFC4001F0100030101010101010101010000000000000102030405060708090A0BFFC400B51100020102040403040705040400010277000102031104052131061241510761711322328108144291A1B1C109233352F0156272D10A162434E125F11718191A262728292A35363738393A434445464748494A535455565758595A636465666768696A737475767778797A82838485868788898A92939495969798999AA2A3A4A5A6A7A8A9AAB2B3B4B5B6B7B8B9BAC2C3C4C5C6C7C8C9CAD2D3D4D5D6D7D8D9DAE2E3E4E5E6E7E8E9EAF2F3F4F5F6F7F8F9FAFFDA000C03010002110311003F00FEFE28A28A0028A28A0028A28A0028A28A0028A28A0028A28A0028A28A0028A28A0028A28A0028A2824004920003249E0003A927B01400515E71E15F8C5F093C75E23F10783FC15F147E1E78BFC5BE1394C1E28F0C7863C69E1CD7BC41E1D99766E8B5BD1F4BD4AEB50D2DD0BA2BADEDBC251CF96F87CAD7A3D00145145001451450014514500145145001451450014515E6F6DF18FE11DE78F6EBE15DA7C51F87775F136CAD96F2F3E1DDBF8D3C39378E2D6D5C3B2DC5C78563D49B5C862288CFBE4B150231E61C210C403D228A28A0028A28A0028A28A0028A28A0028A28A0028A28A0028A28A0028A28A0028A28A0028A28A0028A28A0028A28A0028A28A0028A28A0028A28A0028A28A0028A28A0028A28A0028A28A002BE27FF0082934FF13AD7FE09F9FB685D7C18BCBBD3FE28DAFECCDF196EBC157BA7B4B1EA56DAC5B78175A9D25D3258592487545B78E73A64CAEA21BFFB3CACC1118D7DB154753D36C35AD3751D1F54B586FB4CD5AC6EF4DD46CAE1164B7BCB0BEB792D6F2D678D815921B8B796486546055D1D94820D007F87B7FC13B7F6BDF881FB15FEDB5FB3FF00ED2FE10F146ADA45E7837E28786AE7C6B2C5732CA3C49E03D5F57B7D3BE20685ACC6FE6FF6959EB9E18BDD5ADAE12657984B2A5CDBC90DE4505C47FEE0FA4EA963AE695A66B5A5DC4777A66B1A7D96A9A75D42E92457363A85B477769711491B3C6F1CD6F347223A3B232B065665209FF0E4FF0082897ECE57FF00B24FEDCDFB557ECEB7BA7CDA6C1F0B7E3778F741D0209A130893C212EB975A9F832F2046BBBE636B7DE15BFD1EEED99AF6E9CC33279B334C24C7FAD2FF00C103FF0069E87F6B2FF824DFEC79F1127D4E4D57C4BE15F86F6BF073C713CEF3C974BE2DF8432BF81EECDDCB73777D3CF717BA6E95A56ACD712DCB3DC2EA293B456C64FB34201FB0D45145001457F9D9FF00C1DAFF00F0535FDB57E0EFEDB5F0F3F658F81FF187E2DFC01F857E11F837E10F88D753FC39F12EB1E069BE2578BBC55AD6B931D72E35ED0AE2C753D4F4BF0CC5A3DAE8B67602EC585B6AF6BAA4D2C32DCF94D07F40DFF06BD7FC1427E2DFEDF5FF0004F3D4A7F8FF00E36B8F887F19BE00FC54D63E167887C67ABDE1BCF1578A3C2F75A4E95E29F056B7E2A97ECF0ACDAA0B3D5750F0F8BE324D71A941E1D4BDBD73792CD24A01FD23514514005145140051451401F137FC1483F6986FD8EBF610FDAB3F695B6BC86C759F84FF00057C6BAFF85269C46E87C6F3E972E93E088845286599A5F15EA3A3A088C736E04E609803137F8DAFEC89F107E3D78CFF006FFF00D9DFE20F83BC5FE25D4FF682F1AFED3DF0D356D3BC58750BA935FD63C71E26F88FA44B35D5EDD472A4D70BA95F5E4A2FEDC308A7B59A6B611F94C23AFF0042EFF83C9FF69E9BE14FFC13AFE1CFECF5A3EA71DAEB5FB4EFC68D2ED75AB25780DCDD7C3FF85769FF00098EB00C46F22B95B77F1649E08479D6CAEEDF2A61964B59A4B6693F92CFF83593F66187F68EFF0082BCFC18D6F55B56B9F0D7ECE7E1CF177ED01AB8D96D242752F0BDA5BE81E0E8A74B89A3253FE130F13E8D760C30DDC80D97FA98D0BDD5B807FAE2422511442728D308D04C63044665DA3CC3186F98217C950DC85C679A928A2800A28A2800A28A2800A28A2800A28A2800A28A2800A28A2800A28A2800A28A2800A28A2800A28A2800A28A2800A28A2800A28A2800A28A2800A28A2800A28A2800A28A2800A2BF99AFF839DFFE0A8BFB4E7FC133BF658F82FA87ECAB73A7F853E20FC73F89FACF83AF7E276A7A1693E241E0CD07C39E19935ABAB6D1B4AD6A2BCD34F8875CB9B8B51697F7FA75EDB595969FA86D81AE6781E2F89FFE0D8FFF0082F77C72FDBD3C79E3EFD8DFF6D4F15E9FE35F8D3A5785EE3E217C1CF8950E85A3F87350F187867426B6B7F17F84BC4965A058D86977BAF68D1DDDB6BBA6EAF15A5A4D7BA52EA505E24F71669713007F67B45145007F97A7FC1E43FB2F3FC26FF828D780BF688D32CFCAF0FF00ED43F06F47BBBF9E2B49E384F8EFE14C9178335C49AE9A216D3DD4FE1A7F06DC944B87B848D80960822FB3BCFF00ABBFF064C7ED3D36B9F097F6BCFD90756BA577F00F8BFC2BF1D3C1B03BDC3CA34AF1D58B7843C5F046AD09B68ADAD356F0C7876E9516E91E4B8D66E644B43FE913B7D97FF078E7ECC10FC59FF826EF82FF00681D33475BBF147ECC3F19B41D46EF5286DCC97769F0FBE2742DE0DF1242F322EE8EC4F893FE109BC9CC92792AF6A9FBA695D1E3FE40BFE0D7BFDA7E1FD9AFFE0AF7F01ACB58D61749F097C7FD33C55FB3FF00885A7B836F653DEF8D74F5BEF04C7719648DDE4F1E687E1BB4B612BAAACD7819449288E2700FF5E0A28A2803FCE7FF00E0F62FD9AFC5F61F1FBF651FDAC34FD1358BCF02F89BE146AFF057C45AFC7B6E347D17C55E10F14EABE2BD0B4D9D22B71269F3EB1A478B753B8867BBB8786FDB4D962B658A4B4984BF707FC1927E0AF8ABA2FECD9FB6678CB5CD2BFB3FE10F8CBE2E7C3DB5F02DE5D585C5BDDEB7E2FF000E7853568FC697765792C2B15EE8F67A76A9E14B3568259162D445EA101B757F6ADE33F02F82BE23F87AFBC25F10BC21E18F1CF85754411EA5E1…8A6936937ECE953BC951A2A4D4136DB9D49CE72FF0042FC37F0DF24F0D723FECBCAEF8AC6E25C2B66F9BD682862732C4C14941B8294D61F0B414E70C2612139C68C65394E7571156BD7AA514515F447E86145145001451450014514500145145001451450014514500145145001556FAC6CB53B2BCD3752B4B6BFD3B50B5B8B1BFB1BD822B9B3BDB2BB89EDEEAD2EEDA65786E2DAE60924867825478A589DE3915958836A8A00F80BE067FC12C3FE09DBFB34FC58D5BE39FC0AFD8FFE087C36F8AFABDD5C5E378CFC3FE0FB45D4B48B8BBC1BA7F0AC776D7565E0F170DB9A55F0BDAE90ADE64A8008DD90FDFB45140051451401F87FFF0005D1FF00823B5A7FC160FF0067AF87FF000F345F89F65F087E29FC1EF1B5F78D3E1FF8B359D12EB5FF000DDEC7AD68CFA36BFE1AF1159585DDA6A10596A491E9D7706A7646EA7B1BAD3907D86E63B8936784FF00C1073FE0817E1AFF008243D8FC47F891F10FE20F87BE347ED29F14B4EB2F0D5DF8C3C3BA16A1A3F873C07E04B59E2D42E3C21E171ABDD4D7F7F26B5ABC16BA8EBBADCF67A5CB75F60D3EC62B45B7B5325C7F46D45001451450035DD11773B2A2E546E760AB9660AA324819662154752C4019240A757F9E7FFC1E3DF14FF6EBF077ED1FFB3B681E08F13FC60F06FECA775F0A21D4F43B9F86DAD78B745F0B6B7F1822F15EB4BE201E2DBBF0DCB676B2789F4BD2A2F0DB787ACF539A5961D3E69AF34BFDE4D7C21FE953FE0DBDF17FED69E38FF8251FC10D7BF6C3B9F1B6A3E3E975EF1DDB782B5AF8952EAF378FF5BF84D6BAF491782B51F12CBAF20D62662A351B5D16EB51925B9BCF0E5B691721DADE4B76600FDDCA28A2803E38FDB53F6FDFD92FFE09EBF0DB4FF8ABFB5B7C5DD1FE15F85B5CD525D0FC331DCD96ADADF883C59ADC36C6F26D2BC33E1CD06C751D6356BAB7B51F68BB782D7ECB650159AF6E6DE26573D27EC89FB68FECCBFB777C2683E377ECABF15743F8B3F0EE4D56E740BCD57498751D3EFB44F1059416B7577A0F88343D6ACF4ED6744D5EDED6F6CEE5ECB51B18247B6BA82E22F32195243F833FF072FF00FC11ABF68DFF0082A9FC3CFD9EFC51FB2EEB9E17B8F88DF00350F1E457BF0EBC6BE2597C33A4F8BBC3FE3883C3D24B77A0EA735BDCE916BE26D2EF3C3B026CD51B4F82FF004EBB9233A82CB6B6D049EB7FF06E07FC125BE39FFC129BF663F8B5E1BFDA37C49E1BBDF8A9F1C7E23E95E34D43C1FE0BD7AEBC43E19F0468FE1FF0F47A269764FA9BDAD958DF788F50966BEB8D5EE74D826B44B68B4CB68AFAE8C2FE5807F45D45145001457C71FB6A7EDFBFB25FFC13D7E1B69FF157F6B6F8BBA3FC2BF0B6B9AA4BA1F8663B9B2D5B5BF1078B35B86D8DE4DA57867C39A0D8EA3AC6AD756F6A3ED176F05AFD96CA02B35EDCDBC4CAE7A4FD913F6D1FD997F6EEF84D07C6EFD957E2AE87F167E1DC9AADCE8179AAE930EA3A7DF689E20B282D6EAEF41F10687AD59E9DACE89ABDBDADED9DCBD96A363048F6D7505C45E6432A48403EA3A28A2803CDA0F83DF086C3C7777F15ADBE17FC3AB3F897776A2D6FBE2343E0CF0DDBF8DAE2CE3571E4DD78B134E4D6E485637752B2DF95F2CEC6F90003D241040208208C8239041E841EE0D7F17BFF000790FC44FDB4FC0DF00BF661B6F807AD7C4EF0BFC00D77C55E3D83E3AEB9F0BB51F126972CFE2182C7C3C7C05A378E6FBC34D04F6DE15B9B693C47716315FDC8D2EFF598123B841736F62B37BCFF00C1A21E3FFDB2FC7BFB097C5AB8FDA7B56F891E23F879A57C60B5B0FD9EBC45F156FBC41A8F88AEFC387C2F652F8BAC342BEF1299752BDF04E9FAC1B03A3DC25CCBA7C7A95D6B76B63C4338400FEB268A28A00FE3CBFE0B33FF0006B243FF00050DFDAA2F7F6AFF00D9B3E35781FE04F8AFE23C5A42FC6CF0A78CBC2DAE6ABA1F887C4360A9A7CFF10B41BCD06ECC96BADDFE8D15945AC68D369F0DA6A77FA79D4CEA515E6A378C7FA24FF826C7EC3BE15FF8272FEC63F063F644F09F89AEBC6B6DF0C349D50EB5E34BCB05D2A7F15F8ABC49ADEA1E24F126B8BA52DD5F0D32D6E755D4E78EC2C0DEDDB59E9F0DAC0F7333C6CE7EE9A2800A28A2800A28A28033B56D1F48D7F4FB8D275DD2F4ED6B4ABBF2BED5A66AD636DA8E9F73E44F1DCC1F68B2BC8A6B69BC9B9861B88BCC8DBCB9E28E54C491AB0ADA1786FC3BE17B4934FF000CE83A2F876C26B97BC9ACB42D2EC748B496EE48A1824BA92DB4F82DE17B9786DEDE179D90CAD1410C6CC52240BB5454F241C94DC63CE972A9F2AE651DF954AD74AFADAF63374693AAABBA54DD650F66AB3845D550BB7C8AA5B9D42EDBE54ED76DDB5614514551A051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514019BAAE8DA3EB96C2CB5BD2B4DD62CD6686E16D355B1B5D42D85C5BC8B2DBCE20BB8A6884D04AAB2C3284DF148AAE8CAC011A08891A2C71AAA222AA22228544450155555400AAA000AA00000000C0A751400514514005145140051451401FE78BFF07C15978D53E28FEC0DA8CFA8337C3A9FC03F19ECB4CD2FED68523F1ADA7887C1B3EB9A81B10A1D1A6D0AF7C3D6E2ED9CA482030A2A989CB771FF00063EFC4A3F68FDBEFE0F5C6BF74D983E0A7C49D23C2EC9335946164F1BF863C43AF452084DBC5732993C33A7CF1B4E269A28A078E16482575EBBFE0F85F086B33F82FF00E09F9E3E8D2DFF00E11ED33C51F1DBC2175219D45D8D675CD27E1E6B560896B8DCF6ED63E1ED49A59C3058E458632099411F1C7FC1927E28D134FF00DB2BF6C3F095DDE795AFF89BF670F0D6A9A2D8F933BFDAEC7C33F11F4F4D6A6F3D236B787EC6DAF694364F2C724DF69CC0B208A5D801FE937451450053D434ED3F57B2B8D3755B0B2D4F4EBC89A1BBB0D42D60BDB2BA85C61E2B8B5B98E582789870D1CB1B2B0E08352DADADAD8DBC367656D6F67696F1AC56F6B6B0C76F6F044BC2C70C112A45146A385445551D854F45001451450014514500145145001451450014514500145145001451450014514500145145001451450014514500145145001451450014514500145145001451450014514500145145001451450014514500145145001451450014514500145145007E08FF00C1C2FF00F04A1F1F7FC157FF0063BF0B7C3DF82FABF85F48F8E7F077E2443F11FE1DAF8CF53BDD1FC39AFDADE68BA8681E2AF0ADDEA76B6D7D169D75AB595CD95D6997F79632DB437DA5C304F71656B7573703F3C3FE0DA4FF00820DFED17FF04CAF881F1AFF00692FDAEA4F03E99F137C7FE03D3FE177C3FF00047833C50FE2B9BC3BE199F5DB5F1178AF55F11EA96305BE866F356BCD17C396DA75959CDAA3DBC169792CD3DABCAB1C9FD7ED1400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451401FFD9"