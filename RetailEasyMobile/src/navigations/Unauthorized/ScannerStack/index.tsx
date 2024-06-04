import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UnAuthScannerParams } from "../../../constants/ParamList.ts";
import { UnAuthScannerStackName } from "../../../constants/StackName.ts";
import ScannerBasic from "../../../screens/ScannerBasic";


const ScannerStack = () => {

  const Stack = createNativeStackNavigator<UnAuthScannerParams>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName={UnAuthScannerStackName.CAMERA}
    >
      <Stack.Screen name={UnAuthScannerStackName.CAMERA} component={ScannerBasic}/>
      {/*<Stack.Screen name={UnAuthScannerStackName.SCAN_RESULT} component={Login}/>*/}
    </Stack.Navigator>
  )
}

export default ScannerStack;
