const template = require('fs').readFileSync('./code.html', 'utf-8');

// 创建引擎对象
const enginer = require("../index")(template);

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
console.log(enginer);