/**
 * @Description: utils工具
 * @Author: Neo
 * @Date: 2022-03-11
 * @LastEditTime: 2022-03-11
 * @LastEditors: Neo
 */
// 获取数据类型
function getDataType (data: any): string {
  return (Object.prototype.toString.call(data).match(/\s(\w+)\]/) as string[])[1]
}

export default {
  getDataType,
}
