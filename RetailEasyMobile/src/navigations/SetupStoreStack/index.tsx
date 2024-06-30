import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SetupStoreParams, SetupStoreStackName } from "../../constants/ParamList.ts";
import SetupStore from "../../screens/SetupStore";
import SetupStoreConfirmation from "../../screens/SetupStoreConfirmation";
import SetupStoreGetData from "../../screens/SetupStore/components/SetupStoreGetData";

const SetupStoreStack = () => {

  const Stack = createNativeStackNavigator<SetupStoreParams>();

  return (
    <Stack.Navigator
      initialRouteName={SetupStoreStackName.HOME}
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name={SetupStoreStackName.HOME} component={SetupStore}/>
      <Stack.Screen name={SetupStoreStackName.RESULT} component={SetupStoreConfirmation}/>
      <Stack.Screen name={SetupStoreStackName.GET_DATA} component={SetupStoreGetData}/>
    </Stack.Navigator>
  )
}

export default SetupStoreStack;
