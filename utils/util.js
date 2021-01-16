const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


var date = new Date()
const year = date.getFullYear()
var  month = date.getMonth() + 1
month = month < 10 ? "0" + month : month
const d = date.getDate()
const t = date.getDate() + 1
const _y = date.getDate() - 1
var today = [year, month, d<10?"0"+d : d].join('-')
var tomorrow = [year, month, t<10?"0"+t : t].join('-')
var yesterday = [year, month, _y<10?"0"+_y : _y].join('-')
var firstMonthDay = [year, month,"01"].join('-')
var currentMonth = [year, month].join('-')
// console.log(today)

// var getCurrentFirstMonthDay = date => {

// 获取本月开始时间
var getMonthFirstTime = date => {
    var _d = new Date(date)
    var _y = _d.getFullYear()
    var _m = _d.getMonth() + 1
    return [_y, _m, 1].join('-') + " " + ["00", "00", "00"].join(':')
}

// 获取本月结束时间
var getMonthLastTime = date => {
    var _d = new Date(date)
    var _y = _d.getFullYear()
    var _m = _d.getMonth() + 1
    var _last_d = new Date(_y, _m, 0).getDate()
    return [_y, _m, _last_d].join('-') + " " + ["23","59","59"].join(':')
}

var getDayFirstTime = date => {
    var _d = new Date(date)
    var _y = _d.getFullYear()
    var _m = _d.getMonth() + 1
    var _dd = _d.getDate()
    return [_y, _m, _dd].join('-') + " " + ["00", "00", "00"].join(':')
}
var getDayLastTime = date => {
    var _d = new Date(date)
    var _y = _d.getFullYear()
    var _m = _d.getMonth() + 1
    var _dd = _d.getDate()
    return [_y, _m, _dd].join('-') + " " + ["23", "59", "59"].join(':')
}

// 获取两个时间差
var getDateRange = (date1, date2) => {
    var timestamp1 = new Date(date1).getTime()
    var timestamp2 = new Date(date2).getTime()
    return parseInt((timestamp2 - timestamp1) / (1000 * 60 * 60 * 24))
}

module.exports = {
    formatTime: formatTime,
    today:today,
    tomorrow:tomorrow,
    yesterday:yesterday,
    firstMonthDay:firstMonthDay,
    currentMonth:currentMonth,

    getMonthFirstTime: getMonthFirstTime,
    getMonthLastTime: getMonthLastTime,

    getDayFirstTime: getDayFirstTime,
    getDayLastTime: getDayLastTime,

    getDateRange: getDateRange,
}
