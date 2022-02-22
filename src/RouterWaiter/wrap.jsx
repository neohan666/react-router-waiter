/*
 * @Description: useRoutes容器组件
 * @Author: Neo
 * @Date: 2022-02-22
 * @LastEditTime: 2022-02-22
 * @LastEditors: Neo
 */
import { useRoutes } from 'react-router-dom'

function Wrap ({ reactRoutes }) {
  const elements = useRoutes(reactRoutes)

  return elements
}

export default Wrap
