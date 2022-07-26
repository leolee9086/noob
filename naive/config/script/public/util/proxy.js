Proxy = new Proxy(Proxy, {
    //拦截 new 操作符，生成 Proxy 实例的时候来拦截
    construct: function (target, argumentsList) {
      //result是new Proxy()生成的原本的实例
      const result = new target(...argumentsList);
      //获取原本实例reslut的类型
      const originToStringTag = Object.prototype.toString.call(result).slice(1,-1).split(' ')[1]
      //改写result的[Symbol.toStringTag]属性，加上被代理的标志
      result[Symbol.toStringTag] = 'Proxy-' + originToStringTag;
      return result;
    },
  });
  
  let proxydefine = {
    get(target, property) {
  
      return target[property];
    },
    set(target, property,value) {
      if(typeof value =='object')
      { target[property]=new Proxy(value,proxydefine)}
       return true
    },
  }
  let syproxy = new Proxy(window.siyuan, proxydefine);
  let proxystack=new WeakMap()
  function 深度代理(object){
  
    for(属性名 in object){
      if(typeof object[属性名] =='object'&&!proxystack.get([object[属性名]])){
        object[属性名]=new Proxy( object[属性名],proxydefine)
        proxystack.set([object[属性名]],true)
        深度代理(object[属性名])
      }
    }
    return object
  }
  let obj = {a:{}}
  obj.a=obj
  window.obj =深度代理(obj)