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
const month = date.getMonth() + 1
const d = date.getDate()
const t = date.getDate() + 1
const _y = date.getDate() - 1
var today = [year, month, d<10?"0"+d : d].join('-')
var tomorrow = [year, month, t<10?"0"+t : t].join('-')
var yesterday = [year, month, _y<10?"0"+_y : _y].join('-')
var firstMonthDay = [year, month,"01"].join('-')
var currentMonth = [year, month].join('-')
// console.log(today)


module.exports = {
  formatTime: formatTime,
  today:today,
  tomorrow:tomorrow,
  yesterday:yesterday,
  firstMonthDay:firstMonthDay,
  currentMonth:currentMonth
}
