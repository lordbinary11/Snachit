import { PixelRatio, useWindowDimensions } from 'react-native';

export const REFERENCE_VIEWPORT = { width: 390, height: 844 } as const;
export const MAX_CONTENT_WIDTH = 480;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function dimension(size: number, width: number, height: number) {
  const widthScale = width / REFERENCE_VIEWPORT.width;
  const heightScale = height / REFERENCE_VIEWPORT.height;
  const scale = clamp(Math.min(widthScale, heightScale), 0.84, 1.12);
  return PixelRatio.roundToNearestPixel(size * scale);
}

export function fontSize(size: number, width: number, height: number) {
  const contentWidth = Math.min(width, MAX_CONTENT_WIDTH);
  const scale = clamp(
    Math.min(contentWidth / REFERENCE_VIEWPORT.width, height / REFERENCE_VIEWPORT.height),
    0.88,
    1.12,
  );
  return PixelRatio.roundToNearestPixel(size * scale);
}

export function useResponsiveMetrics() {
  const { width, height } = useWindowDimensions();
  const contentWidth = Math.min(width, MAX_CONTENT_WIDTH);

  return {
    contentWidth,
    inset: Math.max(16, dimension(24, contentWidth, height)),
    dimension: (size: number) => dimension(size, contentWidth, height),
    fontSize: (size: number) => fontSize(size, contentWidth, height),
  };
}
