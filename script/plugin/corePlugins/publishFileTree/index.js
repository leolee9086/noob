export class publishFileTree extends naive.plugin {
  constructor() {
    super({ name: "publishFileTree" });
  }
  pipe = [this.生成文档树];
  生成文档树(req, res, 渲染结果) {
    let 文档树 = 渲染结果.querySelector('#panelLeft [data-type="navigation"]');
    let 文档树容器 = 渲染结果.createElement("div");
    文档树容器.setAttribute("class", "fn__flex-1");
    文档树容器.setAttribute("data-type", "navigation");

    文档树.appendChild(文档树容器);
    let 笔记本列表 = window.siyuan.notebooks;
    笔记本列表.forEach((笔记本数据) => {
      if (笔记本数据) {
        文档树容器.innerHTML += this.生成笔记本条目(笔记本数据);
      }
    });
    return 渲染结果;
  }
  生成笔记本条目(笔记本数据) {
    return `
    <ul class="b3-list b3-list--background" data-url="${笔记本数据.id}" data-type="notebook" data-sort="12">

    <li class="b3-list-item b3-list-item--hide-action"  data-type="navigation-root" data-path="/">
    <span class="b3-list-item__toggle">
        <svg class="b3-list-item__arrow"><use xlink:href="#iconRight"></use></svg>
    </span>
    <span class="b3-list-item__icon b3-tooltips b3-tooltips__e" aria-label="修改图标">
        <svg class="custom-icon">
            <use xlink:href="#icon-1f4d4"></use>
        </svg>
    </span>
    <span class="b3-list-item__text">${笔记本数据.name}</span>
    </li>
    <ul class><ul>
</ul>
`;
  }
}
export const dependencies = ["publishContent"];
