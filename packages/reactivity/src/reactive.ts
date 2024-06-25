import { mutableHanlders } from "./baseHanlders";

export const reactiveMap = new WeakMap();

/**
 * 为复杂数据类型，创建响应性对象
 * @param {object} target 被代理对象
 * @returns
 */
export function reactive(target: object) {
  return createReactiveObject(target, mutableHanlders, reactiveMap);
}

/**
 * 创建响应性对象
 * @param {object} target
 * @param {ProxyHandler} baseHanlder
 * @param {WeakMap} reactiveMap
 */
function createReactiveObject(
  target: object,
  baseHanlder: ProxyHandler<any>,
  proxyMap: WeakMap<object, any>
) {
  // 获取缓存的Proxy  如果该实例已经被代理，则直接读取即可
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  // 未被代理则生成 proxy 实例
  const proxy = new Proxy(target, baseHanlder);

  // 缓存代理对象
  proxyMap.set(target, proxy);

  return proxy;
}
