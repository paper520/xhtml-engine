# xhtml-engine
🌊 基于node.js开发的xhtml字符串解析引擎。

[![downloads](https://img.shields.io/npm/dm/xhtml-engine.svg)](https://yelloxing.github.io/npm-downloads?interval=7&packages=xhtml-engine)
[![install size](https://packagephobia.now.sh/badge?p=xhtml-engine)](https://packagephobia.now.sh/result?p=xhtml-engine)
[![Version](https://img.shields.io/npm/v/xhtml-engine.svg)](https://www.npmjs.com/package/xhtml-engine)
[![License](https://img.shields.io/npm/l/xhtml-engine.svg)](https://github.com/yelloxing/xhtml-engine/blob/master/LICENSE)

> 项目持续升级中，如果你希望下一版本提供新的功能，可以提[issue](https://github.com/yelloxing/xhtml-engine/issues)给我们！

## How to use?

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
- [属性、样式等基本操作](./docs/operate.md)

在引擎对象上，你可以通过下面的方法查看其值：

```js
let value = Engine.valueOf();
```

## 开源协议

[MIT](https://github.com/yelloxing/xhtml-engine/blob/master/LICENSE)

Copyright (c) 2020 走一步 再走一步