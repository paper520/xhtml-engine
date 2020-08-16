
// 这里只是测试最重要的DOMtree构建的是否正确
// 不忽略版本

const template = require('fs').readFileSync('../code.html', 'utf-8');

// 创建DOM对象
const dom = require("../DomTree/index")(template, true);

console.log(dom);