export class 主题插件 {
  constructor(option) {
    this.name = option.name;
    this.setPluginsProp('naive',naive)
    this.setPluginsProp('app',naive)
    this.setPluginsProp('核心api',naive.kernelApi)
    this.setPluginsProp('kernelApi',naive.kernelApi)

  }
  setPluginsProp(name,value){
    naive.plugin.prototype[name]= value
  }
}
export { 主题插件 as plugin };
