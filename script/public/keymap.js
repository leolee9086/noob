export class 快捷键监听器 {
  constructor(目标元素) {
    this.快捷键字典 = {};
    this.挂载监听器(目标元素);
    this.目标元素 = 目标元素;
    let that = this;

    this.快捷键字符串判定器 = this.快捷键字符串判定器.bind(this);
  }
  on(快捷键字符串, 回调函数) {
    if (!this.快捷键字典[快捷键字符串]) {
      this.快捷键字典[快捷键字符串] = [];
    }
    let 回调函数序列 = this.快捷键字典[快捷键字符串];
    回调函数序列.push(回调函数);
  }
  off(快捷键字符串, 函数) {
    let 回调函数序列 = this.快捷键字典[快捷键字符串];
    if (回调函数序列) {
      回调函数序列.forEach((回调函数) => {
        if (回调函数 == 函数) {
          回调函数序列 = 回调函数序列.splice(回调函数序列.indexOf(函数));
        }
      });
    }
  }
  挂载监听器(目标元素) {
    if (目标元素.addEventListener) {
        this.真实快捷键字符串判定器 = this.快捷键字符串判定器.bind(this);

      目标元素.addEventListener("keydown", this.真实快捷键字符串判定器);
    }
  }
  结束监听() {
    this.目标元素.removeEventListener("keydown", this.真实快捷键字符串判定器);
  }
  快捷键字符串判定器(event) {
    let 快捷键字符串 = event.key.toLowerCase();
  
    if (event.altKey) {
      快捷键字符串 = "alt+" + 快捷键字符串;
    }
    if (event.shiftKey) {
      快捷键字符串 = "shift+" + 快捷键字符串;
    }
    if (event.ctrlKey) {
      快捷键字符串 = "ctrl+" + 快捷键字符串;
    }
    let 回调函数序列 = this["快捷键字典"][快捷键字符串];
    if (回调函数序列 && 回调函数序列[0]) {
      回调函数序列.slice().map((回调函数) => 回调函数(event));
    }
  }
}
