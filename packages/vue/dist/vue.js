var Vue = (function (exports) {
    'use strict';

    var mutableHanlders = {};

    var reactiveMap = new WeakMap();
    /**
     * 为复杂数据类型，创建响应性对象
     * @param {object} target 被代理对象
     * @returns
     */
    function reactive(target) {
        return createReactiveObject(target, mutableHanlders, reactiveMap);
    }
    /**
     * 创建响应性对象
     * @param {object} target
     * @param {ProxyHandler} baseHanlder
     * @param {WeakMap} reactiveMap
     */
    function createReactiveObject(target, baseHanlder, proxyMap) {
        // 获取缓存的Proxy  如果该实例已经被代理，则直接读取即可
        var existingProxy = proxyMap.get(target);
        if (existingProxy) {
            return existingProxy;
        }
        // 未被代理则生成 proxy 实例
        var proxy = new Proxy(target, baseHanlder);
        // 缓存代理对象
        proxyMap.set(target, proxy);
        return proxy;
    }

    exports.reactive = reactive;

    return exports;

})({});
//# sourceMappingURL=vue.js.map
