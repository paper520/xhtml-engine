
// 这里只是测试最重要的DOMtree构建的是否正确

const template = require('fs').readFileSync('../code.html', 'utf-8');

// 创建DOM对象
const dom = require("../DomTree/index")(template);

/**
 * 
 * 开始测试
 * 
 * -----------------------------
 * 
 * 对象获取到了以后
 * 直接测试这个对象提供的各个方法即可
 * 
 */

let deepSpank = num => {
  let temp = "";
  for (let i = 0; i < num; i++) {
    temp += "     ";
  }
  return temp;
}

console.log(dom);

dom.forEach((item, index) => {
  console.log(deepSpank(item.__deep__) + "[" + index + "]" + (item.name || " text ") + "[" + item.childNodes + "][" + item.preNode + "][" + item.nextNode + "][" + item.parentNode + "]");
});