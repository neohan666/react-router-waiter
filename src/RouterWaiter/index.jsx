/*
 * @Description: 主组件
 * @Author: Neo
 * @Date: 2022-02-22
 * @LastEditTime: 2022-03-02
 * @LastEditors: Neo
 */
import { useRoutes } from 'react-router-dom'
import Fn from './fn.js'

function RouterWaiter ({
  routes,
  onRouteBefore,
  loading,
}) {
  const fn = new Fn({
    routes,
    onRouteBefore,
    loading,
  })
  const reactRoutes = fn.transformRoutes()
  const elements = useRoutes(reactRoutes)

  return elements
}

export default RouterWaiter
