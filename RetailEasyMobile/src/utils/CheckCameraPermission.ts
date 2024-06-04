import { Platform } from "react-native";
import { openSettings, PERMISSIONS, request, RESULTS } from "react-native-permissions";


export const isGranted = async () => {
  request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)
    .then(async (result: any) => {
      switch (result) {
        case RESULTS.DENIED:
        case RESULTS.BLOCKED:
          openSettings().then();
          return  false;
        case RESULTS.GRANTED:
          return true;
        case RESULTS.UNAVAILABLE:
        default:
          return false;
      }
    })

}
