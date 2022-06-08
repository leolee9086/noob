export default function () {
  return {
    打开urlid: function () {
      let url参数 = 解析url参数(window.location.href);
      if (url参数) {
        let id = url参数.id;
        if (id) {
          窗口内打开思源块(id);
        }
      }
    },
  };
}
