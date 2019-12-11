import getAlignOffset from './getAlignOffset';

/**
 * 对齐算法
 * @param {*} elRegion source区域
 * @param {*} refNodeRegion target区域
 * @param {*} points 对齐[source, target]
 * @param {*} offset source的偏移
 * @param {*} targetOffset target偏移
 */
function getElFuturePos(elRegion, refNodeRegion, points, offset, targetOffset) {
  // 获取target的对齐后的目标偏移(相对文档)
  const p1 = getAlignOffset(refNodeRegion, points[1]);
  // 获取source的对齐后偏移
  const p2 = getAlignOffset(elRegion, points[0]);
  // 计算source相对target的diff
  const diff = [p2.left - p1.left, p2.top - p1.top];
  // 对齐后的偏移 = 原位置 - diff + 本身偏移 - target偏移
  return {
    left: Math.round(elRegion.left - diff[0] + offset[0] - targetOffset[0]),
    top: Math.round(elRegion.top - diff[1] + offset[1] - targetOffset[1]),
  };
}

export default getElFuturePos;
