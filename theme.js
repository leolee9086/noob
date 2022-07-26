//这个文件只是用来加载各种功能
//theme.js中无法使用import,为了在浏览器运行也没有办法使用require,所以这里只能用其他方式来加载js
//import函数可以在module以外使用,因此可以用在此处用于加载各种脚本
//从siyuan对象获取工作空间路径
//使用立即执行函数避免污染全局对象
//async是为了能够在函数中使用await
  (
    async function () {
    const workspaceDir = window.siyuan.config.system.workspaceDir;
    const themeName = !window.siyuan.config.appearance.mode
      ? window.siyuan.config.appearance.themeLight
      : window.siyuan.config.appearance.themeDark;
    const cusoptionpath = `${workspaceDir}/data/widgets/naivePlugins/publish.json`;
    //中文版
    const 思源工作空间路径 = workspaceDir;
    const 主题根目录思源URL = `/appearance/themes/${themeName}/`
    //判定环境
    if (window.require) {
      const fs = require("fs");
      window.fs = fs;
    }
    const cusoption =await (await fetch(cusoptionpath)).json()
    const {生成默认设置} = await import(`${workspaceDir}/conf/appearance/themes/${themeName}/script/public/configer.js`);
    const {ifdefParser} = await import(`${主题根目录思源URL}/script/public/util/ifdef/index.js`)
    console.log(生成默认设置(cusoption))
    await import("./naive/config/script/naive.js").then((module) => {
      const naive = new module.default("naive", workspaceDir);
      window.naive = naive;
      initNaive(naive);
    });
    let options = {
      defs:{"BROWSER":false}, verbose:true, tripleSlash:true,fillWithBlanks:true, uncommentPrefixString:""
    }
    options.defs= {
      "BROWSER":window.require?false:true,
      "APP":window.require?true:false,
      "PUBLISH":!window.siyuan,
      "MOBILE":!window.siyuan.mobileEditor?false:true,
      "DEBUG":true
    }
    naive.parserOptions=options
    naive.ifdefParser=ifdefParser
    naive.scriptParser = new ifdefParser(options)


    if(window.require){
      //启动后台服务器
      naive.加载js({src: `${naive.根目录}/script/server/severIndex.js`, type: "module"})
    }
    function initNaive(naive) {
      //默认加载模块时会在控制台打印
      //加载到DOM中的js,放到这里是为了路径绑定简单
      naive.加载js = function (
        option = { src, type: "module", async: false, defer: false }
      ) {
        let { src, type, async, defer } = option;
        let script = document.createElement("script");
        if (type) script.setAttribute("type", type);
        if (async) script.setAttribute("async", true);
        if (defer) script.setAttribute("defer", true);
        script.setAttribute("src", src);
        document.head.appendChild(script);
        return script;
      };
      //加载到DOM中的css
      naive.加载css = function (src = "daylight", sort = 1) {
        let link = document.createElement("link");
        link.setAttribute("href", src);
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("class", "naiveStyle");
        link.setAttribute("sort", sort || 1);
        document.head.appendChild(link);
        return link;
      };
      //加载模块函数中如果第三个函数为真则相对主题文件夹加载
      //否则相对naive.js的位置加载
      //如果有第四个base参数则相对base加载
      //naive.加载模块("./script/main.js", "test",true);
      //加载界面脚本
      const cusoptionpath = `${naive.workspaceDir}/${naive.插件文件夹路径}/publish.json`;
      let cusoption = JSON.parse(fs.readFileSync(cusoptionpath, "utf-8"));
      let realoption = naive.生成默认设置(
        cusoption,
        naive.workspaceDir,
        "",
        naive.插件文件夹路径
      );
      naive.设置 = realoption;
      naive.加载js({ src: `${naive.根目录}/script/main.js`, type: "module" });
    }
  }());
