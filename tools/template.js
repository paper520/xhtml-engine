// 获取对象的模板
exports.getTemplate = function (target) {

    // 如果是文本结点
    if (target[0].type == 'text') return target[0].content;

    /**
     * 为了避免使用递归，我们定义一个计算数组needCalcs来登记已经计算过的结果和待计算的内容
     * 虽然需要频繁插入，可是感觉问题不大，并且数组的话，方便最后模板的获取
     * 
     * 算法思想：来自深度优先遍历树图
     * 
     */
    let needCalcs = [target.__DomTree__[target[0]]], index = 0, currentNode, attrsString, needReplace;

    // 如果还有没有处理的，继续
    while (index < needCalcs.length) {

        // 寻找第一个没有计算的
        do {
            currentNode = needCalcs[index++];
        } while (require('@yelloxing/core.js').isString(currentNode));

        if (!currentNode) {
            break;
        }

        /**
         * 对当前面对的进行处理(计算当前模板)
         */

        //  如果是标签
        if (currentNode.type == 'tag') {

            attrsString = "";

            // 只有是标签，属性一定存在
            for (let key in currentNode.attrs) {
                attrsString += `${key}=\"${currentNode.attrs[key]}\" `;
            }

            // 这种情况稍微麻烦点，需要登记开头和结尾，而且需要插入孩子
            if (currentNode.__tagType__ == 'double') {

                needReplace = [];

                // 登记开头
                needReplace.push(`<${currentNode.name} ${attrsString}>`);

                // 登记孩子
                for (let i = 0; i < currentNode.childNodes.length; i++) {
                    needReplace.push(target.__DomTree__[currentNode.childNodes[i]]);
                }

                // 登记结尾
                needReplace.push(`</${currentNode.name}>`);

                needCalcs.splice(index - 1, 1, ...needReplace);

            }

            // 如果不是有开始和结束标签的，一定没有孩子
            else {

                needCalcs[index - 1] = `<${currentNode.name} ${attrsString}/>`;

            }

        }

        // 如果是文本
        else {
            needCalcs[index - 1] = currentNode.content;
        }


    }

    return needCalcs.join("");
};