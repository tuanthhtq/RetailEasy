import { StyleProp, TextStyle } from "react-native";
import { fontPixel } from "../utils/Normalizer.ts";

export const toastTextStyle: StyleProp<TextStyle> = {
  fontSize: fontPixel(20),
  fontWeight: "normal"
}
