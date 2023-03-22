## 功能

思源笔记的一个代码片段包，包含一些常用的增强功能。

### 子服务管理

在渲染进程中拉起子程序,简单的程序监控和自动重启.

### 源代码转译

实现位于 https://github.com/leolee9086/noob-service-compiler , 包含一个本地的esm.sh部署和简单的typeScript||sass等代码的转译功能.

esm.sh的使用参考https://github.com/ije/esm.sh

### 思源笔记内容发布

实现位于https://github.com/leolee9086/noob-service-sypublisher

#### 支持反向链接、关系图等

支持反向链接和关系图的发布，详细内容参考noob-service-sypublisher的readme（应该还没有写）。

## 组成部分

### noob-core

可外置的思源代码模块，提供插件系统编译服务和服务系统支持，

https://github.com/leolee9086/noob-core

这个模块是noob所有功能的基础,安装和引入方式参考

https://github.com/leolee9086/noob-core


