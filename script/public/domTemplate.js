const dom模板 ={
    顶栏按钮(提示,图标){
        return `
        <div class="toolbar__item toolbar__item--action b3-tooltips b3-tooltips__sw" aria-label="${提示}" id="minWindow">
        <svg>
            <use xlink:href="#${图标}"></use>
        </svg>
        </div>
        `
    }


}
export {dom模板 as dom模板}
