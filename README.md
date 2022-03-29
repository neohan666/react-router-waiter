# react-router-waiter
react-router v6 路由统一管理 及 路由拦截方案。

## 1、安装
```js
npm i react-router-waiter -S
```

## 2、使用
```js
// 在项目入口文件index.js或入口组件App.js里引入
import { HashRouter } from 'react-router-dom' // 引入官方路由组件
import RouterWaiter from 'react-router-waiter' // 引入该插件
import routes from './routes' // 引入你的路由配置
import onRouteBefore from './onRouteBefore' // 引入你定义的路由拦截函数

function App () {
  return (
    <HashRouter>
      <RouterWaiter routes={routes} onRouteBefore={onRouteBefore} />
    </HashRouter>
  )
}

export default App
```

## 3、配置路由列表
```js
const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    component: () => import(/* webpackChunkName: "index" */ '@/views/index/index'),
    meta: {
      title: '首页',
      needLogin: true,
    },
  },
]

export default routes
```
+ 通过`react-router`官方的`element`字段也能配置路由组件，但`element`配置的不支持路由拦截。
+ 嵌套路由的使用请看下面的`注意事项`。

## 4、配置路由拦截函数
```js
/**
 * @param {string} pathname 当前路由路径
 * @param {object} meta 当前路由自定义meta字段
 * @return {string} 需要跳转到其他页时，就返回一个该页的path路径，或返回resolve该路径的promise对象
 */
const onRouteBefore = ({ pathname, meta }) => {
  // 示例：动态修改页面title
  if (meta.title !== undefined) {
    document.title = meta.title
  }
  // 示例：判断未登录跳转登录页
  if (meta.needLogin) {
    if (!isLogin) {
      return '/login'
    }
  }
}

export default onRouteBefore
```

## 5、API
主组件 RouterWaiter 的配置属性 API：
+ `routes`，[Array] 路由配置列表（必填）
+ `onRouteBefore`，[Function] 路由拦截函数（可选）
+ `loading`，[Element] 懒加载路由切换时的 loading 效果组件（可选）

路由配置列表 routes 的配置项 API：
+ `redirect`，[String] 要重定向的路由路径
+ `component`，[Function] 懒加载方式引入的组件
+ `meta`，[Object] 自定义的数据

（优先级：redirect > component > element）

## 6、注意事项
+ react-router 的嵌套路由父级使用懒加载方式引用公共组件时存在一些问题，例如切换子路由时父级公共组件会重新渲染。建议改用官方element属性方式：
```js
import PageLayout from '@/components/PageLayout' // 静态引入，不要使用import函数

{
  path: '/',
  element: <PageLayout />, // 父级的公共组件使用element配置
  children: [
    ... // 子级可以继续使用component配置
  ]
},
```

## 7、TS类型
```js
import {
  RoutesType, // 路由配置数组类型
  RoutesItemType, // 路由配属数组项类型
  OnRouteBeforeType, // 路由拦截函数类型
  RouterWaiterPropsType, // RouterWaiter主组件props类型
} from 'react-router-waiter'
```

## 8、应用
[react-antd-mobx-admin](https://github.com/neohan666/react-antd-mobx-admin)：react后台管理系统 - 项目模板
