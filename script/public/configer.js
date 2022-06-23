export  function 生成默认设置 (customoption, workspaceDir, userId,插件文件夹url) {
    let 思源伺服端口 = 6806;
    let 思源伺服地址 = "127.0.0.1";
    let option = {
      发布地址: 思源伺服地址,
      思源伺服地址: 思源伺服地址,
      思源伺服端口: 思源伺服端口,
      基础样式: `http://${customoption.发布地址 || 思源伺服地址}:${
        customoption.发布端口 || 思源伺服端口
      }/stage/build/export/base.css`,
      发布主题: `http://${customoption.发布地址 || 思源伺服地址}:${
        customoption.发布端口 || 思源伺服端口
      }/appearance/themes/${
        window.siyuan.config.appearance.themeDark
      }/theme.css`,
      发布脚本: `<script src="/plugins/naive.js"></script>`,
      高亮样式: `http://${customoption.发布地址 || 思源伺服地址}:${
        customoption.发布端口 || 思源伺服端口
      }/stage/protyle/js/highlight.js/styles/github.min.css`,
      空页面内容: `path:${workspaceDir}${插件文件夹url}/naive.html`,
      首页: {
        思源文档id: "20200812220555-lj3enxa",
      },
      有限分享: false,
      即时分享: true,
      使用图床资源: true,
      发布端口: 80,
      思源账号id: userId,
      发布图标: "",
      暴露api: false,
      暴露挂件: false,
      暴露附件: false,
      脚注内容: `path:${workspaceDir}${插件文件夹url}/footer.html`,
      单块分享: true,
      允许搜索: false,
      "publishSSLpfx":"",
      "publishSSLpassphrase":""
  
    };
    option.workspace = workspaceDir;
    for (let prop in option) {
      customoption[prop] !== ""
        ? (option[prop] = customoption[prop])
        : (option[prop] = option[prop]);
    }
    if (option.首页 && !option.首页.思源文档id) {
      option.首页.思源文档id = "20200812220555-lj3enxa";
    }
    option.workspace = workspaceDir;
    if(option.有限分享){
      option.允许搜索=false
    }
    return JSON.parse(JSON.stringify(option));
  }