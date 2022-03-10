/**
 * @Description: 类型定义
 * @Author: Neo
 * @Date: 2022-03-08
 * @LastEditTime: 2022-03-08
 * @LastEditors: Neo
 */
import { RouteObject } from 'react-router-dom'

interface MetaType {
  [propName: string]: any;
}

interface ImportFn {
  (): any;
}

interface RoutesTypeItem extends RouteObject {
  redirect?: string;
  component?: ImportFn;
  meta?: MetaType;
}
type RoutesType = RoutesTypeItem[]

interface OnRouteBeforeParamsType {
  pathname?: string;
  meta?: MetaType;
}
interface OnRouteBeforeType {
  (payload?: OnRouteBeforeParamsType): void & (string | Promise<string|undefined>);
}

type ComponentType = any

interface FnOptionsType {
  routes: RoutesType;
  onRouteBefore?: OnRouteBeforeType;
  loading?: ComponentType;
}

type RouterWaiterPropsType = FnOptionsType

export type {
  MetaType,
  ImportFn,
  RoutesType,
  OnRouteBeforeParamsType,
  OnRouteBeforeType,
  ComponentType,
  FnOptionsType,
  RouterWaiterPropsType,
}

declare const RouterWaiter: RouterWaiterPropsType

export default RouterWaiter
