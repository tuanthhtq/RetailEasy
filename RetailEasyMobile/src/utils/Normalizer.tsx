import { Dimensions, PixelRatio } from "react-native";

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT
} = Dimensions.get("window")

const baseWidthScale = SCREEN_WIDTH / 360;
const baseHeightScale = SCREEN_HEIGHT / 800;

const normalize = (size: number, based : string = "width" ) => {
  const newSize = (based === "height") ? size*baseHeightScale : size*baseWidthScale;
  return Math.round( PixelRatio.roundToNearestPixel(newSize));
}

const fontPixel = (size: number) => {
  return normalize(size, "height");
}

const verticalPixel = (size: number) => {
  return normalize(size, "height");
}

const horizontalPixel = (size: number) => {
  return normalize(size, "width");
}


export {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  fontPixel,
  verticalPixel,
  horizontalPixel,
}
