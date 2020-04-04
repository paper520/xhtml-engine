// 分析deep
// 我们会在这里校对那些没有结束标签的开始标签
// 这步结束以后，每个都是一个单独的标签
// 也就是不用再区分开始或闭合了
module.exports = function (tagArray) {

  let deep = 0, needClose = [], tagDeepArray = [];

  tagArray.forEach(tag => {

    if (tag.type == 'beginTag') {

      tagDeepArray.push({
        type: "tag",
        name: tag.tagName,
        attrs: tag.attrs,
        deep: ++deep
      });

      // 开始标签需要添加到待闭合集合
      needClose.push([tagDeepArray.length - 1, tag.tagName]);

    } else if (tag.type == 'endTag') {

      let needReset = [];

      while (needClose.length > 0) {
        deep -= 1;
        let needCloseTag = needClose.pop();

        // 如果寻找到闭合标签了
        if (needCloseTag[1] == tag.tagName) {

          // 重置
          needReset.forEach(needResetTag => {
            tagDeepArray[needResetTag[0]].deep = tagDeepArray[needCloseTag[0]].deep + 1;
          });

          if (needClose.length > 0) {
            needClose[needClose.length - 1][2] = needReset;
            needClose[needClose.length - 1][2].unshift();
          }

          break;
        } else {

          // 如果不是，需要重置deep，先记录下来
          needReset.push(needCloseTag);
        }
      }

    } else if (tag.type == 'textcode') {

      // 如果是文本
      tagDeepArray.push({
        type: "text",
        content: tag.tagName,
        deep: deep + 1
      });

    } else {

      // 如果是自闭合结点
      tagDeepArray.push({
        type: "tag",
        name: tag.tagName,
        attrs: tag.attrs,
        deep: deep + 1

      });

    }

  });

  return tagDeepArray;

};