# react-router-waiter
react-router v6 路由统一管理及路由拦截方案。
+ 相关博客地址：https://blog.csdn.net/u010059669/article/details/122359412
+ 版本要求：react-router > 6.0.0

## 1、安装
```js
npm i react-router-dom react-router-waiter -S
```

## 2、使用
```js
// 在项目入口文件index.js或入口组件App.js里引入
import RouterWaiter from 'react-router-waiter' // 引入插件
import routes from './router' // 引入你的路由配置
import onRouteBefore from './onRouteBefore' // 引入你定义的路由拦截函数

function App () {
  return (
    <RouterWaiter
      routes={routes}
      onRouteBefore={onRouteBefore}
    />
  )
}

export default App
```

## 3、配置路由
（示例：）
```js
const Index = () => import(/* webpackChunkName: "index" */ '@/views/index/index')
const Login = () => import(/* webpackChunkName: "login" */ '@/views/login/index')
const Page404 = () => import(/* webpackChunkName: "404" */ '@/views/test/page404')

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
  {
    path: '/login',
    component: Login, 
    meta: {
      title: '登录',
    },
  },
  {
    path: '*',
    component: Page404, 
    meta: {
      title: '404',
    },
  },
]

export default routes
```
+ 目前支持配置的字段有 redirect、component、meta，其他字段和react-router-dom的官方支持字段保持一致。（优先级：redirect > element > component。）

## 4、配置路由拦截函数
（示例：）
```js
/**
 * @description: 全局路由拦截
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
主组件 RouterWaiter 的配置 API：
+ `routers`，数组类型，路由配置数组
+ `onRouteBefore`，函数类型，路由拦截函数，可选
+ `basename`，字符串类型，项目部署在服务器子目录时的基础路径，默认取 process.env.PUBLIC_URL
+ `isHash`，布尔类型，是否使用 HashRouter，默认 false，即默认使用 BrowserRouter
+ `loading`，组件类型，懒加载路由切换时的 loading 效果组件，默认为一个空div标签
