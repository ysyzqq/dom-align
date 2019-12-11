import utils from './utils';

/**
 * 获取元素所在的区域, 包括相对文档的偏移, 宽高(outerWidth)
 * @param {*} node 
 */
function getRegion(node) {
  let offset;
  let w;
  let h;
  if (!utils.isWindow(node) && node.nodeType !== 9) {
    offset = utils.offset(node);
    w = utils.outerWidth(node);
    h = utils.outerHeight(node);
  } else {
    const win = utils.getWindow(node);
    offset = {
      left: utils.getWindowScrollLeft(win),
      top: utils.getWindowScrollTop(win),
    };
    w = utils.viewportWidth(win);
    h = utils.viewportHeight(win);
  }
  offset.width = w;
  offset.height = h;
  return offset;
}

export default getRegion;
