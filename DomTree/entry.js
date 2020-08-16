import DomTreeFactroy from './entry.inner';

// 判断当前环境，如果不是浏览器环境
if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = DomTreeFactroy;
}
// 浏览器环境下
else {
    window.DomTree = DomTreeFactroy;
}