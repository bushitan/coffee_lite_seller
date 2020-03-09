// components2/stats/stats.js
var app = getApp()
var map
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        addressList: {
            type: Array,
            value: [],
            observer: "getAddressList",
        }
    },
    options: {
        styleIsolation: 'apply-shared'
    },

    /**
     * 组件的初始数据
     */
    data: {

        longitude: 108.32754,
        latitude: 22.81521,
        mapMarkers: [],
        circles: [],
    },
    created() {
        map = wx.createMapContext("map", this)
    },
    /**
     * 组件的方法列表
     */
    methods: {
        toStatsEdt(){

            wx.navigateTo({
                url: '/pages2/stats_edt/stats_edt',
            })
        },
        getAddressList(_new, _old) {
            console.log(_new, _old)
            if (_new.length > 0) {
                var mapMarkers = []
                var circles = []
                for (var i = 0; i < _new.length; i++) {
                    var node = _new[i]
                    mapMarkers.push({
                        iconPath: "/images/icon/address.png",
                        id: 0,
                        longitude: node.longitude,
                        latitude: node.latitude,
                        width: 50,
                        height: 50,
                        callout: {
                            content: node.name,
                            color: "#ffffff",
                            // bgColor: "#efaf30",
                            bgColor: "#ef5830",
                            fontSize: "11",
                            borderRadius: "5",
                            padding: "10",
                            display: "ALWAYS",
                        },
                        label: {
                            content: "点击查看导航图",
                            color: "#ffffff",
                            fontSize: "9",
                            anchorX: 8,
                            anchorY: 0,
                            bgColor: "#efaf30",
                            padding: "5",
                            // textAlign:center,

                        }
                    })
                    circles.push({
                        longitude: node.longitude,
                        latitude: node.latitude,
                        color: "#efaf30",
                        fillColor: "#4770e266",
                        radius: parseInt(node.radius),
                    })
                }
                this.setData({
                    mapMarkers: mapMarkers,
                    circles: circles,

                    longitude: _new[0].longitude,
                    latitude: _new[0].latitude,
                })

                // map.includePoints({
                //     points: _new,
                //     padding: [60],
                //     success(res) { console.log(res) },
                //     fail(res) { console.log(res) },
                // })
            }
        },

    }
})
