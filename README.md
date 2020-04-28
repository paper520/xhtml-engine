# xhtml-engine
🌊 基于node.js开发的xhtml字符串解析引擎。

[![downloads](https://img.shields.io/npm/dm/xhtml-engine.svg)](https://yelloxing.github.io/npm-downloads?interval=7&packages=xhtml-engine)
[![install size](https://packagephobia.now.sh/badge?p=xhtml-engine)](https://packagephobia.now.sh/result?p=xhtml-engine)
[![Version](https://img.shields.io/npm/v/xhtml-engine.svg)](https://www.npmjs.com/package/xhtml-engine)
[![License](https://img.shields.io/npm/l/xhtml-engine.svg)](https://github.com/yelloxing/xhtml-engine/blob/master/LICENSE)

## 说明

本项目是一个处理HTML模板的引擎，你可以用类似jQuery的方式去操作一段字符串模板，比如Vue-loader根据template生成render函数基于此开发将会非常容易。

首先你需要通过命令行安装，就像这样：

```bash
npm install --save xhtml-engine
```

安装好了以后，传入需要的字符串获取引擎对象：

```js
let Engine = require('xhtml-engine')(tempate);
```

获得引擎对象以后，就可以直接调用上面的方法进行操作了（这和在浏览器上操作DOM很像），有如下操作可以使用：

- [结点查找](./docs/search.md)
- [属性等基本操作](./docs/operate.md)

在引擎对象上，你可以通过下面的方法查看其值：

```js
let value = Engine.valueOf();
```

由于项目的建立是来自日常工作的需求，如果你希望下一版本提供新的功能，可以提[issue](https://github.com/yelloxing/xhtml-engine/issues)告知我们！

## 开源协议

[MIT](https://github.com/yelloxing/xhtml-engine/blob/master/LICENSE)

Copyright (c) 2020 走一步 再走一步