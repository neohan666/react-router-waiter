# react-router-waiter
react-router v6 路由统一管理及路由拦截方案。

+ 版本要求：react-router-dom >= 6.2.0

## 1、安装
```js
npm i react-router-waiter -S
```

## 2、使用
```js
// 在项目入口文件index.js或入口组件App.js里引入
import { HashRouter } from 'react-router-dom' // 引入官方路由组件
import RouterWaiter from 'react-router-waiter' // 引入该插件
import routes from './router' // 引入你的路由配置
import onRouteBefore from './onRouteBefore' // 引入你定义的路由拦截函数

function App () {
  return (
    <HashRouter>
      <RouterWaiter
        routes={routes}
        onRouteBefore={onRouteBefore}
      />
    </HashRouter>
  )
}

export default App
```

## 3、配置路由
```js
const Index = () => import(/* webpackChunkName: "index" */ '@/views/index/index')

const routes = [
  {
    path: '/',
    redirect: '/index', // redirect，要重定向的路由路径
  },
  {
    path: '/index',
    component: Index, // component，懒加载方式引入的组件
    meta: { // meta，自定义的数据
      title: '首页',
      needLogin: true,
    },
  },
]

export default routes
```
+ 目前支持配置的字段有 redirect、component、meta，其他字段和react-router-dom的官方支持字段保持一致。（优先级：redirect > component > element。）
+ 嵌套路由的使用请看下面的注意事项。

## 4、配置路由拦截函数
```js
/**
 * @param {string} pathname 当前路由路径
 * @param {object} meta 当前路由自定义meta字段
 * @return {string} 需要跳转到其他页时，就返回一个该页的path路径，或返回resolve该路径的promise对象
 */
const onRouteBefore = ({ pathname, meta }) => {
  // 动态修改页面title
  if (meta.title !== undefined) {
    document.title = meta.title
  }
  // 判断未登录跳转登录页
  if (meta.needLogin) {
    if (!isLogin) {
      return '/login'
    }
  }
}

export default onRouteBefore
```
## 5、API
组件 RouterWaiter 的配置属性 API：
+ `routes`，数组类型，路由配置数组（必填）
+ `onRouteBefore`，函数类型，路由拦截函数（可选）
+ `loading`，组件类型，懒加载路由切换时的 loading 效果组件，默认为一个空div标签（可选）

## 6、注意事项
+ react-router 的嵌套路由父级不支持懒加载方式引用公共组件，需改用官方的element方式。
```js
import PageLayout from '@/components/PageLayout' // 静态引入，不要使用import函数

{
  path: '/',
  element: <PageLayout />, // 父级的公共组件需使用element配置
  children: [
    ... // 子级可以继续使用component懒加载方式
  ]
},
```
