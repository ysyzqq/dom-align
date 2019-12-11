import doAlign from './align';
import getOffsetParent from '../getOffsetParent';
import getVisibleRectForElement from '../getVisibleRectForElement';
import getRegion from '../getRegion';

function isOutOfVisibleRect(target) {
  const visibleRect = getVisibleRectForElement(target);
  const targetRegion = getRegion(target);

  return (
    !visibleRect ||
    targetRegion.left + targetRegion.width <= visibleRect.left ||
    targetRegion.top + targetRegion.height <= visibleRect.top ||
    targetRegion.left >= visibleRect.right ||
    targetRegion.top >= visibleRect.bottom
  );
}

/**
 * 对齐元素
 * @param {*} el source元素
 * @param {*} refNode target元素
 * @param {*} align 配置
 */
function alignElement(el, refNode, align) {
  const target = align.target || refNode;
  const refNodeRegion = getRegion(target);

  const isTargetNotOutOfVisible = !isOutOfVisibleRect(target);

  return doAlign(el, refNodeRegion, align, isTargetNotOutOfVisible);
}

alignElement.__getOffsetParent = getOffsetParent;

alignElement.__getVisibleRectForElement = getVisibleRectForElement;

export default alignElement;
