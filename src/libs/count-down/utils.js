import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import duration from 'dayjs/plugin/duration'

// 中文
dayjs.locale('zh')
// duration 插件
dayjs.extend(duration)

export default dayjs

// 设置语言环境为中文（简体）；
// 扩展 Day.js 以支持时间持续时长的处理（duration 插件）；
// 导出配置好的 Day.js 实例，以便其他文件可以直接使用。