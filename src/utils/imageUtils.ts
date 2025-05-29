export const generateSrcSet = (url: string): string => {
  const sizes = [320, 640, 768, 1024, 1280, 1536];
  return sizes
    .map(size => `${url}?width=${size} ${size}w`)
    .join(', ');
};

export const getImageDimensions = (
  width: number,
  height: number,
  maxWidth: number
): { width: number; height: number } => {
  const aspectRatio = width / height;
  const calculatedHeight = maxWidth / aspectRatio;
  
  return {
    width: maxWidth,
    height: Math.round(calculatedHeight)
  };
};