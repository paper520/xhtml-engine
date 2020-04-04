module.exports = function (template) {

    if (!require('@yelloxing/core.js').isString(template)) throw new Error("Template must be a String!");

    // 获取读取下一个标签对象
    let nextTag = require('./nextTag')(template),

        /**
         * 模仿浏览器构建的一棵树,每个节点有如下属性：
         * 1.parentNode 父结点
         * 2.childNodes 孩子结点
         * 3.preNode    前一个兄弟结点
         * 4.nextNode   后一个兄弟结点
         * 5.attrs:{}   当前结点的属性
         * 6.tagName    节点名称
         * 7.type       节点类型
         * 
         * 需要注意的是：如果一个文本结点内容只包含回车，tab，空格等空白字符，会直接被忽视
         */
        domTree = {};

    let tag = nextTag();
    while (tag) {
        console.log(tag);
        tag = nextTag();
    }

    return " - 学习项目 - ";

};