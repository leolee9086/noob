const domTemplate = {
    顶栏按钮:(提示, 图标)=>{
        return `
        <div class="toolbar__item toolbar__item--action b3-tooltips b3-tooltips__sw" aria-label="${提示}" id="minWindow">
        <svg>
            <use xlink:href="#${图标}"></use>
        </svg>
        </div>
        ` 
    }
}
export class template extends naive.plugin {
    constructor() {
      super({ name: "" });
      this.setPluginsProp('dom模板',domTemplate)
    }
  }
  