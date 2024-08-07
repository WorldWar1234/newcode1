const shouldCompress = (req) => {
  const { originType, originSize, webp } = req.params;

  if (!originType.startsWith('image')) {
    return false;
  }

  if (originSize === 0) {
    return false;
  }

  if (webp && originSize < 512) {
    return false;
  }

  if (!webp && (originType.endsWith('png') || originType.endsWith('gif')) && originSize < 51200) {
    return false;
  }

  return true;
};

module.exports = shouldCompress;
