const { blanksReg } = require('./RegExp');

module.exports = function (template) {

    if (!require('@yelloxing/core.js').isString(template)) throw new Error("Template must be a String!");

    // 获取读取下一个标签对象
    let nextTag = require('./nextTag')(template);

    let tag = nextTag(), DomTree = [];
    while (tag != null) {

        if (tag.type == 'textcode' && blanksReg.test(tag.tagName)) {

            // 空白文本结点过滤掉

        } else if (tag.type == 'DOCTYPE') {

            // DOCTYPE也过滤掉

        } else if (tag.type == 'comment') {

            // 注释目前也先过滤掉

        } else {
            DomTree.push(tag);
        }

        tag = nextTag();
    }

    // 分析层次
    DomTree = require('./analyseDeep')(DomTree);

    /**
     * 模仿浏览器构建的一棵树,每个节点有如下属性：
     * 
     * 1.parentNode index  父结点
     * 2.childNodes []     孩子结点
     * 3.preNode    index  前一个兄弟结点
     * 4.nextNode   index  后一个兄弟结点
     * 
     * 5.attrs:{}          当前结点的属性
     * 6.name              节点名称
     * 7.type              节点类型（tag和text）
     * 8.content           文本结点内容
     * 
     * 需要注意的是：如果一个文本结点内容只包含回车，tab，空格等空白字符，会直接被忽视
     */

    let presNode = [null], preDeep = 0;
    for (let i = 0; i < DomTree.length; i++) {

        // 当前结点
        let currentIndex = i, currentDeep = DomTree[i].__deep__;
        DomTree[i].childNodes = [];
        DomTree[i].preNode = null;
        DomTree[i].nextNode = null;

        // 前置三个结点
        let lastPre = presNode[presNode.length - 1];
        let last2Pre = presNode.length > 1 ? presNode[presNode.length - 2] : null;


        // 如果遇到的是兄弟结点
        if (currentDeep == preDeep) {

            // 修改兄弟关系
            DomTree[currentIndex].preNode = lastPre;
            DomTree[lastPre].nextNode = currentIndex;

            // 修改父子关系
            DomTree[currentIndex].parentNode = last2Pre;
            DomTree[last2Pre].childNodes.push(currentIndex);

            // 校对presNode
            presNode[presNode.length - 1] = currentIndex;
        }

        // 如果是遇到了孩子
        else if (currentDeep > preDeep) {

            // 修改兄弟关系
            // todo

            // 修改父子关系
            DomTree[currentIndex].parentNode = lastPre;
            if (lastPre != null) DomTree[lastPre].childNodes.push(currentIndex);

            // 校对presNode
            presNode.push(currentIndex);
        }

        // 如果是遇到了祖先
        else {

            let preTempIndex = presNode[presNode.length - 1 - (preDeep - currentDeep)];
            let preTemp2Index = presNode[presNode.length - 2 - (preDeep - currentDeep)];

            // 修改兄弟关系
            DomTree[currentIndex].preNode = preTempIndex;
            if (preTempIndex != null) DomTree[preTempIndex].nextNode = currentIndex;

            // 修改父子关系
            DomTree[currentIndex].parentNode = preTemp2Index;
            if (preTemp2Index != null) DomTree[preTemp2Index].childNodes.push(currentIndex);

            // 校对presNode
            for (let i = 0; i < preDeep - currentDeep; i++) { presNode.pop(); }
            presNode[presNode.length - 1] = currentIndex;

        }

        preDeep = currentDeep;

    }

    return DomTree;

};