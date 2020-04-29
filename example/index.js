
// 一些不好测试或不稳定的，使用用例来查看是否正确

const template = require('fs').readFileSync('../code.html', 'utf-8');

let engine = require('../index')(template, [3]);

/**
 * 0.设计方面测试
 */

// engine.parent().__DomTree__[1].attrs={};
// console.log(engine);

/**
 * 1.基础方法
 */

console.log(engine.valueOf());
console.log(engine + "");

/**
 * 2.结点查找
 */

console.log("parent:" + engine.parent());
console.log("parents:" + engine.parents());
console.log("children:" + engine.children());
console.log("siblings:" + engine.siblings());
console.log("next:" + engine.next());
console.log("nextAll:" + engine.nextAll());
console.log("prev:" + engine.prev());
console.log("prevAll:" + engine.prevAll());

console.log("nextAll[1]:" + engine.nextAll().eq(0));

/**
 * 3.一些常规方法
 */

console.log("get innerHTML:" + engine.parent().next().innerHTML());
console.log("get outerHTML:" + engine.parent().next().outerHTML());

console.log("get innerHTML:" + engine.parent().innerHTML());
engine.parent().innerHTML("<div>测试1</div>");
console.log("get innerHTML:" + engine.parent().innerHTML());

console.log("get outerHTML:" + engine.parent().outerHTML());
engine.parent().outerHTML("<div>测试2</div>");
console.log("get outerHTML:" + engine.parent().outerHTML());