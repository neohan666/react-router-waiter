/*
 * @Description: 主组件
 * @Author: Neo
 * @Date: 2022-02-22
 * @LastEditTime: 2022-02-22
 * @LastEditors: Neo
 */
import { BrowserRouter, HashRouter } from 'react-router-dom'
import Wrap from './wrap'
import PropTypes from 'prop-types'
import Fn from './fn.js'

function RouterWaiter ({
  routes,
  onRouteBefore,
  basename,
  isHash,
  loading,
}) {
  basename = basename || process.env.PUBLIC_URL || ''
  const Router = isHash ? HashRouter : BrowserRouter

  const fn = new Fn({
    routes,
    onRouteBefore,
    loading,
  })
  const reactRoutes = fn.transformRoutes()

  return (
    <Router basename={basename}>
      <Wrap reactRoutes={reactRoutes} />
    </Router>
  )
}

const { string, func, bool, element, array } = PropTypes

RouterWaiter.propTypes = {
  routes: array,
  onRouteBefore: func,
  basename: string,
  isHash: bool,
  loading: element,
}

export default RouterWaiter
