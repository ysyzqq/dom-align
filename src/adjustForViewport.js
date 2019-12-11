import utils from './utils';

/**
 * 如果元素偏移超出视图, 进行调整
 * @param {*} elFuturePos 目标偏移
 * @param {*} elRegion 元素的区域
 * @param {*} visibleRect 可见区域
 * @param {*} overflow 元素溢出配置
 */
function adjustForViewport(elFuturePos, elRegion, visibleRect, overflow) {
  const pos = utils.clone(elFuturePos);
  const size = {
    width: elRegion.width,
    height: elRegion.height,
  };

  // 如果目标偏移的left小于可见区域的left, 那么调整过后left就为可见区域的left
  if (overflow.adjustX && pos.left < visibleRect.left) {
    pos.left = visibleRect.left;
  }

  // Left edge inside and right edge outside viewport, try to resize it.
  if (
    overflow.resizeWidth &&
    pos.left >= visibleRect.left &&
    pos.left + size.width > visibleRect.right
  ) {
    size.width -= pos.left + size.width - visibleRect.right;
  }

  // Right edge outside viewport, try to move it.
  if (overflow.adjustX && pos.left + size.width > visibleRect.right) {
    // 保证左边界和可视区域左边界对齐
    pos.left = Math.max(visibleRect.right - size.width, visibleRect.left);
  }

  // Top edge outside viewport, try to move it.
  if (overflow.adjustY && pos.top < visibleRect.top) {
    pos.top = visibleRect.top;
  }

  // Top edge inside and bottom edge outside viewport, try to resize it.
  if (
    overflow.resizeHeight &&
    pos.top >= visibleRect.top &&
    pos.top + size.height > visibleRect.bottom
  ) {
    size.height -= pos.top + size.height - visibleRect.bottom;
  }

  // Bottom edge outside viewport, try to move it.
  if (overflow.adjustY && pos.top + size.height > visibleRect.bottom) {
    // 保证上边界和可视区域上边界对齐
    pos.top = Math.max(visibleRect.bottom - size.height, visibleRect.top);
  }

  return utils.mix(pos, size);
}

export default adjustForViewport;
