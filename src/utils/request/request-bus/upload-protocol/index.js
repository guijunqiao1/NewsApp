/**
 * 大文件上传协议业务层预留位置。
 *
 * 该层用于接入公司内部上传协议，负责把接口文档中的上传业务语义
 * 转换为上传 SDK 或 request-core 能够执行的请求。
 *
 * 建议后续在本目录继续按业务拆分：
 * - api.js：上传协议接口样板代码
 * - patch.js：针对样板代码的业务补丁
 * - adapters.js：upload-sdk 与 request-core 的适配
 */
export function createUploadProtocolBusiness() {
  throw new Error('upload protocol business is not implemented')
}
